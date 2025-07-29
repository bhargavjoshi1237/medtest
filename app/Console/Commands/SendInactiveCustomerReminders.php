<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reminder;
use App\Models\Customer;
use App\Models\Discount;

class SendInactiveCustomerReminders extends Command
{

    protected $signature = 'reminders:send-inactive-customer';

    protected $description = 'Send reminders to customers who haven\'t placed orders in the last month';

    public function handle()
    {
        $this->deleteOldReminders();

        $inactiveCustomers = Customer::whereDoesntHave('orders', function ($query) {
            $query->whereDate('created_at', now()->toDateString());
        })->get();

        foreach ($inactiveCustomers as $customer) {

            $alreadyReminded = Reminder::where('customer_id', $customer->id)->exists();
            if (!$alreadyReminded) {
                Reminder::create([
                    'customer_id' => $customer->id,
                    'info' => 'Inactive for over a month',
                ]);
                Discount::create([
                    'customer_id' => $customer->id,
                    'discount' => 10,
                    'expires' => now()->addMonth(),
                ]);
            }
        }
    }

    protected function deleteOldReminders()
    {
        Reminder::where('created_at', '<', now()->subMonth())->delete();
        Discount::where('created_at', '<', now()->subMonth())->delete();
    }
}
