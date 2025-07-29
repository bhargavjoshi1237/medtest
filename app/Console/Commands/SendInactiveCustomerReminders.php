<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Customer;
use App\Repositories\ReminderRepository;
use App\Repositories\DiscountRepository;

class SendInactiveCustomerReminders extends Command
{
    protected $signature = 'reminders:send-inactive-customer';

    protected $description = 'Send reminders to customers who haven\'t placed orders in the last month';

    public function __construct(
        public ReminderRepository $reminderRepo,
        public DiscountRepository $discountRepo
    ) {}

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
    }

    protected function deleteOldReminders()
    {
        $this->reminderRepo->newQuery()->where('created_at', '<', now()->subMonth())->delete();
        $this->discountRepo->newQuery()->where('created_at', '<', now()->subMonth())->delete();
    }
}
        