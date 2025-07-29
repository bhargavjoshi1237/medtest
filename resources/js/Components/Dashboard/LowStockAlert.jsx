import React from 'react';

const LowStockAlert = ({ products }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200/60 p-6">
            <div className="flex items-center mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
            </div>
            <div className="space-y-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="p-4 bg-red-50/50 rounded-lg border border-red-100/60">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 mb-1">{product.name}</p>
                                    <p className="text-sm text-red-600">
                                        Only {product.current_quantity} left (Alert: {product.alert_quantity})
                                    </p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="font-semibold text-gray-900 mb-1">${product.price}</p>
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                                        Low Stock
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-emerald-600 font-medium text-sm">All products are well stocked!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LowStockAlert;