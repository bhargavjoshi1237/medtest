<?php

namespace App\Repositories\Api;

use App\Repositories\BaseRepository;
use App\Models\Product;

class ProductRepository extends BaseRepository
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function getWithParams(array $params)
    {
        $query = $this->model->newQuery();

        if (isset($params['sort'])) {
            $query->orderBy($params['sort']);
        }

        if (isset($params['max'])) {
            $query->limit((int)$params['max']);
        }

        return $query->get();
    }
}
