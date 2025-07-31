<?php

namespace App\Filament\Widgets;

use App\Repositories\OrderRepository; 
use App\Models\Order; 
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
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->startOfDay();
            $count = Order::whereDate('created_at', $date)->count();
            $chartData[] = $count;
        }
        return [
            Stat::make('Total Orders This Week', $totalOrdersThisWeek)  
                ->description('Number of orders placed this week')
                ->descriptionIcon('heroicon-o-shopping-bag') 
                ->color('success') 
                ->chart($chartData), 
        ];
    }
}
