import { useContext, useState } from 'react';
import { AppContext, AppProvider } from './context/AppContext';
import './index.css';

import Login from './pages/Login';
import Landing from './pages/Landing';
import Sidebar from './components/Sidebar';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyLeaves from './pages/MyLeaves';
import ProjectSubmit from './pages/ProjectSubmit';
import MyProjects from './pages/MyProjects';
import MarksView from './pages/MarksView';
import LeaveRequests from './pages/LeaveRequests';
import ProjectReviews from './pages/ProjectReview';
import MarksManage from './pages/MarksManage';
import Notifications from './pages/Notifications';

function AppContent() {
  const { user } = useContext(AppContext);
  const [activePage, setActivePage] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(true);

  if (!user && showLanding) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user) return <Login />;

  const renderPage = () => {
    if (user.role === 'student') {
      switch (activePage) {
        case 'dashboard': return <StudentDashboard />;
        case 'apply-leave': return <ApplyLeave />;
        case 'my-leaves': return <MyLeaves />;
        case 'submit-project': return <ProjectSubmit />;
        case 'my-projects': return <MyProjects />;
        case 'marks': return <MarksView />;
        case 'notifications': return <Notifications />;
        default: return <StudentDashboard />;
      }
    } else {
      switch (activePage) {
        case 'dashboard': return <StaffDashboard />;
        case 'leave-requests': return <LeaveRequests />;
        case 'project-reviews': return <ProjectReviews />;
        case 'marks-manage': return <MarksManage />;
        case 'notifications': return <Notifications />;
        default: return <StaffDashboard />;
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main style={{
        flex: 1,
        marginLeft: '240px',
        padding: '32px 36px',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
