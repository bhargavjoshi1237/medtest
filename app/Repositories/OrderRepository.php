<?php

namespace App\Repositories;

use App\Models\OrderProduct;
use App\Repositories\BaseRepository;
use App\Models\Order;
use App\Models\Product;
use App\Models\Notification;

class OrderRepository extends BaseRepository
{
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    public function attachProducts(Order $order, array $validated): void
    {
        $products = $validated['products'] ?? [];
        $rows = [];
        foreach ($products as $product) {
            if (!isset($product['id']) || !isset($product['quantity'])) {
                continue;
            }
            $rows[] = [
                'order_id'   => $order->id,
                'product_id' => $product['id'],
                'quantity'   => $product['quantity'],
            ];
        }
        if (!empty($rows)) {
            OrderProduct::insert($rows);
        } else {
        }
    }


    public function decrementProductInventory(array $validated): void
    {
        $products = $validated['products'] ?? [];
        foreach ($products as $product) {
            if (!isset($product['id']) || !isset($product['quantity'])) {
                \Log::warning('Product decrement skipped due to missing id or quantity', ['product' => $product]);
                continue;
            }
            $productModel = Product::find($product['id']);
            if ($productModel) {
                $oldQuantity = $productModel->quantity;
                $productModel->decrement('quantity', $product['quantity']);
                $productModel->refresh();
                \Log::info('Product quantity decremented', [
                    'product_id' => $productModel->id,
                    'name' => $productModel->name,
                    'old_quantity' => $oldQuantity,
                    'decrement_by' => $product['quantity'],
                    'new_quantity' => $productModel->quantity
                ]);
                if ($productModel->quantity < $productModel->alert_quantity) {
                    try {
                        $notification = Notification::create([
                            'product_id' => $productModel->id,
                            'title' => 'Low Stock Alert',
                            'description' => "Product '{$productModel->name}' is below alert quantity ({$productModel->quantity} left).",
                        ]);
                        \Log::info('Low stock notification created', [
                            'notification_id' => $notification->id ?? null,
                            'product_id' => $productModel->id,
                            'name' => $productModel->name,
                            'quantity' => $productModel->quantity,
                            'alert_quantity' => $productModel->alert_quantity
                        ]);
                    } catch (\Exception $ex) {
                        \Log::error('Failed to create notification', [
                            'error' => $ex->getMessage(),
                            'product_id' => $productModel->id,
                            'name' => $productModel->name,
                            'quantity' => $productModel->quantity,
                            'alert_quantity' => $productModel->alert_quantity
                        ]);
                    }
                }
            } else {
                \Log::error('Product not found for decrement', ['product_id' => $product['id']]);
            }
        }
    }
}
