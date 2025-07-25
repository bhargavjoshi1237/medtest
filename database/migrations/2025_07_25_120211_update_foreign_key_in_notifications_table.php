<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
             // Drop the foreign key constraint that was created on the wrong column
            $table->dropForeign(['product-id']);
            // Drop the incorrect column
            $table->dropColumn('product-id');

            // Add the foreign key constraint to the correct 'product_id' column
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Drop the correct foreign key
            $table->dropForeign(['product_id']);

            // Re-add the incorrect column and foreign key to revert the change
            $table->foreignUuid('product-id')->references('id')->on('products');
        });
    }
};
