import LeaveRequests from "./LeaveRequests";
import ProjectReview from "./ProjectReview";

function StaffDashboard({ setIsLoggedIn }) {
  return (
    <div className="page-wrapper">
      <LeaveRequests />
      <ProjectReview />
      <div className="container">
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>
    </div>
  );
}

export default StaffDashboard;
