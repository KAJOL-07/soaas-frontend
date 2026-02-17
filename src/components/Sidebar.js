import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <div className="sidebar">
      {role === "student" && (
        <>
          <Link to="/student">Dashboard</Link>
          <Link to="/apply-leave">Apply Leave</Link>
          <Link to="/project-submit">Project Submit</Link>
        </>
      )}

      {role === "staff" && (
        <>
          <Link to="/staff">Dashboard</Link>
          <Link to="/leave-status">Leave Requests</Link>
          <Link to="/project-review">Project Review</Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;
