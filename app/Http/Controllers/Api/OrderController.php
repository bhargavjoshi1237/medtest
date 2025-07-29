<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Api\OrderRepository;
use App\Http\Requests\Api\OrderRequest;

class OrderController extends Controller
{


    public function __construct(
        public OrderRepository $orderRepository
    ) {}


    public function index(OrderRequest $request)
    {
        $validatedData = $request->validated();
        $orders = $this->orderRepository->getOrdersByParams($validatedData);
        return response()->json([
            'data' => $orders,
        ], 200);
    }
}
