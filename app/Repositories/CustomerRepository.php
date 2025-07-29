<?php

namespace App\Repositories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Builder;

class CustomerRepository extends BaseRepository
{
    public function __construct(Customer $model)
    {
        parent::__construct($model);
    }

    public function getTopCustomers(int $limit = 5): array
    {
        return $this->newQuery()
            ->withCount('orders')
            ->withSum('orders', 'final_amount')
            ->orderBy('orders_count', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'contact' => $customer->contact,
                    'total_orders' => $customer->orders_count,
                    'total_spent' => (float) ($customer->orders_sum_final_amount ?? 0)
                ];
            })
            ->toArray();
    }

    public function withOrderCount()
    {
        return $this->newQuery()
            ->withCount('orders')
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'order_count' => $customer->orders_count,
                ];
            });
    }

    /**
     * Get all orders for a given customer ID.
     *
     * @param string $customerId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getOrders(string $customerId)
    {
        return $this->model->findOrFail($customerId)->orders()->with(['products'])->get();
    }
}
