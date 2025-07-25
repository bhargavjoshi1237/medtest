import React from 'react';
import Form from './Components/Form';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    return (
        <AuthenticatedLayout>
            <div className="max-w-md mx-auto p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Create Discount Scheme
                </h2>
                <p className="text-sm text-gray-500">
                    Set up a new order count discount tier
                </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6">
                    <Form />
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}