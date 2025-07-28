<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Example: Get authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Add your API routes here
// Example:
// Route::get('/products', [ProductController::class, 'index']);
