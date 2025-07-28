<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // Import the base Controller
use Illuminate\Http\Request;
use App\Repositories\Api\OrderRepository; // Correct import from Api folder
use App\Http\Requests\Api\OrderRequest; // Import the OrderRequest

class OrderController extends Controller
{
   

    public function __construct( public OrderRepository $orderRepository) // Corrected constructor
    {
      
    }

    
    public function index(OrderRequest $request) 
    {
        $validatedData = $request->validated();

        
        $orders = $this->orderRepository->getOrdersByParams($validatedData);

        return response()->json([
            'message' => 'Orders fetched successfully',
            'code' => 200,
            'data' => $orders,
        ], 200);
    }
}

