<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'name' => 'John Smith',
                'contact' => '15550123'
            ],
            [
                'name' => 'Sarah Johnson',
                'contact' => '5550456'
            ],
            [
                'name' => 'Michael Brown',
                'contact' => '5550789'
            ],
            [
                'name' => 'Emily Davis',
                'contact' => '5550321'
            ],
            [
                'name' => 'David Wilson',
                'contact' => '5550654'
            ]
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}