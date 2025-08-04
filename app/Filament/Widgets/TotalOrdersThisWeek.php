<?php

namespace App\Filament\Widgets;

use App\Repositories\OrderRepository; 
use App\Models\Order; 
use App\Models\Product;
use App\Models\Customer;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TotalOrdersThisWeek extends BaseWidget
{
    protected function getCards(): array
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        $totalOrdersThisWeek = Order::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();
        $chartData = [];
        $chartProductData = [];
        $chartCustomerData = [];
        $totalcustomers = Customer::count();
        $totalrevenuethisweek = Order::whereBetween('created_at', [$startOfWeek, $endOfWeek])->sum('total_payable');

        $totalProducts = Product::count();
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->startOfDay();
            $count = Order::whereDate('created_at', $date)->count();
            $chartData[] = $count;
        }
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->startOfDay();
            $count = Product::whereDate('created_at', $date)->count();
            $chartProductData[] = $count;
        }
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->startOfDay();
            $count = Customer::whereDate('created_at', $date)->count();
            $chartCustomerData[] = $count;
        }
        return [
            Stat::make('Total Orders This Week', $totalOrdersThisWeek)  
                ->description('Number of orders placed this week')
                ->descriptionIcon('heroicon-o-shopping-bag') 
                ->color('success') 
                ->chart($chartData), 

            Stat::make('Total Customers ', $totalcustomers)  
                ->description('Number of customers in total.')
                ->descriptionIcon('heroicon-o-user') 
                ->color('success') 
                ->chart($chartCustomerData), 

            Stat::make('Total Products', $totalProducts)  
                ->description('Number of products in total.')
                ->descriptionIcon('heroicon-o-cube') 
                ->color('success') 
                ->chart($chartProductData), 

            
        ];
    }
}
