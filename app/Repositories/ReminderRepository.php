<?php 

namespace App\Repositories;

use App\Models\Reminder;

class ReminderRepository extends BaseRepository
{
    public function __construct(Reminder $model)
    {
        parent::__construct($model);
    }

    
}
