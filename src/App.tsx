import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import FarmerForm from "./pages/FarmerForm";
import FarmerDetail from "./pages/FarmerDetail";
import Deliveries from "./pages/Deliveries";
import Interactions from "./pages/Interactions";
import Complaints from "./pages/Complaints";
import ExtensionVisits from "./pages/ExtensionVisits";
import Prioritization from "./pages/Prioritization";
import StaffPerformance from "./pages/StaffPerformance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function RoleProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: import('@/types/farmer').UserRole[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Shared routes */}
      <Route path="/farmers" element={<ProtectedRoute><Farmers /></ProtectedRoute>} />
      <Route path="/farmers/new" element={<ProtectedRoute><FarmerForm /></ProtectedRoute>} />
      <Route path="/farmers/:id" element={<ProtectedRoute><FarmerDetail /></ProtectedRoute>} />
      <Route path="/interactions" element={<ProtectedRoute><Interactions /></ProtectedRoute>} />

      {/* Clerk and Admin only */}
      <Route path="/deliveries" element={<ProtectedRoute><RoleProtectedRoute allowedRoles={['admin', 'clerk']}><Deliveries /></RoleProtectedRoute></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><RoleProtectedRoute allowedRoles={['admin', 'clerk']}><Complaints /></RoleProtectedRoute></ProtectedRoute>} />
      
      {/* Extension Officer and Admin only */}
      <Route path="/extension-visits" element={<ProtectedRoute><RoleProtectedRoute allowedRoles={['admin', 'extension_officer']}><ExtensionVisits /></RoleProtectedRoute></ProtectedRoute>} />
      <Route path="/prioritization" element={<ProtectedRoute><RoleProtectedRoute allowedRoles={['admin', 'extension_officer']}><Prioritization /></RoleProtectedRoute></ProtectedRoute>} />

      {/* Admin only */}
      <Route path="/staff-performance" element={<ProtectedRoute><RoleProtectedRoute allowedRoles={['admin']}><StaffPerformance /></RoleProtectedRoute></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
