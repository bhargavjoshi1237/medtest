import React from 'react';

const RecentOrders = ({ orders }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200/60 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h3>
            <div className="space-y-3">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{order.customer_name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <p className="text-sm text-gray-500">by {order.created_by}</p>
                                    <span className="text-gray-300">•</span>
                                    <p className="text-sm text-gray-500">{order.created_at}</p>
                                </div>
                            </div>
                            <div className="text-right ml-4">
                                <p className="font-semibold text-gray-900">${order.total_amount}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm">No recent orders</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentOrders;