<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Repositories\CustomerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;


class OrderController extends Controller
{
     
    public function __construct(
        public OrderRepository $orderRepository,
        public CustomerRepository $customerRepository,
        public ProductRepository $productRepository
    ) {}


    public function index()
    {
        return Inertia::render('Order/Index', [
            'orders' => $this->orderRepository->getAll(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Order $order)
    {
        return Inertia::render('Order/Create', [
            'customers' => $this->customerRepository->getAll(),
            'products' => $this->productRepository->getAll(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = $this->orderRepository->store($request->validated());
        return redirect()->route('order.index')->with('success', 'Order created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Order/Show', [
            'order' => $order,
        ]);
    }

     

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
