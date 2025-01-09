import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import AdminDashboard from "./components/AdminDashboard";
import FormRenderer from "./components/FormRenderer";
import EditForm from "./components/EditForm";
import FormList from "./components/FormList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="bg-blue-600 text-white p-4 rounded shadow mb-6">
          <h1 className="text-2xl font-bold">Dynamic Form Builder</h1>
          <nav className="mt-2">
            <Link
              to="/"
              className="mr-4 px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded"
            >
              Home
            </Link>
            <Link
              to="/form-builder"
              className="mr-4 px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded"
            >
              Create Form
            </Link>
            <Link
              to="/admin-dashboard"
              className="mr-4 px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded"
            >
              Manage Forms
            </Link>
            <Link
              to="/form-list"
              className="px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded"
            >
              Fill Form
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h2 className="text-xl font-semibold">
                    Welcome to the Dynamic Form Builder App!
                  </h2>
                  <p className="mt-4">
                    Use the navigation links above to create, manage, and view
                    form submissions.
                  </p>
                </div>
              }
            />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/form/:id" element={<FormRenderer />} />
            <Route path="/edit-form/:id" element={<EditForm />} />
            <Route path="/form-list" element={<FormList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
