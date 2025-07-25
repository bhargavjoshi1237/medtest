<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some product IDs from the products table
        $productIds = DB::table('products')->pluck('id')->take(3);

        foreach ($productIds as $index => $productId) {
            DB::table('notifications')->insert([
                'id' => (string) Str::uuid(),
                'product_id' => $productId,
                'title' => 'Notification Title ' . ($index + 1),
                'description' => 'This is a sample notification for product ' . $productId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
