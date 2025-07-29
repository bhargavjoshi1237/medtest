import React from 'react';

const TopProducts = ({ products }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200/60 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Products</h3>
            <div className="space-y-3">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                                    <p className="text-sm text-gray-500">${product.price} each</p>
                                </div>
                            </div>
                            <div className="text-right ml-4">
                                <p className="font-semibold text-gray-900">${product.total_revenue}</p>
                                <p className="text-xs text-gray-500">{product.total_sold} sold</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm">No sales data</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopProducts;