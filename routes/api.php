<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\OrdertController;
use App\Http\Controllers\Api\OrderController; // Import the OrderController

// Example: Get authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ProductApiController::class, 'index'])
    ->name('api.products.index');


// Public route to get all orders
Route::get('/orders', [OrderController::class, 'index']);
