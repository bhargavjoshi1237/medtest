<?php

namespace App\Repositories\Api;

use App\Repositories\BaseRepository;
use App\Models\Product;

class ProductApiRepository extends BaseRepository
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function getWithParams(array $params)
    {
        $query = $this->model->newQuery();

        if (isset($params['price_above'])) {
            $query->where('price', '>', $params['price_above']);
        }
        if (isset($params['price_below'])) {
            $query->where('price', '<', $params['price_below']);
        }
        if (isset($params['quantity_above'])) {
            $query->where('quantity', '>', $params['quantity_above']);
        }
        if (isset($params['quantity_below'])) {
            $query->where('quantity', '<', $params['quantity_below']);
        }
        if (isset($params['alert_quantity_above'])) {
            $query->where('alert_quantity', '>', $params['alert_quantity_above']);
        }
        if (isset($params['alert_quantity_below'])) {
            $query->where('alert_quantity', '<', $params['alert_quantity_below']);
        }

        if (isset($params['sort'])) {
            $query->orderBy($params['sort']);
        }

        if (isset($params['max'])) {
            $query->limit((int)$params['max']);
        }

        return $query->get();
    }
}
