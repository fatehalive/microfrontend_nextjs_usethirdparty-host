"use client";
import { lazy } from "react";
const RemoteComponent = lazy(() => import("remote/Button"));

export default RemoteComponent;
