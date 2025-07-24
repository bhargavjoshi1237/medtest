import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, customers, products }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        status: 'pending',
        products: [],
    });

    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const addProduct = () => {
        if (!selectedProduct || quantity < 1) return;

        const product = products.find(p => p.id == selectedProduct);
        const existingProductIndex = data.products.findIndex(p => p.id == selectedProduct);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...data.products];
            updatedProducts[existingProductIndex].quantity += quantity;
            setData('products', updatedProducts);
        } else {
            setData('products', [
                ...data.products,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                }
            ]);
        }
        setSelectedProduct('');
        setQuantity(1);
    };

    const removeProduct = (index) => {
        const updatedProducts = [...data.products];
        updatedProducts.splice(index, 1);
        setData('products', updatedProducts);
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedProducts = [...data.products];
        updatedProducts[index].quantity = newQuantity;
        setData('products', updatedProducts);
    };

    const calculateTotal = () => {
        return data.products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    const submit = (e) => {
        e.preventDefault();
        const total = calculateTotal();
        const discount = 0; // default, adjust if you add discount UI
        const final = total - discount;

        post(route('order.store'), {
            data: {
                customer_id: data.customer_id,
                total_payable: total.toFixed(2),
                discount,
                final_amount: final.toFixed(2),
                products: data.products.map(p => ({ id: p.id, quantity: p.quantity }))
            }
        });
    };

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
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
                                        Customer
                                    </label>
                                    <select
                                        id="customer"
                                        value={data.customer_id}
                                        onChange={(e) => setData('customer_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Select a customer</option>
                                        {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.customer_id && <div className="text-red-500 mt-1">{errors.customer_id}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Add Products
                                    </label>
                                    <div className="flex">
                                        <select
                                            value={selectedProduct}
                                            onChange={(e) => setSelectedProduct(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                        >
                                            <option value="">Select a product</option>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name} - ${product.price}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                            className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={addProduct}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {data.products.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Cart</h3>
                                        <table className="min-w-full bg-white">
                                            <thead>
                                                <tr>
                                                    <th className="py-2 px-4 border-b">Product</th>
                                                    <th className="py-2 px-4 border-b">Price</th>
                                                    <th className="py-2 px-4 border-b">Quantity</th>
                                                    <th className="py-2 px-4 border-b">Total</th>
                                                    <th className="py-2 px-4 border-b">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.products.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="py-2 px-4 border-b">{product.name}</td>
                                                        <td className="py-2 px-4 border-b">${product.price}</td>
                                                        <td className="py-2 px-4 border-b">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={product.quantity}
                                                                onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                                                                className="w-16 border rounded py-1 px-2"
                                                            />
                                                        </td>
                                                        <td className="py-2 px-4 border-b">${(product.price * product.quantity).toFixed(2)}</td>
                                                        <td className="py-2 px-4 border-b">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeProduct(index)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="text-right mt-4">
                                            <strong>Total Amount: ${calculateTotal().toFixed(2)}</strong>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.customer_id || data.products.length === 0}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                                    >
                                        Create Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
