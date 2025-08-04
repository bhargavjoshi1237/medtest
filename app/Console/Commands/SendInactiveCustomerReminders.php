<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Customer;
use App\Repositories\ReminderRepository;
use App\Repositories\DiscountRepository;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class SendInactiveCustomerReminders extends Command
{
    protected $signature = 'reminders:send-inactive-customer';

    protected $description = 'Send reminders to customers who haven\'t placed orders in the last month';

    public function __construct(
        public ReminderRepository $reminderRepo,
        public DiscountRepository $discountRepo
    ) {
        parent::__construct();  
    }

    public function handle()
    {
        $this->deleteOldReminders();

        $inactiveCustomers = Customer::whereDoesntHave('orders', function ($query) {
            $query->whereDate('created_at', now()->toDateString());
        })->get();

        foreach ($inactiveCustomers as $customer) {
            $alreadyReminded = $this->reminderRepo->exists('customer_id', $customer->id);
            if (!$alreadyReminded) {
                $this->reminderRepo->store([
                    'customer_id' => $customer->id,
                    'info' => 'Inactive for over a month',
                ]);
                $this->discountRepo->store([
                    'customer_id' => $customer->id,
                    'discount' => 10,
                    'expires' => now()->addMonth(),
                ]);
            }
        }

        $now = now();
        $oneWeekLater = $now->copy()->addWeek();
        $oneMonthLater = $now->copy()->addMonth();
        $productsWeek = $this->discountRepo->newQuery()
            ->whereBetween('expiry_date', [$now, $oneWeekLater])
            ->get();
        foreach ($productsWeek as $product) {
            $customerId = $product->customer_id ?? null;
            if ($customerId) {
                $exists = $this->reminderRepo->newQuery()
                    ->where('customer_id', $customerId)
                    ->where('info', 'LIKE', "%Product '{$product->name}' expiring in 1 week%")
                    ->exists();
                if (!$exists) {
                    $this->reminderRepo->store([
                        'customer_id' => $customerId,
                        'info' => "Product '{$product->name}' expiring in 1 week (Expiry: {$product->expiry_date})",
                    ]);
                }
            }
        }

        $productsMonth = $this->discountRepo->newQuery()
            ->whereBetween('expiry_date', [$now, $oneMonthLater])
            ->get();
        foreach ($productsMonth as $product) {
            $customerId = $product->customer_id ?? null;
            if ($customerId) {
                $exists = $this->reminderRepo->newQuery()
                    ->where('customer_id', $customerId)
                    ->where('info', 'LIKE', "%Product '{$product->name}' expiring in 1 month%")
                    ->exists();
                if (!$exists) {
                    $this->reminderRepo->store([
                        'customer_id' => $customerId,
                        'info' => "Product '{$product->name}' expiring in 1 month (Expiry: {$product->expiry_date})",
                    ]);
                }
            }
        }
    }

    protected function deleteOldReminders()
    {
        $this->reminderRepo->newQuery()->where('created_at', '<', now()->subMonth())->delete();
        $this->discountRepo->newQuery()->where('created_at', '<', now()->subMonth())->delete();
    }
}
