import React from 'react';

const TopCustomers = ({ customers }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200/60 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Customers</h3>
            <div className="space-y-3">
                {customers.length > 0 ? (
                    customers.map((customer, index) => (
                        <div key={customer.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                                    <p className="text-sm text-gray-500">{customer.contact}</p>
                                </div>
                            </div>
                            <div className="text-right ml-4">
                                <p className="font-semibold text-gray-900">${customer.total_spent}</p>
                                <p className="text-xs text-gray-500">{customer.total_orders} orders</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm">No customer data</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopCustomers;