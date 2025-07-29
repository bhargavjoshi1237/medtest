import React from 'react';
import { Head } from '@inertiajs/react';
import Form from './Components/Form';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const handleSuccess = () => {

    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Product
                </h2>
            }
        >
            <Head title="Create Product" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Form
                        product={null}
                        submitRoute={route('product.store')}
                        method="post"
                        onSuccess={handleSuccess}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}