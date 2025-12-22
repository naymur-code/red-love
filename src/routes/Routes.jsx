import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dash from "../pages/Dash";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/users";
import DashboardRoot from "../layout/DashboardRoot";
import Dashboard from "../pages/dashboard/Dashboard";
import AllUsers from "../pages/dashboard/AllUsers";
import MyRequest from "../pages/dashboard/MyRequest";
import AddRequest from "../pages/dashboard/AddRequest";
import Donate from "../pages/Donate";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancelled from "../pages/PaymentCancelled";
import SearchRequest from "../pages/SearchRequest";
import AllRequest from "../pages/AllRequest";
import ViewDetailsRequest from "../pages/ViewDetailsRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/users', element: <Users /> },
      { path: '/donate', element: <PrivateRoute>
        <Donate /> 
      </PrivateRoute>},
      { path: '/payment-success', element: <PaymentSuccess /> },
      { path: '/payment-cancelled', element: <PaymentCancelled /> },
      { path: '/search-request', element: <SearchRequest /> },
      { path: '/all-request', element: <AllRequest/> },
      { path: '/view-details/:id', element: <ViewDetailsRequest/> },
      {
        path: '/dash', element: <PrivateRoute>
          <Dash />
        </PrivateRoute>
      },
    ]
  },

  {
    path: '/dashboard', element: <PrivateRoute>
      <DashboardRoot />
    </PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'all-users', element: <AllUsers /> },
      { path: 'my-request', element: <MyRequest /> },
      { path: 'add-request', element: <AddRequest /> },

    ]

  }

]);