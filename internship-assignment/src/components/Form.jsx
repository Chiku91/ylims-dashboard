import React, { useState, useEffect } from "react";

const statusOptions = ["Pending", "Processing", "Completed"];
const sampleTypeOptions = ["Blood", "Urine", "Tissue"];

const generateNewId = (existingIds = []) => {
  const numbers = existingIds
    .filter((id) => id.startsWith("SMP"))
    .map((id) => parseInt(id.slice(3)))
    .filter((num) => !isNaN(num));
  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 100;
  return "SMP" + (maxNum + 1);
};

const Form = ({ sample, onCancel, onSave, isDarkMode }) => {
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    type: "Blood",
    collectedOn: "",
    status: "Pending",
  });

  useEffect(() => {
    if (sample) {
      setFormState(sample);
    } else {
      setFormState({
        id: "",
        name: "",
        type: "Blood",
        collectedOn: "",
        status: "Pending",
      });
    }
  }, [sample]);

  // Get today's date in YYYY-MM-DD format to set as max for date input
  const todayDateString = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.type.trim() ||
      !formState.collectedOn.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Properly compare dates without time
    const selectedDate = new Date(formState.collectedOn);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      alert("Future dates are not allowed for 'Collected On'.");
      return;
    }

    const idToUse = formState.id || generateNewId([]);
    onSave({ ...formState, id: idToUse });
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: isDarkMode ? "#1e1e1e" : "white",
    color: isDarkMode ? "#eee" : "#000",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    width: "300px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: `1px solid ${isDarkMode ? "#555" : "#ccc"}`,
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#eee" : "#000",
  };

  const buttonStyle = {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "8px",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#16a34a",
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ef4444",
    color: "white",
  };

  return (
    <div style={modalStyle}>
      <h3>{sample ? "Edit Sample" : "Add Sample"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Sample Name"
          value={formState.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <select
          name="type"
          value={formState.type}
          onChange={handleChange}
          style={inputStyle}
        >
          {sampleTypeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="collectedOn"
          value={formState.collectedOn}
          onChange={handleChange}
          style={inputStyle}
          max={todayDateString}  // <-- Prevent selecting future dates here
          required
        />
        <select
          name="status"
          value={formState.status}
          onChange={handleChange}
          style={inputStyle}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div style={{ marginTop: "12px" }}>
          <button type="submit" style={saveButtonStyle}>
            Save
          </button>
          <button type="button" onClick={onCancel} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
