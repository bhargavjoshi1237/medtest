import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, order }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order Details</h2>}
        >
            <Head title={`Order #${order.id.slice(0, 8)}`} />

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                            ← Back
                        </button>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900">
                                        Order #{order.id.slice(0, 8)}
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                    Completed
                                </span>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer</h2>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                                    <p className="text-sm text-gray-500">{order.customer.contact}</p>
                                </div>
                                <a
                                    href={`/customer/${order.customer_id}`}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                >
                                    View profile →
                                </a>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Total Payable</p>
                                    <p className="text-xl font-semibold text-gray-900">${order.total_payable}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Discount</p>
                                    <p className="text-xl font-semibold text-gray-900">-${order.discount}</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="text-sm text-blue-600">Final Amount</p>
                                    <p className="text-xl font-semibold text-blue-700">${order.final_amount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="px-6 py-5">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Products</h2>
                            <div className="space-y-4">
                                {order.products.map((product) => (
                                    <div key={product.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">${product.price}</p>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {product.pivot.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex   items-center">
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date(order.updated_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                           <div className='flex gap-3 ml-auto'>
                             <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                                Print Receipt
                            </button>
                             <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                                Email Receipt
                            </button></div>
                           </div>
                        </div>
                    </div>
                </div>
                     </AuthenticatedLayout>
    );
}