import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SchemeDetail({ scheme }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <Link 
                        href="/scheme" 
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to all schemes
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Discount Scheme Details</h1>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                    <Link
                        href={`/scheme/${scheme.id}/edit`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Edit
                    </Link>
                    <Link
                        href={`/scheme/${scheme.id}`}
                        method="delete"
                        as="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-xs border border-gray-100 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 border-b border-gray-100 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">Field</div>
                    <div className="col-span-8">Value</div>
                </div>

                <div className="divide-y divide-gray-100">
                    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-12 items-center">
                            <div className="col-span-4 text-sm font-medium text-gray-500">
                                Order Count
                            </div>
                            <div className="col-span-8 text-sm text-gray-900">
                                {scheme.order_count}
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-12 items-center">
                            <div className="col-span-4 text-sm font-medium text-gray-500">
                                Discount
                            </div>
                            <div className="col-span-8 text-sm text-gray-900">
                                {scheme.discount}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}