import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Admin.css";

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Protect route
  useEffect(() => {
    if (!user) navigate("/login");
    else if (user.role !== "ADMIN") navigate("/dashboard");
  }, [user, navigate]);

  // 🔄 Fetch all complaints
  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/all-complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ✅ Update complaint
  const updateComplaint = async (id, status, priority, remark) => {
    try {
      await axios.put(`http://localhost:8080/complaints/${id}`, {
        status,
        priority,
        remark
      });

      // 🔥 Instant UI update
      setComplaints(prev =>
        prev.map(c =>
          c.id === id ? { ...c, status, priority, remark } : c
        )
      );

    } catch (err) {
      alert(err.response?.data || "Update failed");
    }
  };

  if (!user) return null;

  return (
    <div className="admin-wrapper">

      {/* 🔷 NAVBAR */}
      <nav className="admin-nav">
        <h2>Admin Panel</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>

      {/* 🔷 TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Remark</th>
              <th>File</th>
              <th>Actions</th>
              <th>Issued On</th>
              <th>Resolved On</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.description}</td>

                {/* STATUS */}
                <td>
                  <span className={`status ${c.status.toLowerCase().replace(" ", "-")}`}>
                    {c.status}
                  </span>
                </td>

                {/* PRIORITY */}
                <td>
                  <select
                    value={c.priority || "Low"}
                    disabled={c.status === "Resolved"}
                    onChange={(e) =>
                      updateComplaint(
                        c.id,
                        c.status,
                        e.target.value,
                        c.remark
                      )
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </td>

                {/* REMARK */}
                <td>
                  <input
                    type="text"
                    placeholder="Add remark"
                    value={c.remark || ""}
                    disabled={c.status === "Resolved"}
                    onChange={(e) => {
                      const newRemark = e.target.value;

                      setComplaints(prev =>
                        prev.map(item =>
                          item.id === c.id
                            ? { ...item, remark: newRemark }
                            : item
                        )
                      );
                    }}
                    onBlur={() =>
                      updateComplaint(
                        c.id,
                        c.status,
                        c.priority,
                        c.remark
                      )
                    }
                  />
                </td>

                {/* FILE */}
                <td>
                  {c.filePath ? (
                    <a
                      href={`http://localhost:8080/${c.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>

                {/* ACTIONS */}
                <td>
                  {c.status !== "Resolved" ? (
                    <>
                      <button
                        className="btn-progress"
                        onClick={() =>
                          updateComplaint(
                            c.id,
                            "In Progress",
                            c.priority,
                            c.remark
                          )
                        }
                      >
                        Progress
                      </button>

                      <button
                        className="btn-resolve"
                        onClick={() =>
                          updateComplaint(
                            c.id,
                            "Resolved",
                            c.priority,
                            c.remark
                          )
                        }
                      >
                        Resolve
                      </button>
                    </>
                  ) : (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ✔ Completed
                    </span>
                  )}
                </td>

                {/* 🔥 CREATED DATE */}
                <td>
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : "—"}
                </td>

                {/* 🔥 RESOLVED DATE */}
                <td>
                  {c.resolvedAt
                    ? new Date(c.resolvedAt).toLocaleString()
                    : "—"}
                </td>

              </tr>
            ))}

            {complaints.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Admin;