<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Repositories\Api\CustomerApiRepository;
use Illuminate\Http\Request;
use App\Http\Requests\Api\CustomerApiRequest;
use Illuminate\Container\Attributes\DB;
use Illuminate\Support\Facades\Log;

class CustomerApiController extends Controller
{
    public function __construct(
        public CustomerApiRepository $customerRepository
    ) {}

    public function index()
    {
        $customers = $this->customerRepository->getAll();
        return response()->json($customers);
    }

    public function store(CustomerApiRequest $request)
    {
        DB::beginTransaction();
        try {
            $customer = $this->customerRepository->store($request->validated());
            DB::commit();
            return response()->json($customer, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create customer: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create customer'], 500);
        }
    }
}
