import React from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative">
      <Sidebar />
      {/* <main className="md:ml-64 pb-16 md:pb-0">{children}</main> */}
    </div>
  );
};

export default DashboardLayout;
