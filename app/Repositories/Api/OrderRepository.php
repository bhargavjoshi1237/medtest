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

        if (isset($params['maxAmt']) && $params['maxAmt'] !== null) {
            $query->where('final_amount', '<=', $params['maxAmt']);
            $query->orderBy('final_amount', 'desc');
        }
        if (isset($params['customer_id']) && $params['customer_id'] !== null) {
            $query->where('customer_id', $params['customer_id']);
        }
        if (isset($params['maxQty']) && $params['maxQty'] !== null) {
            $query->limit($params['maxQty']);
        }

        return $query->get();
    }
}
