<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrdertController;
use App\Http\Controllers\Api\OrderController; // Import the OrderController

// Example: Get authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Add your API routes here
// Example:
// Route::get('/products', [ProductController::class, 'index']);

// Public route to get all products
Route::get('/products', [ProductController::class, 'index'])
    ->name('api.products.index');

// Public route to get all orders
Route::get('/orders', [OrderController::class, 'index']);
