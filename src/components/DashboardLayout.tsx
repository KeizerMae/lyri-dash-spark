
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  LogOut, 
  Settings, 
  User, 
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
  userRole: "teacher" | "student";
};

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = userRole === "teacher" 
    ? [
        { icon: Home, label: "Dashboard", path: "/teacher-dashboard" },
        { icon: Users, label: "Students", path: "/students" },
        { icon: BookOpen, label: "Lessons", path: "/lessons" },
        { icon: Bell, label: "Announcements", path: "/announcements" },
        { icon: Settings, label: "Settings", path: "/settings" },
      ]
    : [
        { icon: Home, label: "Dashboard", path: "/student-dashboard" },
        { icon: BookOpen, label: "Lessons", path: "/my-lessons" },
        { icon: Users, label: "Classmates", path: "/classmates" },
        { icon: Bell, label: "Notifications", path: "/notifications" },
        { icon: Settings, label: "Settings", path: "/settings" },
      ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white h-screen border-r border-gray-200 transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo area */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && (
            <span className="text-xl font-bold text-lyri-dark-purple">Lyri AI</span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path}
                  className="flex items-center p-2 text-gray-700 hover:bg-lyri-light-purple hover:text-lyri-dark-purple rounded-md transition-colors"
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-lyri-purple flex items-center justify-center text-white">
              <User size={16} />
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Alex Thompson</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            )}
          </div>
          
          {/* Logout button */}
          <Button 
            variant="ghost" 
            size={collapsed ? "icon" : "default"}
            className="mt-2 text-gray-700 hover:text-red-600 w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
