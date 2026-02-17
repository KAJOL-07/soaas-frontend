import { useState } from "react";

function ApplyLeave() {
  const [reason, setReason] = useState("");

  const submitLeave = () => {
    const leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves.push({ reason, status: "Pending" });
    localStorage.setItem("leaves", JSON.stringify(leaves));
    alert("Leave Applied");
    setReason("");
  };

  return (
    <div className="section">
      <h3>Apply Leave</h3>

      <input
        type="text"
        placeholder="Enter Leave Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button onClick={submitLeave}>Submit Leave</button>
    </div>
  );
}

export default ApplyLeave;
