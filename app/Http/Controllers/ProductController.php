<?php

namespace App\Http\Controllers;

use  Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\DB;


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


    public function create()
    {
        return Inertia::render('Product/Create');
    }


    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();
        try {
            $product = $this->productRepository->store($request->validated());
            DB::commit();
            return redirect()->route('product.index')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }


    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }


    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', [
            'product' => $product,
        ]);
    }


    public function update(UpdateProductRequest $request, Product $product)
    {
        DB::beginTransaction();
        try {
            $updatedProduct = $this->productRepository->update($product->id, $request->validated());
            DB::commit();
            return redirect()->route('product.index')->with('success', 'Product updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }


    public function destroy(Product $product)
    {
        DB::beginTransaction();
        try {
            $this->productRepository->destroy($product->id);
            DB::commit();
            return redirect()->route('product.index')->with('success', 'Product deleted successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }
}
