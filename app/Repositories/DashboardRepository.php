<?php

namespace App\Repositories;


use Illuminate\Support\Facades\DB;

class DashboardRepository extends BaseRepository
{
    
    public function __construct(
        public OrderRepository $orderRepository,
        public CustomerRepository $customerRepository,
        public ProductRepository $productRepository
    ) {}

    public function getTotalOrders(): int
    {
        return $this->orderRepository->countAll();
    }

    public function getTotalCustomers(): int
    {
        return $this->customerRepository->countAll();
    }

    public function getTotalProducts(): int
    {
        return $this->productRepository->countAll();
    }

    public function getTotalRevenue(): float
    {
        return (float) $this->orderRepository->newQuery()->sum('final_amount') ?? 0;
    }

    public function getRecentOrders(int $limit = 5): array
    {
        $orders = $this->orderRepository->newQuery()
            ->with(['customer', 'createdBy'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        return $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'customer_name' => $order->customer->name ?? 'N/A',
                'total_amount' => $order->final_amount,
                'created_at' => $order->created_at->format('M d, Y'),
                'created_by' => $order->createdBy->name ?? 'N/A'
            ];
        })->toArray();
    }

    public function getTopCustomers(int $limit = 5): array
    {
        $customers = $this->customerRepository->newQuery()
            ->withCount('orders')
            ->withSum('orders', 'final_amount')
            ->orderBy('orders_count', 'desc')
            ->limit($limit)
            ->get();

        return $customers->map(function ($customer) {
            return [
                'id' => $customer->id,
                'name' => $customer->name,
                'contact' => $customer->contact,
                'total_orders' => $customer->orders_count,
                'total_spent' => (float) ($customer->orders_sum_final_amount ?? 0)
            ];
        })->toArray();
    }

    public function getLowStockProducts(int $limit = 5): array
    {
        $products = $this->productRepository->newQuery()
            ->whereColumn('quantity', '<=', 'alert_quantity')
            ->orderBy('quantity', 'asc')
            ->limit($limit)
            ->get();

        return $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'current_quantity' => $product->quantity,
                'alert_quantity' => $product->alert_quantity,
                'price' => $product->price
            ];
        })->toArray();
    }

    public function getWeeklyRevenue(): array
    {
        $weeklyData = $this->orderRepository->newQuery()
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(final_amount) as revenue'),
                DB::raw('COUNT(*) as orders_count')
            )
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return $weeklyData->map(function ($data) {
            return [
                'month' => date('M d', strtotime($data->date)),
                'revenue' => (float) $data->revenue,
                'orders_count' => $data->orders_count
            ];
        })->toArray();
    }

    public function getOrderStatusDistribution(): array
    {
        $total = $this->orderRepository->countAll();
        $recent = $this->orderRepository->newQuery()
            ->where('created_at', '>=', now()->subDays(30))
            ->count();
        $older = $total - $recent;

        return [
            ['status' => 'Recent (30 days)', 'count' => $recent, 'percentage' => $total > 0 ? round(($recent / $total) * 100, 1) : 0],
            ['status' => 'Older', 'count' => $older, 'percentage' => $total > 0 ? round(($older / $total) * 100, 1) : 0]
        ];
    }

    public function getTopSellingProducts(int $limit = 5): array
    {
        $products = $this->productRepository->newQuery()
            ->join('order_products', 'products.id', '=', 'order_products.product_id')
            ->select(
                'products.id',
                'products.name',
                'products.price',
                DB::raw('SUM(order_products.quantity) as total_sold'),
                DB::raw('SUM(order_products.quantity * products.price) as total_revenue')
            )
            ->groupBy('products.id', 'products.name', 'products.price')
            ->orderBy('total_sold', 'desc')
            ->limit($limit)
            ->get();

        return $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'total_sold' => $product->total_sold,
                'total_revenue' => (float) $product->total_revenue
            ];
        })->toArray();
    }
}
