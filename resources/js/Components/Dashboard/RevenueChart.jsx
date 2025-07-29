import React from 'react';

const RevenueChart = ({ monthlyData }) => {
    if (!monthlyData || monthlyData.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200/60 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Revenue</h3>
                <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No revenue data available</p>
                </div>
            </div>
        );
    }

    const maxRevenue = Math.max(...monthlyData.map(item => item.revenue));
    
    return (
        <div className="bg-white rounded-lg border border-gray-200/60 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Revenue</h3>
            <div className="space-y-5">
                {monthlyData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 text-sm text-gray-600 font-medium flex-shrink-0">
                            {item.month}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-900">
                                    ${item.revenue.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {item.orders_count} orders
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div 
                                    className="bg-gray-900 h-1.5 rounded-full transition-all duration-500 ease-out"
                                    style={{ 
                                        width: `${maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevenueChart;