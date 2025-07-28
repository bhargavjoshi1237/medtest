<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /** 
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;  
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'total_payable' => 'required|numeric|min:0',
            'discount' => 'required|integer|min:0',
            'final_amount' => 'required|numeric|min:0',
            'products'    => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id', // <-- changed from product_id to id
            'products.*.quantity'   => 'required|integer|min:1',
            
        ];
    }
    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        $data['created_by'] = auth()->id();
        return $data;
    }
}
