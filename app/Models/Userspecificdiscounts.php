<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Userspecificdiscounts extends Model
{
    use HasUuids;

    protected $table = 'Userspecificdiscounts';

    protected $fillable = [
        'customer_id', // Changed from user_id to customer_id
        'discount',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function customer() // Updated relationship name
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}

