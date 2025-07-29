import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ customer }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            router.delete(route('customer.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout

            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  ">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Customers</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {customer.length} {customer.length === 1 ? 'customer' : 'customers'} registered
                        </p>
                    </div>
                    <Link
                        href={route('customer.create')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Add Customer
                    </Link>
                </div>
            }
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {customer.length > 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customer.map((c) => (
                                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                        {c.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                                                        <div className="text-sm text-gray-500">{c.email || 'No email'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{c.contact}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <Link
                                                    href={route('customer.show', c.id)}
                                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('customer.edit', c.id)}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(c.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-white rounded-lg border border-gray-200 p-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No customers yet</h3>
                        <p className="mt-2 text-sm text-gray-500">Get started by adding your first customer.</p>
                        <div className="mt-6">
                            <Link
                                href={route('customer.create')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Add Customer
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}