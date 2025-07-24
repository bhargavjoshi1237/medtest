import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Form({ product = null, submitRoute, method = 'post', onSuccess }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        quantity: product?.quantity || '',
        expiry: product?.expiry || '',
        alert_quantity: product?.alert_quantity || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitMethod = method === 'put' ? put : post;
        submitMethod(submitRoute, {
            transform: (data) => ({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price).toFixed(2),
                quantity: parseInt(data.quantity),
                expiry: data.expiry,
                alert_quantity: parseInt(data.alert_quantity)
            }),
            onSuccess: () => {
                console.log(`Product ${method === 'put' ? 'updated' : 'created'} successfully`);
                if (onSuccess) onSuccess();
            },
            onError: (errors) => {
                console.log('Form errors:', errors);
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    {Object.entries(errors).map(([field, error]) => (
                                        <li key={field}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-semibold text-gray-900">
                        {product ? 'Edit Product' : 'Create New Product'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
                    <div className="p-6 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter product name"
                            />
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
                                className="block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter product description"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="block w-full pl-7 pr-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
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
                                    className="block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    id="expiry"
                                    value={data.expiry}
                                    onChange={(e) => setData('expiry', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
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
                                    className="block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {product ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                product ? 'Update Product' : 'Create Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}