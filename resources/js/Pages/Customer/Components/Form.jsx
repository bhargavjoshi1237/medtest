import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Form({ customer, isEdit }) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: customer?.name || "",
    contact: customer?.contact || "",
  });

  useEffect(() => {
    setData({
      name: customer?.name || "",
      contact: customer?.contact || "",
    });
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route("customer.update", customer.id));
    } else {
      post(route("customer.store"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={data.contact}
            onChange={(e) => setData("contact", e.target.value)}
            maxLength={12}
            required
          />
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isEdit ? "Update Customer" : "Create Customer"}
        </button>
      </form>
    </div>
  );
}
