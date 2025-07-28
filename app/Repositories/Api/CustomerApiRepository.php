<?php

namespace App\Repositories\Api;

use App\Models\Customer;
use App\Repositories\BaseRepository;

class CustomerApiRepository extends BaseRepository
{
    public function __construct(Customer $model)
    {
        parent::__construct($model);
    }

    
}
