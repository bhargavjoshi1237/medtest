<?php 

namespace App\Repositories;

use App\Models\Customer;

class CustomerRepository extends BaseRepository
{
    public function __construct(Customer $model)
    {
        parent::__construct($model);
    }

    public function withOrderCount($columns = ['*'])
    {
        return $this->model->newQuery()
            ->withCount('orders')
            ->get($columns)
            ->map(function ($customer) {
                $customer->order_count = $customer->orders_count;
                unset($customer->orders_count);
                return $customer;
            });
    }
    
    public function getOrders($customerId)
    {
        $customer = $this->getById($customerId, ['orders']);
        return $customer ? $customer->orders : collect();
    }
}
