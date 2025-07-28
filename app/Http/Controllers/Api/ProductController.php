<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ProductRequest;
use App\Repositories\Api\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        public ProductRepository $productRepository,
    ) {}

    public function index(ProductRequest $request)
    {
        $params = $request->validated();
        $response = $this->productRepository->getWithParams($params);
    
        return response()->json([
            'message' => 'Hello, World!',
            'params' => $params,
            'products' => $response,
        ]);
    }
     
}