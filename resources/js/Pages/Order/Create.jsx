import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Components/Form';

export default function Create({ auth, customers, products, schemes, discounts, reminders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Order</h2>}
        >
            <Head title="Create Order" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Form
                                customers={customers}
                                products={products}
                                schemes={schemes}
                                discounts={discounts}
                                reminders={reminders}
                                submitRoute={route('order.store')}
                                method="post"
                                onSuccess={() => {
                                    // Optional: redirect or show success message
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
