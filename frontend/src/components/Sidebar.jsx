import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
      <NavLink to="/production" className="nav-item">Production Logs</NavLink>
      <NavLink to="/issues" className="nav-item">Issues</NavLink>
    </aside>
  );
}
