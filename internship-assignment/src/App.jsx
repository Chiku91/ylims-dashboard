import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Form from "./components/Form";

import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [samples, setSamples] = useState([
    {
      id: "SMP1001",
      name: "Sample A",
      type: "Blood",
      collectedOn: "2025-05-25",
      status: "Pending",
    },
    {
      id: "SMP1002",
      name: "Sample B",
      type: "Urine",
      collectedOn: "2025-05-24",
      status: "Processing",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSample, setEditingSample] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Open form with empty sample for add
  const handleAddClick = () => {
    setEditingSample(null); 
    setIsFormOpen(true);
  };

  // Open form for editing
  const handleEditClick = (sample) => {
    setEditingSample(sample);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setEditingSample(null);
    setIsFormOpen(false);
  };

  // Save sample (add or update)
  const handleSaveSample = (sample) => {
    setSamples((prevSamples) => {
      const exists = prevSamples.some((s) => s.id === sample.id);
      if (exists) {
        return prevSamples.map((s) => (s.id === sample.id ? sample : s));
      } else {
        return [...prevSamples, sample];
      }
    });
    handleCloseForm();
  };

  // Delete sample
  const handleDeleteSample = (id) => {
    if (window.confirm("Are you sure you want to delete this sample?")) {
      setSamples((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          {/* Left side: title + small image */}
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">My Sample Management Dashboard</h1>
            <img
              src="/medical.jpg"
              alt="Medical Logo"
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Right side: action buttons */}
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleAddClick}
            >
              Add Sample
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>

        <Table
          samples={samples}
          onEdit={handleEditClick}
          onDelete={handleDeleteSample}
          isFormOpen={isFormOpen}
          onCloseForm={handleCloseForm}
          onSaveSample={handleSaveSample}
          editingSample={editingSample}
        />
      </div>
    </div>
  );
}

export default App;
