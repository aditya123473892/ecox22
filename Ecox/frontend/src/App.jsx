// src/App.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import Landing from "./Components/Landing";
import Ccdv from "./Components/ccdv";
import Greencarbon from "./Components/Greencarbon";
import CarbonFootprintCalculator from "./Components/CarbonFootprintCalculator";
import Tokens from "./Components/Tokens";
import ProjectRegistration from "./Components/ProjectRegistration";
import MyTokens from "./Components/MyTokens";
import AuditorRegistration from "./Components/RegisterAuditor";
import AuditorDashboard from "./Components/AuditorDashboard";
import AuditorLogin from "./Components/ui/AuditorLogin";
import Landingpagenew from "./Landingpagenew";
import Layout from "./Layout";

import { dataActions } from "./store/data-slice";
import "./App.css";

export const backendUrl = "http://localhost:8000";

function App() {
  const contracts = useSelector((state) => state.data.contracts);
  const dispatch = useDispatch();

  const getContracts = async () => {
    try {
      const response = await fetch(`${backendUrl}/contract/getAll`);
      const data = await response.json();
      console.log("data:", data);
      if (data.success) {
        dispatch(dataActions.setContracts(data.contracts));
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    if (contracts.length === 0) {
      getContracts();
    }
  }, [contracts.length]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landingpagenew />} />
        <Route path="token/:id" element={<Greencarbon />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="calculate" element={<Ccdv />} />
        <Route path="learn" element={<CarbonFootprintCalculator />} />
        <Route path="register" element={<ProjectRegistration />} />
        <Route path="auditor" element={<AuditorRegistration />} />
        <Route path="auditor-dashboard" element={<AuditorDashboard />} />
        <Route path="auditor-login" element={<AuditorLogin />} />
        <Route path="myBalance" element={<MyTokens />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
