<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\CustomerApiController;
use App\Http\Controllers\Api\OrderController; // Import the OrderController


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::match(['GET', 'POST'], '/', function () {
    return response()->json(['message' => 'hello world']);
});


Route::get('/products', [ProductApiController::class, 'index'])
    ->name('api.products.index');

Route::post('/products', [ProductApiController::class, 'store'])
    ->name('api.products.store');

Route::delete('/products/{id}', [ProductApiController::class, 'destroy'])
    ->name('api.products.destroy');

Route::get('/orders', [OrderController::class, 'index']);

Route::get('/customers', [CustomerApiController::class, 'index'])
    ->name('api.customers.index');

Route::post('/customers', [CustomerApiController::class, 'store'])
    ->name('api.customers.store');
