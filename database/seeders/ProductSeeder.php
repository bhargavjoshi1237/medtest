<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Paracetamol ',
                'description' => 'Pain relief and fever reducer tablets',
                'price' => 25,
                'quantity' => 100,
                'expiry' => '2026-12-31',
                'alert_quantity' => 20
            ],
            [
                'name' => 'Amoxicillin ',
                'description' => 'Antibiotic capsules for bacterial infections',
                'price' => 45,
                'quantity' => 75,
                'expiry' => '2026-08-15',
                'alert_quantity' => 15
            ],
            [
                'name' => 'Ibuprofen ',
                'description' => 'Anti-inflammatory pain relief tablets',
                'price' => 32,
                'quantity' => 150,
                'expiry' => '2027-03-20',
                'alert_quantity' => 25
            ],
            [
                'name' => 'Vitamin D3 ',
                'description' => 'Vitamin D supplement capsules',
                'price' => 18,
                'quantity' => 200,
                'expiry' => '2026-11-10',
                'alert_quantity' => 30
            ],
            [
                'name' => 'Omeprazole ',
                'description' => 'Proton pump inhibitor for acid reflux',
                'price' => 55,
                'quantity' => 80,
                'expiry' => '2025-09-30',
                'alert_quantity' => 10
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
