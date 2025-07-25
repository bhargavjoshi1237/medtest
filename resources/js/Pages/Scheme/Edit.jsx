import React from 'react';
import Form from './Components/Form';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
    const { scheme } = usePage().props;

    return (
        <AuthenticatedLayout>
             <div className="max-w-md mx-auto p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        {/* <Link 
                            href="/schemes" 
                            className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 uppercase tracking-wider mb-4 transition-colors"
                        >
                            <svg 
                                className="w-3 h-3 mr-2" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            BACK TO SCHEMES
                        </Link> */}
                        <h1 className="text-2xl font-bold text-gray-900">Edit Discount Tier</h1>
                    </div>
                    
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    Update the order count and discount percentage
                </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6">
                    <Form
                        initialValues={{
                            order_count: scheme.order_count,
                            discount: scheme.discount
                        }}
                        schemeId={scheme.id}
                        buttonText="Save Changes"
                    />
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}