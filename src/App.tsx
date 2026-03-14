import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Login from "./pages/Login";
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

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/farmers" element={<ProtectedRoute><Farmers /></ProtectedRoute>} />
      <Route path="/farmers/new" element={<ProtectedRoute><FarmerForm /></ProtectedRoute>} />
      <Route path="/farmers/:id" element={<ProtectedRoute><FarmerDetail /></ProtectedRoute>} />
      <Route path="/deliveries" element={<ProtectedRoute><Deliveries /></ProtectedRoute>} />
      <Route path="/interactions" element={<ProtectedRoute><Interactions /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
      <Route path="/extension-visits" element={<ProtectedRoute><ExtensionVisits /></ProtectedRoute>} />
      <Route path="/prioritization" element={<ProtectedRoute><Prioritization /></ProtectedRoute>} />
      <Route path="/staff-performance" element={<ProtectedRoute><StaffPerformance /></ProtectedRoute>} />
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
