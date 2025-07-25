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
        return true; // <-- allow authenticated users
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
        ];
    }
    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        $data['created_by'] = auth()->id();
        return $data;
    }
}
