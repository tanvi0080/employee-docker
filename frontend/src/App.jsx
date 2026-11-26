import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee
} from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: ""
  });

  const loadEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  useEffect(() => {
    loadEmployees().catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(form);
    setForm({ name: "", email: "", department: "" });
    await loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    await loadEmployees();
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Employee Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={e => setForm({...form, department: e.target.value})}
        />

        <button type="submit">Add Employee</button>
      </form>

      <h2>Employee List</h2>

      {employees.map(employee => (
        <div key={employee.id}>
          {employee.name} - {employee.email} - {employee.department}
          <button onClick={() => handleDelete(employee.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;