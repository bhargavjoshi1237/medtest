<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductApiRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'max' => ['nullable', 'numeric'],
            'sort' => ['nullable', 'string'],
            'price_above' => ['nullable', 'numeric'],
            'price_below' => ['nullable', 'numeric'],
            'quantity_above' => ['nullable', 'numeric'],
            'quantity_below' => ['nullable', 'numeric'],
            'alert_quantity_above' => ['nullable', 'numeric'],
            'alert_quantity_below' => ['nullable', 'numeric'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
