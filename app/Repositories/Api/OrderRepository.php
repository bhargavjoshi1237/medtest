<?php

namespace App\Repositories\Api;

use App\Repositories\BaseRepository; 
use App\Models\Order; // Import the Order model

class OrderRepository extends BaseRepository
{
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    public function getOrdersByParams(array $params)
    {
        $query = $this->model->query();

        if (isset($params['maxamt']) && $params['maxamt'] !== null) {
            $query->where('final_amount', '<=', $params['maxamt']);
            $query->orderBy('final_amount', 'desc');
        }
        if (isset($params['customerid']) && $params['customerid'] !== null) {
            $query->where('customer_id', $params['customerid']);
        }
        if (isset($params['maxqty']) && $params['maxqty'] !== null) {
            $query->limit($params['maxqty']);
        }

        return $query->get();
    }
}
