import React from 'react';
import { Link } from '@inertiajs/react';
import Card from './Components/Card';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ notifications, auth }) => {
    return (
       <AuthenticatedLayout
       
        user={auth.user}
            header={
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Notifications</h2>
                    
                </div>
            }
        >
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="space-y-4">
                {(notifications.data ?? notifications).map(notification => (
                    <div 
                        key={notification.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                        {notification.title}
                                    </h2>
                                    <p className="text-gray-600 mb-3">
                                        {notification.description}
                                    </p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {notification.product.name}
                                </span>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                                {new Date(notification.created_at).toLocaleString()}
                            </div>
                            <Link
                                href={route('notification.destroy', notification.id)}
                                method="delete"
                                as="a"
                                className="mt-4 text-red-600 hover:underline text-sm inline-block"
                                onClick={e => {
                                    if (!confirm('Are you sure you want to delete this notification?')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div></AuthenticatedLayout>
    );
};

export default Index;