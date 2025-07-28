import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Form({
    order = null,
    customers,
    products,
    schemes,
    submitRoute,
    discounts,
    method,
    onSuccess = () => { },
}) {
    const initialProducts = order && Array.isArray(order.products)
        ? order.products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.pivot.quantity,
        }))
        : [];

    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: order ? order.customer_id : '',
        products: initialProducts,
        total_payable: order ? order.total_payable : '',
        discount: order ? order.discount : '',
        final_amount: order ? order.final_amount : '',
    });

    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [manualDiscount, setManualDiscount] = useState(false);

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

    const getDiscountForOrderCount = (orderCount) => {
        if (!schemes || schemes.length === 0) return 0;
        const applicable = schemes
            .filter(s => orderCount >= s.order_count)
            .sort((a, b) => b.order_count - a.order_count)[0];
        return applicable ? parseFloat(applicable.discount) : 0;
    };

    useEffect(() => {
        setManualDiscount(!!data._manualDiscount);
    }, [data._manualDiscount]);

    useEffect(() => {
        const customer = customers.find(c => c.id === data.customer_id);
        // Check if customer has a discount in the discounts prop
        const discountObj = discounts?.find(d => d.customer_id === data.customer_id);
        if (discountObj) {
            setData(current => ({
                ...current,
                discount: discountObj.discount,
                _manualDiscount: false, // lock discount
            }));
        } else {
            const orderCount = customer ? customer.order_count : 0;
            const discountPercent = getDiscountForOrderCount(orderCount);
            // Only auto-set discount if user hasn't manually changed it
            setData(current => {
                if (current._manualDiscount) return current;
                return {
                    ...current,
                    discount: discountPercent,
                };
            });
        }
    }, [data.customer_id, customers, schemes, discounts]);

    useEffect(() => {
        const total = calculateTotal();
        const discountPercent = parseFloat(data.discount) || 0;
        const discountAmount = total * (discountPercent / 100);
        const final = total - discountAmount;
        setData(current => {
            const totalStr = total.toFixed(2);
            const discountStr = discountAmount.toFixed(2);
            const finalStr = final.toFixed(2);
            if (
                current.total_payable === totalStr &&
                current.final_amount === finalStr &&
                current.discount_amount === discountStr
            ) {
                return current;
            }
            return {
                ...current,
                total_payable: totalStr,
                discount_amount: discountStr,
                final_amount: finalStr,
            };
        });
    }, [data.products, data.discount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            customer_id: data.customer_id,
            total_payable: data.total_payable,
            discount: data.discount,
            final_amount: data.final_amount,
            products: data.products.map(p => ({
                product_id: p.id,
                quantity: p.quantity
            }))
        };
        if (method === 'put') {
            put(submitRoute, {
                onSuccess,
                preserveScroll: true,
                data: payload,
            });
        } else {
            post(submitRoute, {
                onSuccess,
                preserveScroll: true,
                data: payload,
            });
        }
    };

    const isUpdate = method === 'put';
    const customerValue = isUpdate ? order.customer_id : data.customer_id;
    const totalPayableValue = isUpdate ? order.total_payable : data.total_payable;
    const discountValue = isUpdate ? order.discount : data.discount;
    const finalAmountValue = isUpdate ? order.final_amount : data.final_amount;
    const discountPercentValue = isUpdate ? order.discount : data.discount;
    const discountAmountValue = data.discount_amount || "0.00";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errors.customer_id && <div className="text-red-500 text-sm">{errors.customer_id}</div>}
            {Object.entries(errors).map(([field, error]) => (
                <div key={field} className="text-red-500 text-sm">{error}</div>
            ))}
            {/* <p>{JSON.stringify(discounts)}</p> */}
            <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer
                </label>
                <div className="flex items-center gap-2">
                    <select
                        id="customer"
                        value={customerValue}
                        onChange={e => setData('customer_id', e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-black focus:outline-none focus:ring-black disabled:opacity-50"
                        disabled={isUpdate}
                    >
                        <option value="">Select a customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                    <a
                        href="/customer/create"
                        className="inline-flex text-center items-center rounded-md border border-transparent bg-black px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        rel="noopener noreferrer"
                        title="new customer"
                    >
                         Add
                    </a>
                </div>
                {data.customer_id && (() => {
                    const discountObj = discounts?.find(d => d.customer_id === data.customer_id);
                    if (discountObj) {
                        return (
                            <div className="mt-2 px-4 py-2 rounded bg-green-100 text-green-800 text-sm font-semibold flex items-center gap-2">
                                <span role="img" aria-label="confetti">🎉</span>
                                Special discount for Returning Customer: {discountObj.discount}% applied for this customer!
                            </div>
                        );
                    }
                    // Only show congratulation if scheme discount is nonzero
                    const customer = customers.find(c => c.id === data.customer_id);
                    const orderCount = customer ? customer.order_count : 0;
                    const schemeDiscount = getDiscountForOrderCount(orderCount);
                    if (schemeDiscount > 0) {
                        return (
                            <div className="mt-2 px-4 py-2 rounded bg-green-100 text-green-800 text-sm font-semibold flex items-center gap-2">
                                <span role="img" aria-label="confetti">🎉</span>
                                Congratulations! This customer has {orderCount} orders.
                                They will get a {schemeDiscount}% discount automatically applied!
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>

            {!isUpdate && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add Products
                    </label>
                    <div className="flex gap-2">
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="flex-1 rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-black focus:outline-none focus:ring-black"
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
                            className="w-20 rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-black focus:outline-none focus:ring-black"
                        />
                        <button
                            type="button"
                            onClick={addProduct}
                            className="inline-flex items-center rounded-md border border-transparent bg-black px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}

            {data.products.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Cart</h3>
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    {!isUpdate && <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            <input
                                                type="number"
                                                min="1"
                                                value={product.quantity}
                                                onChange={(e) => !isUpdate && updateQuantity(index, parseInt(e.target.value) || 1)}
                                                className="w-16 rounded-md border border-gray-300 py-1 px-2 text-sm focus:border-black focus:outline-none focus:ring-black"
                                                disabled={isUpdate}
                                            />
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${(product.price * product.quantity).toFixed(2)}</td>
                                        {!isUpdate && (
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3 text-right text-sm font-medium">
                        Total Amount: ${calculateTotal().toFixed(2)}
                    </div>
                </div>
            )}

            <div>
                <label htmlFor="total_payable" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Payable
                </label>
                <input
                    id="total_payable"
                    name="total_payable"
                    type="text"
                    value={totalPayableValue}
                    readOnly
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-black focus:outline-none focus:ring-black bg-gray-50"
                />
            </div>

            <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                </label>
                <div className="flex gap-2">
                    <input
                        id="discount"
                        name="discount"
                        type="number"
                        min="0"
                        value={discountPercentValue}
                        readOnly={!manualDiscount}
                        onChange={e => {
                            setData(current => ({
                                ...current,
                                discount: e.target.value,
                                _manualDiscount: true,
                            }));
                        }}
                        className={`w-full rounded-md border border-gray-300 py-2 px-3 text-sm ${manualDiscount ? 'bg-white' : 'bg-gray-50'}`}
                    />
                    {!manualDiscount && (
                        <button
                            type="button"
                            onClick={() => {
                                setManualDiscount(true);
                                setData(current => ({
                                    ...current,
                                    _manualDiscount: true,
                                }));
                            }}
                            className="inline-flex items-center rounded-md border border-transparent bg-black px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                            Override Discount
                        </button>
                    )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    Discount Amount: ${discountAmountValue}
                </div>
            </div>

            <div>
                <label htmlFor="final_amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Final Amount
                </label>
                <input
                    id="final_amount"
                    name="final_amount"
                    type="text"
                    value={finalAmountValue}
                    readOnly
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-black focus:outline-none focus:ring-black bg-gray-50"
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={
                        processing ||
                        !customerValue ||
                        data.products.length === 0 ||
                        !totalPayableValue ||
                        !finalAmountValue
                    }
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
                >
                    {isUpdate ? 'Update Order' : 'Create Order'}
                </button>
            </div>
        </form>
    );
}