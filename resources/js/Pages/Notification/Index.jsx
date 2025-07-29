import React from 'react';
import { Link } from '@inertiajs/react';

import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ notifications, auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    <div className="flex items-center space-x-4">
                    </div>
                </div>
            }
        >
            <Head title="Notifications" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {(notifications.data ?? notifications).length > 0 ? (
                            (notifications.data ?? notifications).map((notification) => (
                                <div
                                    key={notification.id}
                                    className="group hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="p-5">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 pt-0.5">
                                                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <svg
                                                        className="h-5 w-5 text-blue-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        {notification.title}
                                                    </h3>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                        {notification.product.name}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {notification.description}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(notification.created_at).toLocaleString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                    <Link
                                                        href={route('notification.destroy', notification.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-xs font-medium text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={(e) => {
                                                            if (!confirm('Are you sure you want to delete this notification?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    You don't have any notifications yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;