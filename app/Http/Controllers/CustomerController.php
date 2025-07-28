<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use App\Repositories\CustomerRepository;
use Inertia\Inertia;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCutomerRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BaseController;



class CustomerController extends BaseController
{

    public function __construct(
        public CustomerRepository $customerRepository,
    ) {}
    
    public function index()
    {
        return Inertia::render('Customer/Index', [
            'customer' => $this->customerRepository->getAll()
        ]);
    }

    
    public function create()
    {
        return Inertia::render('Customer/Create');
    }

    
    public function store(StoreCustomerRequest $request)
    {
        DB::beginTransaction();
        try {
            $customer = $this->customerRepository->store($request->validated());
            DB::commit();
            return $this->sendRedirectResponse(route('customer.index'), 'Customer created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('customer.index'), 'Failed to create customer.');
        }
    }

    
    public function show(Customer $customer)
    {
        $orders = $this->customerRepository->getOrders($customer->id);
        return Inertia::render('Customer/View', [
            'orders' => $orders,
            'customer' => $customer
        ]);
    }


    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/Edit', [
            'customer' => $customer
        ]);
    }


    public function update(UpdateCutomerRequest $request, Customer $customer)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $this->customerRepository->update($customer->id, $validated);
            DB::commit();
            return $this->sendRedirectResponse(route('customer.index'), 'Customer updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('customer.index'), 'Failed to update customer.');
        }
    }


    public function destroy(Customer $customer)
    {
        DB::beginTransaction();
        try {
            $this->customerRepository->destroy($customer->id);
            DB::commit();
            return $this->sendRedirectResponse(route('customer.index'), 'Customer deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('customer.index'), 'Failed to delete customer.');
        }
    }
}
