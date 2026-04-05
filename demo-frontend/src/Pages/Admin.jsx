import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Admin.css";

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [user] = useState(() => {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  const fetchAll = async () => {
    const res = await axios.get("http://localhost:8080/all-complaints");
    return res.data;
  };

  // 🔐 Load user safely
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // 🔄 Fetch all complaints
  useEffect(() => {
    let isMounted = true;

    fetchAll()
      .then((data) => {
        if (isMounted) setComplaints(data);
      })
      .catch((err) => {
        console.error("Error fetching complaints", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔄 Update complaint status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/complaints/${id}`, {
        status: newStatus,
      });
      const data = await fetchAll();
      setComplaints(data);
    } catch {
      alert("Failed to update status");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ❗ Prevent rendering before user loads
  if (!user) return null;

  return (
    <div className="admin-wrapper">

      {/* 🔷 NAVBAR */}
      <nav className="admin-nav">
        <h1>Admin Control Center</h1>

        <div className="admin-info">
          <span>
            Welcome, <strong>{user.name}</strong>
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* 🔷 MAIN CONTENT */}
      <div className="admin-container">

        {/* 📊 STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <h3>{complaints.length}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card pending">
            <h3>
              {complaints.filter(c => c.status === "Pending").length}
            </h3>
            <p>Pending</p>
          </div>

          <div className="stat-card resolved">
            <h3>
              {complaints.filter(c => c.status === "Resolved").length}
            </h3>
            <p>Resolved</p>
          </div>
        </div>

        {/* 📋 TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td className="complaint-title">{c.title}</td>
                  <td className="complaint-desc">{c.description}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        c.status
                          ? c.status.toLowerCase().replace(" ", "-")
                          : "pending"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button
                      className="btn-progress"
                      onClick={() => updateStatus(c.id, "In Progress")}
                    >
                      Mark Progress
                    </button>

                    <button
                      className="btn-resolve"
                      onClick={() => updateStatus(c.id, "Resolved")}
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}

              {complaints.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Admin;