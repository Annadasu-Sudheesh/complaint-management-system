import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [complaints, setComplaints] = useState([]);

  // 🔄 Fetch complaints
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/complaints/${user.id}`);
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📤 Submit complaint
  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("userId", user.id);
      if (file) formData.append("file", file);

      await axios.post("http://localhost:8080/complaints", formData);

      setTitle("");
      setDescription("");
      setFile(null);

      fetchData();
      alert("Complaint submitted successfully!");
    } catch (err) {
      alert(err.response?.data || "Submission failed");
    }
  };

  return (
    <div className="dashboard">

      {/* 🔷 NAVBAR */}
      <div className="navbar">
        <h2>Complaint Portal</h2>

        <div>
          <span>{user?.name}</span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container">

        {/* 📝 LEFT FORM */}
        <div className="card">
          <h3>Submit Complaint</h3>

          <form onSubmit={submitComplaint}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button type="submit">Submit</button>
          </form>
        </div>

        {/* 📋 RIGHT SIDE */}
        <div className="card">
          <h3>Your Complaints</h3>

          {complaints.length > 0 ? (
            complaints.map((c) => (
              <div key={c.id} className="complaint">

                <h4>{c.title}</h4>
                <p>{c.description}</p>

                {/* 🔥 STATUS */}
                <span className={`status ${c.status.toLowerCase().replace(" ", "-")}`}>
                  {c.status}
                </span>

                {/* 🔥 PRIORITY */}
                <p>
                  <b>Priority:</b>{" "}
                  <span className={`priority ${c.priority?.toLowerCase()}`}>
                    {c.priority || "Low"}
                  </span>
                </p>

                 {/* 🔥 REMARK */}
                 
                {c.remark && (
                  <p>
                    <b>Admin Remark:</b> {c.remark}
                  </p>
                )}

                {/* 🔥 CREATED DATE */}
                <p>
                  <b>Created:</b>{" "}
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : "—"}
                </p>

                {/* 🔥 RESOLVED DATE */}
                <p>
                  <b>Resolved:</b>{" "}
                  {c.resolvedAt
                    ? new Date(c.resolvedAt).toLocaleString()
                    : "Not yet"}
                </p>

               
                

                {/* 📎 FILE */}
                {c.filePath && (
                  <a
                    href={`http://localhost:8080/${c.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📎 View File
                  </a>
                )}

              </div>
            ))
          ) : (
            <p>No complaints yet</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;