import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Form({ initialValues, schemeId, onSuccess, buttonText }) {
    const defaultValues = { order_count: '', discount: '' };
    const { data, setData, post, put, processing, errors } = useForm(initialValues || defaultValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (schemeId) {
            put(route("scheme.update", schemeId), { onSuccess });
        } else {
            post(route("scheme.store"), { onSuccess });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-xs p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="order_count" className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        ORDER COUNT
                    </label>
                    <input
                        type="number"
                        name="order_count"
                        id="order_count"
                        value={data.order_count}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400 transition-all"
                        placeholder="Enter order count"
                    />
                    {errors.order_count && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.order_count}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="discount" className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        DISCOUNT (%)
                    </label>
                    <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={data.discount}
                        onChange={handleChange}
                        required
                        min={0}
                        max={100}
                        className="block w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400 transition-all"
                        placeholder="0-100"
                    />
                    {errors.discount && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.discount}
                        </p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center py-2.5 px-4 rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            buttonText || (schemeId ? 'Update Scheme' : 'Create Scheme')
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}