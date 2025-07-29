import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';
import RecentOrders from '@/Components/Dashboard/RecentOrders';
import TopCustomers from '@/Components/Dashboard/TopCustomers';
import LowStockAlert from '@/Components/Dashboard/LowStockAlert';
import RevenueChart from '@/Components/Dashboard/RevenueChart';
import TopProducts from '@/Components/Dashboard/TopProducts';

export default function Dashboard({ statistics }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                    <div className="text-sm text-gray-600">
                        {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            title="Total Orders"
                            value={formatNumber(statistics.totals.orders)}
                            color="blue"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                        />
                        <StatCard
                            title="Total Customers"
                            value={formatNumber(statistics.totals.customers)}
                            color="green"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            }
                        />
                        <StatCard
                            title="Total Products"
                            value={formatNumber(statistics.totals.products)}
                            color="purple"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            }
                        />
                        <StatCard
                            title="Total Revenue"
                            value={formatCurrency(statistics.totals.revenue)}
                            color="orange"
                            icon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <RecentOrders orders={statistics.recent_orders} />
                        <TopCustomers customers={statistics.top_customers} />
                        <LowStockAlert products={statistics.low_stock_products} />
                    </div>

                    {/* Charts and Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RevenueChart monthlyData={statistics.monthly_revenue} />
                        <TopProducts products={statistics.top_selling_products} />
                    </div>

                    {/* Order Distribution */}
                    {statistics.order_distribution && statistics.order_distribution.length > 0 && (
                        <div className="mt-8">
                            <div className="bg-white rounded-lg border border-gray-200/60 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Distribution</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {statistics.order_distribution.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.status}</p>
                                                <p className="text-sm text-gray-500">{item.count} orders</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-semibold text-gray-900">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
