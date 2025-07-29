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
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-2 focus:border-black focus:outline-none transition"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 font-normal">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Contact
          </label>
          <input
            type="text"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-2 focus:border-black focus:outline-none transition"
            value={data.contact}
            onChange={(e) => setData("contact", e.target.value)}
            maxLength={12}
            required
          />
          {errors.contact && (
            <p className="text-xs text-red-500 mt-1 font-normal">{errors.contact}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition disabled:opacity-60"
        >
          {isEdit ? "Update Customer" : "Create Customer"}
        </button>
      </form>
    </div>
  );
}
