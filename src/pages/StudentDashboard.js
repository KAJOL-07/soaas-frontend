import ApplyLeave from "./ApplyLeave";
import ProjectSubmit from "./ProjectSubmit";

function StudentDashboard({ setIsLoggedIn }) {
  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>

      <ApplyLeave />
      <ProjectSubmit />

      <button onClick={() => setIsLoggedIn(false)}>
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;
