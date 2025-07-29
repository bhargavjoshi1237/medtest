import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Components/Form';

export default function Edit({ auth, order, customers, products }) {

    const user = auth && auth.user ? auth.user : {};

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Order</h2>}
        >
            <Head title="Edit Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"></div>
                    <Form
                        order={order}
                        customers={customers}
                        products={products}
                        submitRoute={route('order.update', order.id)}
                        method="put"
                        onSuccess={() => {

                        }}
                    /></div>
            </div>
        </AuthenticatedLayout>
    );
}
