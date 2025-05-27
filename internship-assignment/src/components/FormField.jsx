import React from "react";

const FormField = ({ label, children, error }) => (
  <div className="mb-4">
    <label className="block mb-1 font-semibold">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormField;