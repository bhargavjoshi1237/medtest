import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Components/Form";

export default function Edit({ customer }) {
  return (
    <AuthenticatedLayout>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Customer
          </h2>
          <Link
            href={route("customer.index")}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to list
          </Link>
        </div>
        <Form customer={customer} isEdit={true} />
      </div>
    </AuthenticatedLayout>
  );
}
