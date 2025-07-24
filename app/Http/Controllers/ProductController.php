<?php

namespace App\Http\Controllers;
use  Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\Http\Requests\StoreProductRequest;


class ProductController extends BaseController
{

    public function __construct(
        public ProductRepository $productRepository,

    ) {}


    public function index()
    {
        return Inertia::render('Product/Index', [
            'product' => $this->productRepository->getAll(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/Create');
    }

  
    public function store(StoreProductRequest $request)
    {
        $product = $this->productRepository->store($request->validated());
        return redirect()->route('product.index')->with('success', 'Product created successfully!');
    }

    
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
