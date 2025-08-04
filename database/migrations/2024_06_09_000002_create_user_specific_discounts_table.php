<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Userspecificdiscounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('customer_id')->index(); // Added customer_id column
            $table->decimal('discount', 8, 2);
            $table->timestamps();

            // Updated foreign key to reference customers table
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Userspecificdiscounts');
    }
};
