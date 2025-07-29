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