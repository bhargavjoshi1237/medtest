import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function View({ customer, auth, orders }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-medium text-gray-900">Customer Profile</h1>
                    </div>
                    <Link 
                        href={route('customer.index')}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        ← All Customers
                    </Link>
                </div>

                {/* Customer Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Name</h2>
                            <p className="text-base font-normal text-gray-900">{customer.name}</p>
                        </div>
                        <div>
                            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contact</h2>
                            <p className="text-base font-normal text-gray-900">{customer.contact}</p>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Link
                            href={route('customer.edit', customer.id)}
                            className="px-3 py-1.5 text-sm font-medium rounded border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => confirm('Delete this customer?') && router.delete(route('customer.destroy', customer.id))}
                            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                            Delete
                        </button>
                             <Link
                            href={route('order.create')}
                            className="px-3 py-1.5 text-sm font-medium rounded border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                            Create Order
                        </Link>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="space-y-3">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Orders</h2>
                    
                    {orders.length > 0 ? (
                        <div className="space-y-2">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-gray-900">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">${order.final_amount}</p>
                                            {order.discount > 0 && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Saved ${order.discount}
                                                </p>
                                            )}
                                            <Link
                                                href={`/order/${order.id}`}
                                                className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                View Order
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="mt-3 text-sm font-medium text-gray-900">No orders yet</h3>
                            <p className="mt-1 text-sm text-gray-500">This customer hasn't placed any orders.</p>
                        </div>
                    )}
                </div>

                {/* Metadata */}
                <div className="mt-6 text-xs text-gray-500 text-center">
                    Customer since {new Date(customer.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}