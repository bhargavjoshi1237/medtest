<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSchemeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'order_count' => 'required|integer|min:0',
            'discount' => 'required|integer|min:0|max:100',
        ];
    }
}
