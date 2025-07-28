import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Head } from '@inertiajs/react';

const Index = ({ orders, auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>
                    <a
                        href="/order/create"
                        className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                         Create Order
                    </a>
                </div>
            }
        >
            <Head title="Orders" />
            
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {orders.length} orders found
                                    </p>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Orders Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Discount
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Final
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                                                    <div className="text-xs text-gray-500">{order.customer.contact}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${order.total_payable}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.discount}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                                                        ${order.final_amount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                    <a
                                                        href={`/order/${order.id}`}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        View
                                                    </a>
                                                    <a
                                                        href={`/order/${order.id}/edit`}
                                                        className="text-gray-600 hover:text-gray-800"
                                                    >
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                                <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of{' '}
                                    <span className="font-medium">{orders.length}</span> results
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        disabled
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        disabled
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;