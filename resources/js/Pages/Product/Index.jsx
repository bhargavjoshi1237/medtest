import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const ProductList = ({ product }) => {
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


            <div className="divide-y  ">
              {product.map((item) => (
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
                Showing {product.length} {product.length === 1 ? 'product' : 'products'}
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