import { useEffect, useState } from "react";
import "./Leave.css";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaves")) || [];
    setLeaves(data);
  }, []);

  const filtered = leaves.filter((leave) =>
    leave.reason.toLowerCase().includes(search.toLowerCase()) ||
    leave.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="leave-page">

      <div className="leave-header">
        <h2>My Leaves</h2>
        <button className="apply-btn">Apply Leave</button>
      </div>

      <input
        type="text"
        placeholder="Search by leave type or remarks..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="leave-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((leave, index) => (
            <tr key={index}>
              <td>{leave.type}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>
                <span className={`status ${leave.status}`}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default MyLeaves;
