import { useState, useEffect } from "react";

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(JSON.parse(localStorage.getItem("leaves")) || []);
  }, []);

  const updateStatus = (i, status) => {
    const updated = [...leaves];
    updated[i].status = status;
    setLeaves(updated);
    localStorage.setItem("leaves", JSON.stringify(updated));
  };

  return (
    <>
      <h3>Leave Requests</h3>
      {leaves.map((l, i) => (
        <div key={i} className="card">
          <p>{l.reason}</p>
          <p>Status: {l.status}</p>
          {l.status === "Pending" && (
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

export default LeaveRequests;
