<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Set to true if authorization is handled elsewhere or not needed here
    }

   
    public function rules()
    {
        return [
            'maxAmt' => ['nullable', 'numeric', 'gt:0'], 
            'maxQty' => ['nullable', 'numeric', 'gt:0'], 
            'customer_uuid' => ['nullable', 'uuid'], 
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    
}
