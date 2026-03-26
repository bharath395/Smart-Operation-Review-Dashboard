import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ user, onLogout }) {
  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={onLogout} />
      <div className="body-shell">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
