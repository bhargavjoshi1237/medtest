<?php

namespace App\Repositories;

use App\Models\OrderProduct;
use App\Repositories\BaseRepository;
use App\Models\Order;
use App\Models\Product;
use App\Models\Notification;
use App\Models\Discount;
use Exception;

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
                continue;
            }
            $productModel = Product::find($product['id']);
            if ($productModel) {
                $oldQuantity = $productModel->quantity;
                $productModel->decrement('quantity', $product['quantity']);
                $productModel->refresh();
                if ($productModel->quantity < $productModel->alert_quantity) {
                    try {
                        $notification = Notification::create([
                            'product_id' => $productModel->id,
                            'title' => 'Low Stock Alert',
                            'description' => "Product '{$productModel->name}' is below alert quantity ({$productModel->quantity} left).",
                        ]);
                    } catch (Exception $ex) {
                    }
                }
            } else {
            }
        }
    }

    public function removeCustomerDiscount($customer)
    {
        Discount::where('customer_id', $customer->id)->delete();
    }
}
