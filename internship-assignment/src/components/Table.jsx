import React, { useEffect, useState } from "react";
import sampleData from "../data/samples.json";
import Form from "./Form";
import StatusBadge from "./StatusBadge";

const statusOptions = ["Pending", "Processing", "Completed"];

const Table = () => {
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setSamples(sampleData);
    setFilteredSamples(sampleData);
  }, []);

  useEffect(() => {
    let filtered = samples.filter((sample) =>
      sample.name.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    filtered.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === "collectedOn") {
        valA = new Date(valA);
        valB = new Date(valB);
      } else {
        valA = valA?.toString().toLowerCase() || "";
        valB = valB?.toString().toLowerCase() || "";
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredSamples(filtered);
    setCurrentPage(1);
  }, [samples, search, statusFilter, sortKey, sortOrder]);

  // Handle add or update sample
  const saveSample = (sample) => {
    if (samples.some((s) => s.id === sample.id)) {
      setSamples(samples.map((s) => (s.id === sample.id ? sample : s)));
    } else {
      setSamples([...samples, sample]);
    }
    setShowForm(false);
    setSelectedSample(null);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedList = samples.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    );
    setSamples(updatedList);
  };

  const totalPages = Math.ceil(filteredSamples.length / itemsPerPage);
  const paginatedSamples = filteredSamples.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sort order toggle
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Styles based on dark mode
  const containerStyle = {
    backgroundColor: isDarkMode ? "#121212" : "white",
    color: isDarkMode ? "#e0e0e0" : "#000",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: isDarkMode
      ? "0 0 6px rgba(255,255,255,0.1)"
      : "0 0 6px rgba(0,0,0,0.1)",
    minHeight: "100vh",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    color: isDarkMode ? "#e0e0e0" : "#000",
  };

  const cellStyle = {
    border: `1px solid ${isDarkMode ? "#444" : "#888"}`,
    padding: "8px",
  };

  const headerStyle = {
    ...cellStyle,
    backgroundColor: isDarkMode ? "#1e1e1e" : "#e2e8f0",
  };

  const inputStyle = {
    border: `1px solid ${isDarkMode ? "#555" : "#888"}`,
    padding: "8px",
    borderRadius: "4px",
    flexGrow: 1,
    maxWidth: "300px",
    backgroundColor: isDarkMode ? "#333" : "white",
    color: isDarkMode ? "#e0e0e0" : "#000",
  };

  const selectStyle = {
    border: `1px solid ${isDarkMode ? "#555" : "#888"}`,
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: isDarkMode ? "#333" : "white",
    color: isDarkMode ? "#e0e0e0" : "#000",
  };

  const buttonStyle = {
    backgroundColor: "#16a34a",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  };

  const toggleButtonStyle = {
    backgroundColor: isDarkMode ? "#444" : "#ddd",
    color: isDarkMode ? "#eee" : "#333",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginLeft: "12px",
  };

  const paginationButtonStyle = {
    margin: "0 4px",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
    color: isDarkMode ? "#e0e0e0" : "#000",
  };

  const activePageButtonStyle = {
    ...paginationButtonStyle,
    fontWeight: "bold",
    backgroundColor: isDarkMode ? "#555" : "#ddd",
  };

  // New styles for sort dropdown and button container
  const sortContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const sortOrderButtonStyle = {
    backgroundColor: isDarkMode ? "#2563eb" : "#2563eb",
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="All">All Status</option>
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Sorting dropdown + toggle order button */}
        <div style={sortContainerStyle}>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            style={selectStyle}
            title="Sort by"
          >
            <option value="name">Sort by Name</option>
            <option value="collectedOn">Sort by Date</option>
          </select>
          <button
            onClick={toggleSortOrder}
            style={sortOrderButtonStyle}
            title="Toggle sort order"
          >
            {sortOrder === "asc" ? "▲ Asc" : "▼ Desc"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={buttonStyle}
            onClick={() => {
              setSelectedSample(null);
              setShowForm(true);
            }}
          >
            + Add Sample
          </button>
          <button
            style={toggleButtonStyle}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          </button>
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Sample ID</th>
            <th style={headerStyle}>Sample Name</th>
            <th style={headerStyle}>Sample Type</th>
            <th style={headerStyle}>Collected On</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSamples.length === 0 && (
            <tr>
              <td colSpan="6" style={{ ...cellStyle, textAlign: "center" }}>
                No samples found.
              </td>
            </tr>
          )}
          {paginatedSamples.map((sample) => (
            <tr key={sample.id}>
              <td style={cellStyle}>{sample.id}</td>
              <td style={cellStyle}>{sample.name}</td>
              <td style={cellStyle}>{sample.type}</td>
              <td style={cellStyle}>
                {new Date(sample.collectedOn).toLocaleDateString()}
              </td>
              <td style={cellStyle}>
                <StatusBadge
                  status={sample.status}
                  onChange={(newStatus) =>
                    handleStatusChange(sample.id, newStatus)
                  }
                  isDarkMode={isDarkMode}
                />
              </td>
              <td style={cellStyle}>
                <button
                  style={{
                    ...buttonStyle,
                    padding: "4px 8px",
                    fontSize: "14px",
                    backgroundColor: "#2563eb",
                  }}
                  onClick={() => {
                    setSelectedSample(sample);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          style={paginationButtonStyle}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={currentPage === i + 1 ? activePageButtonStyle : paginationButtonStyle}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          style={paginationButtonStyle}
        >
          Next
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <Form
          isDarkMode={isDarkMode}
          sample={selectedSample}
          onSave={saveSample}
          onCancel={() => {
            setShowForm(false);
            setSelectedSample(null);
          }}
        />
      )}
    </div>
  );
};

export default Table;
