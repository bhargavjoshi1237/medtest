import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function View({ customer }) {
    return (
       <AuthenticatedLayout>
         <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>
                    </div>
                    <Link
                        href={route('customer.index')}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        Back to list
                    </Link>
                </div>

                <div className="px-6 py-5 space-y-6">
                    <div className="space-y-1">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</h3>
                        <p className="text-lg font-medium text-gray-900">{customer.name}</p>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</h3>
                        <p className="text-lg font-medium text-gray-900">{customer.contact}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Link
                            href={route('customer.edit', customer.id)}
                            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Edit Customer
                        </Link>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this customer?')) {
                                    router.delete(route('customer.destroy', customer.id));
                                }
                            }}
                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Customer
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
                    <p>Created on {new Date(customer.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
       </AuthenticatedLayout>
    );
}