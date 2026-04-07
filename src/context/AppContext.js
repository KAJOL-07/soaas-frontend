import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, role, regNo }
  
  // Mocked state
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, studentId: '22CS101', studentName: 'Kajol', reason: 'Medical Checkup', from: '2023-11-20', to: '2023-11-21', status: 'Approved' },
    { id: 2, studentId: '22CS101', studentName: 'Kajol', reason: 'Family Function', from: '2023-12-05', to: '2023-12-06', status: 'Pending' },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, studentId: '22CS101', studentName: 'Kajol', title: 'React Dashboard', description: 'A system dashboard built with React.', link: 'https://github.com/johndoe/proj', status: 'Reviewed', feedback: 'Excellent architecture.' }
  ]);

  const [marks, setMarks] = useState([
    { id: 1, studentId: '22CS101', subject: 'Data Structures', score: 85, max: 100 },
    { id: 2, studentId: '22CS101', subject: 'Database Systems', score: 92, max: 100 },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, userId: '22CS101', message: 'Your leave request was approved.', read: false, time: new Date().toISOString() },
    { id: 2, userId: 'STAFF01', message: 'New project submitted by Kajol.', read: false, time: new Date().toISOString() },
  ]);

  const login = (regNo, password, role) => {
    if (role === 'student' && regNo === '22CS101' && password === 'student123') {
      setUser({ id: '1', name: 'Kajol', role: 'student', regNo: '22CS101' });
      return true;
    } else if (role === 'staff' && regNo === 'STAFF01' && password === 'staff123') {
      setUser({ id: '2', name: 'Dr. Smith', role: 'staff', regNo: 'STAFF01' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const addLeaveRequest = (request) => {
    const newReq = { ...request, id: Date.now(), status: 'Pending' };
    setLeaveRequests([newReq, ...leaveRequests]);
    // Notify staff
    setNotifications([{ id: Date.now(), userId: 'STAFF01', message: `New leave request from ${user.name}`, read: false, time: new Date().toISOString() }, ...notifications]);
  };

  const updateLeaveStatus = (id, newStatus) => {
    const leave = leaveRequests.find(l => l.id === id);
    if (!leave) return;
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: newStatus } : l));
    // Notify student
    setNotifications([{ id: Date.now(), userId: leave.studentId, message: `Your leave request for ${leave.reason} was ${newStatus}`, read: false, time: new Date().toISOString() }, ...notifications]);
  };

  const addProject = (project) => {
    setProjects([{ ...project, id: Date.now(), status: 'Pending', feedback: '' }, ...projects]);
    setNotifications([{ id: Date.now(), userId: 'STAFF01', message: `New project ${project.title} submitted by ${user.name}`, read: false, time: new Date().toISOString() }, ...notifications]);
  };

  const updateProjectStatus = (id, feedback, newStatus) => {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus, feedback } : p));
    setNotifications([{ id: Date.now(), userId: proj.studentId, message: `Your project ${proj.title} has been reviewed`, read: false, time: new Date().toISOString() }, ...notifications]);
  };

  const addMark = (mark) => {
    setMarks([{ ...mark, id: Date.now() }, ...marks]);
    setNotifications([{ id: Date.now(), userId: mark.studentId, message: `New marks added for ${mark.subject}`, read: false, time: new Date().toISOString() }, ...notifications]);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      leaveRequests, addLeaveRequest, updateLeaveStatus,
      projects, addProject, updateProjectStatus,
      marks, addMark,
      notifications, markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};
