import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout";

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

import Dashboard from "./views/Dashboard";
import SignIn from "./views/Authentication/SignIn";
import Sidebar from "./views/Sidebar";
import SignUp from "./views/Authentication/SignUp";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="/" element={<Sidebar />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
