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
            $table->dropForeign(['product-id']);
            $table->string('id', 36)->change();
            $table->string('product_id', 36)->change();
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->uuid('id')->change();
            $table->uuid('product_id')->change();
            $table->foreignUuid('product-id')->references('id')->on('products');
        });
    }
};
