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

        // Apply customer filter first - this should be the primary filter
        if (!empty($params['customerid'])) {
            $query->where('customer_id', '=', $params['customerid']);
        }

        if (!empty($params['maxamt'])) {
            $query->where('final_amount', '<=', $params['maxamt']);
            $query->orderBy('final_amount', 'desc');
        }
        
        if (!empty($params['maxqty'])) {
            $query->limit((int)$params['maxqty']);
        }

        return $query->get();
    }
}
