import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Dashboard.css"; 

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  // FIXED: URL changed from /complaints/user/${user.id} to /complaints/${user.id}

  
  const fetchData = async () => {
    try {
      if (user && user.id) {
        const res = await axios.get(`http://localhost:8080/complaints/${user.id}`);
        setComplaints(res.data);
      }
    } catch (err) {
      console.error("Error fetching your complaints", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      // FIXED: Sending the full user object to ensure JPA mapping works
      await axios.post("http://localhost:8080/complaints", {
        title,
        description,
        status: "Pending",
        user: { id: user.id }
      });
      
      setTitle("");
      setDescription("");
      alert("Complaint submitted successfully!");
      fetchData(); 
    }catch (err) {
  console.log("FULL ERROR:", err); // full debug

  if (err.response) {
    console.log("BACKEND ERROR:", err.response.data);
    alert(JSON.stringify(err.response.data));
  } else {
    alert("Server not reachable");
  }
}
  };

  return (
    <div className="student-wrapper">
      <nav className="student-nav">
        <h2>Student Portal</h2>
        <div className="user-profile">
          <span>{user?.name} ({user?.email})</span>
          <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href="/"; }}>Logout</button>
        </div>
      </nav>

      <div className="student-container">
        <div className="form-section">
          <h3>Lodge a New Complaint</h3>
          <form className="complaint-form" onSubmit={submitComplaint}>
            <label>Subject</label>
            <input 
              value={title}
              placeholder="Brief title of the issue" 
              required 
              onChange={(e) => setTitle(e.target.value)} 
            />
            
            <label>Description</label>
            <textarea 
              value={description}
              placeholder="Describe your concern in detail..." 
              rows="6" 
              required 
              onChange={(e) => setDescription(e.target.value)} 
            />
            
            <button type="submit" className="submit-btn">Submit Complaint</button>
          </form>
        </div>

        <div className="history-section">
          <h3>Your Complaint History</h3>
          <div className="complaint-list">
            {complaints.length > 0 ? (
              complaints.map((c) => (
                <div key={c.id} className="complaint-card">
                  <div className="card-header">
                    <h4>{c.title}</h4>
                    <span className={`status-tag ${c.status ? c.status.toLowerCase().replace(" ", "-") : "pending"}`}>
                      {c.status}
                    </span>
                  </div>
                  <p>{c.description}</p>
                </div>
              ))
            ) : (
              <p className="no-data">You haven't filed any complaints yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;