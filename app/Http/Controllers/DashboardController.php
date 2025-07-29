<?php

namespace App\Http\Controllers;

use App\Repositories\DashboardRepository;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{

    public function __construct(
        public DashboardRepository $dashboardRepository
    ) {}

    public function index(): Response
    {
        $statistics = [
            'totals' => [
                'orders' => $this->dashboardRepository->getTotalOrders(),
                'customers' => $this->dashboardRepository->getTotalCustomers(),
                'products' => $this->dashboardRepository->getTotalProducts(),
                'revenue' => $this->dashboardRepository->getTotalRevenue(),
            ],
            'recent_orders' => $this->dashboardRepository->getRecentOrders(),
            'top_customers' => $this->dashboardRepository->getTopCustomers(),
            'low_stock_products' => $this->dashboardRepository->getLowStockProducts(),
            'monthly_revenue' => $this->dashboardRepository->getWeeklyRevenue(),
            'order_distribution' => $this->dashboardRepository->getOrderStatusDistribution(),
            'top_selling_products' => $this->dashboardRepository->getTopSellingProducts(),
        ];

        return Inertia::render('Dashboard', [
            'statistics' => $statistics
        ]);
    }
}
