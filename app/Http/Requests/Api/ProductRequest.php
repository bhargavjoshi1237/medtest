<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
        ];
    }
}
