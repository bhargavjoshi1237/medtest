import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const ProductList = ({ product }) => {
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return product;
    const lower = search.toLowerCase();
    return product.filter(item =>
      item.name.toLowerCase().includes(lower) ||
      (item.description && item.description.toLowerCase().includes(lower)) ||
      String(item.price).includes(lower)
    );
  }, [product, search]);

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Products
          </h2>

          <Link
            href="/product/create"
            className="px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
          >
            Add New Product
          </Link></div>
      }
    >
      <Head title="Products" />
      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            {/* Search Bar */}
            <div className='w-full   flex items-center justify-end'>
              <div className="p-4 ">
                <div className="relative w-full sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div></div>

            <div className="divide-y  ">
              {filteredProducts.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{(item.description).substring(0, 150) + "..."}</p>

                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500">Price</p>
                          <p className="text-sm font-medium">${item.price}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Quantity</p>
                          <p className={`text-sm font-medium ${item.quantity <= item.alert_quantity ? 'text-red-600' : ''
                            }`}>
                            {item.quantity}
                            {item.quantity <= item.alert_quantity && (
                              <span className="ml-1 text-xs text-red-600">(Low Stock)</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Expiry</p>
                          <p className={`text-sm font-medium ${new Date(item.expiry) < new Date(new Date().setMonth(new Date().getMonth() + 3))
                            ? 'text-yellow-600' : ''
                            }`}>
                            {new Date(item.expiry).toLocaleDateString()}
                            {new Date(item.expiry) < new Date(new Date().setMonth(new Date().getMonth() + 3)) && (
                              <span className="ml-1 text-xs text-yellow-600">(Soon)</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Alert Level</p>
                          <p className="text-sm font-medium">{item.alert_quantity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        href={`/product/${item.id}/edit`}
                        className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/product/${item.id}`}
                        className="px-3 py-1 text-sm text-white bg-black rounded-md hover:bg-gray-800"
                      >
                        View
                      </Link>
                      <Link
                        href={`/product/${item.id}`}
                        method="delete"
                        as="button"
                        data={{}}
                        onBefore={() => confirm('Are you sure you want to delete this product?')}
                        onSuccess={() => {
                          console.log('Product deleted successfully');
                        }}
                        onError={(errors) => {
                          console.log('Delete failed:', errors);
                        }}
                        className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ProductList;