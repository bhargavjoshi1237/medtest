import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ProductShow({ product }) {
  const isLowStock = product.quantity <= product.alert_quantity;
  const expiryDate = new Date(product.expiry);
  const isExpiringSoon = expiryDate < new Date(new Date().setMonth(new Date().getMonth() + 3));

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">

          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Products
          </h2>
          <div className="flex gap-2">
            <Link
              href={`/product/${product.id}/edit`}
              className="px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
            >
              Edit Product
            </Link>
            <Link
              href="/product"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Products
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Product - ${product.name}`} />

      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>

            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Product Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Price</p>
                      <p className="mt-1 text-sm text-gray-900">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p className={`mt-1 text-sm ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.quantity}
                        {isLowStock && <span className="ml-2 text-xs text-red-600">(Low Stock)</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Alert Quantity</p>
                    <p className="mt-1 text-sm text-gray-900">{product.alert_quantity}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                    <p className={`mt-1 text-sm ${isExpiringSoon ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {expiryDate.toLocaleDateString()}
                      {isExpiringSoon && <span className="ml-2 text-xs text-yellow-600">(Expiring Soon)</span>}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Created At</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(product.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Updated At</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(product.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}