import { useState, useEffect } from "react";

function ProjectReview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
  }, []);

  const updateStatus = (i, status) => {
    const updated = [...projects];
    updated[i].status = status;
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  return (
    <>
      <h3>Project Review</h3>
      {projects.map((p, i) => (
        <div key={i} className="card">
          <p>{p.title}</p>
          <p>Status: {p.status}</p>
          {p.status === "Pending" && (
            <>
              <button onClick={() => updateStatus(i,"Approved")}>Approve</button>
              <button onClick={() => updateStatus(i,"Rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default ProjectReview;
