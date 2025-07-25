<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
    ];
}
