import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SchemesIndex({ schemes }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Discount Schemes</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your order count discount tiers</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link
                        href="/scheme/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Add New Scheme
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-xs border border-gray-100 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 border-b border-gray-100 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">Order Count</div>
                    <div className="col-span-3">Discount</div>
                    <div className="col-span-6 text-right">Actions</div>
                </div>

                <ul className="divide-y divide-gray-100">
                    {schemes.map((scheme) => (
                        <li key={scheme.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="grid grid-cols-12 items-center">
                                <div className="col-span-3 text-sm font-medium text-gray-900">
                                    {scheme.order_count}
                                </div>
                                <div className="col-span-3 text-sm text-gray-500">
                                    {scheme.discount}%
                                </div>
                                <div className="col-span-6 flex justify-end space-x-3">
                                    <Link
                                        href={`/scheme/${scheme.id}`}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/scheme/${scheme.id}/edit`}
                                        className="text-sm font-medium text-gray-600 hover:text-gray-800"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/scheme/${scheme.id}`}
                                        method="delete"
                                        as="button"
                                        className="text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}