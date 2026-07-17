import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { motion } from 'framer-motion';

const DashboardLayout = ({ children, title, breadcrumb }) => {
  const { sidebarCollapsed } = useApp();
  const sidebarWidth = sidebarCollapsed ? 72 : 256;

  return (
    <div className="min-h-screen bg-slate-900 grid-pattern">
      <Sidebar />
      <div
        className="transition-all duration-300 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <Topbar title={title} breadcrumb={breadcrumb} />
        <main className="pt-16 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 pt-8 max-w-screen-2xl">
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
