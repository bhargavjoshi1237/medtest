<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Repositories\Api\CustomerApiRepository;
use Illuminate\Http\Request;
use App\Http\Requests\Api\StoreCustomerApiRequest; // import the request
use Illuminate\Support\Facades\Log;

class CustomerApiController extends Controller
{
    

    public function __construct(public CustomerApiRepository $customerRepository)
    {
        
    }   
    
       
    

    public function index()
    {
        $customers = $this->customerRepository->getAll();

        return response()->json($customers);
    }

    public function store(StoreCustomerApiRequest $request)
    {
        $validated = $request->validated();
        Log::info('Validated customer data:', $validated);
        $customer = $this->customerRepository->store($validated);

        return response()->json($customer, 201);
    }
}

