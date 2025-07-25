<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrder;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Customer;

use App\Models\Product;
use App\Repositories\CustomerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SchemeRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{

    public function __construct(
        public OrderRepository $orderRepository,
        public CustomerRepository $customerRepository,
        public ProductRepository $productRepository,
        public SchemeRepository $schemeRepository
    ) {}


    public function index()
    {
        $orders = $this->orderRepository->getAll()->load(['customer']);
        return Inertia::render('Order/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Order $order)
    {
        $customers = $this->customerRepository->withOrderCount();
        $products = $this->productRepository->getAll();
        $schemes = $this->schemeRepository->getAll();

        return Inertia::render('Order/Create', [
            'customers' => $customers,
            'products' => $products,
            'schemes' => $schemes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $order = $this->orderRepository->store($validated);
            $this->orderRepository->attachProducts($order, $validated);
            $this->orderRepository->decrementProductInventory($validated);
            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Order created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create order: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['customer', 'products']);
        return Inertia::render('Order/Show', [
            'order' => $order,
            'auth'  => ['user' => auth()->user()],
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('Order/Edit', [
            'order' => $order,
            'customers' => $this->customerRepository->getAll(),
            'products' => $this->productRepository->getAll(),
            'auth' => ['user' => Auth::user()],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        DB::beginTransaction();
        try {

            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Order updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update order: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        DB::beginTransaction();
        try {
            $this->orderRepository->destroy($order);
            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Order deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to delete order: ' . $e->getMessage());
        }
    }
}
   