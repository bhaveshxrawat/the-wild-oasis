import Dashboard from "@/pages/Dashboard";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import NewUsers from "@/pages/Users";
import Settings from "@/pages/Settings";
import Account from "@/pages/Account";
import Booking from "@/pages/Booking";
import Checkin from "@/pages/Checkin";

import AppLayout from "@/ui/AppLayout";
import ProtectedRoute from "@/ui/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "./hooks/useUser";

function ProtectedRoutes(): React.ReactElement {
  const { user } = useUser();

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            user ? (
              <Navigate replace to={"dashboard"} />
            ) : (
              <Navigate replace to={"login"} />
            )
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:bookingID" element={<Booking />} />
        <Route path="checkin/:bookingID" element={<Checkin />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="users" element={<NewUsers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}
export default ProtectedRoutes;
