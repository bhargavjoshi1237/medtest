<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Api\ProductApiRequest;
use App\Repositories\Api\ProductApiRepository;
use Faker\Provider\Base;
use Illuminate\Http\Request;

class ProductApiController extends BaseController
{
    public function __construct(
        public ProductApiRepository $productRepository,
    ) {}

    public function index(ProductApiRequest $request)
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