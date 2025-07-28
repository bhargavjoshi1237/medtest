<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\CustomerApiController;
use App\Http\Controllers\Api\OrderController; // Import the OrderController
use App\Http\Controllers\CustomerController; // Import the CustomerController

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ProductApiController::class, 'index'])
    ->name('api.products.index');

Route::post('/products', [ProductApiController::class, 'store'])
    ->name('api.products.store');

Route::delete('/products/{id}', [ProductApiController::class, 'destroy'])
    ->name('api.products.destroy');

Route::get('/orders', [OrderController::class, 'index']);

Route::get('/customers', [CustomerApiController::class, 'index']);

Route::post('/customers', [CustomerApiController::class, 'store']);
