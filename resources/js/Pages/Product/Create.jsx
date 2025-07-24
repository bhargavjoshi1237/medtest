import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        expiry: '',
        alert_quantity: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Original form data:', data);

        post(route('product.store'), {
            transform: (data) => ({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price).toFixed(2), // Convert to decimal format like "25.00"
                quantity: parseInt(data.quantity), // Convert to integer
                expiry: data.expiry,
                alert_quantity: parseInt(data.alert_quantity) // Convert to integer
            }),
            onBefore: (visit) => {
                console.log('Transformed data being sent:', visit.data);
            }
        });
    };

    return (
        <>
            <Head title="Create Product" />

            <div className="max-w-2xl mx-auto p-6">
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Validation Errors:</h2>
                        <pre className="text-sm text-red-700 whitespace-pre-wrap">
                            {JSON.stringify(errors, null, 2)}
                        </pre>
                    </div>
                )}

                

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter product name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter product description"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    id="expiry"
                                    value={data.expiry}
                                    onChange={(e) => setData('expiry', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                            </div>

                            <div>
                                <label htmlFor="alert_quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                    Alert Quantity
                                </label>
                                <input
                                    type="number"
                                    id="alert_quantity"
                                    value={data.alert_quantity}
                                    onChange={(e) => setData('alert_quantity', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.alert_quantity && <p className="text-red-500 text-sm mt-1">{errors.alert_quantity}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}