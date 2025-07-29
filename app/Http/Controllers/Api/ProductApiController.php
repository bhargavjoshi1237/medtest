<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Api\ProductApiRequest;
use App\Http\Requests\StoreProductRequest;
use App\Repositories\Api\ProductApiRepository;
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

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $product = $this->productRepository->store($data); // pass $data, not [$data]
        return response()->json([
            'message' => 'Product created successfully.',
            'product' => $product,
        ], 201);
    }

    public function destroy($id)
    {
        $deleted = $this->productRepository->destroy($id);
        if ($deleted) {
            return response()->json([
                'message' => 'Product deleted successfully.',
            ]);
        } else {
            return response()->json([
                'message' => 'Product not found or could not be deleted.',
            ], 404);
        }
    }
}
