<?php 

namespace App\Repositories;

use App\Models\Scheme;

class SchemeRepository extends BaseRepository
{
    public function __construct(Scheme $model)
    {
        parent::__construct($model);
    }

    
}
