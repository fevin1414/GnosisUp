"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { User, LogOut, GraduationCap, UserRound } from "lucide-react";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import ProfileInfoCard from "@/components/Profile/ProfileInfoCard";
import { Calendar } from "@/components/ui/calendar";

export default function DashboardLayout({
  children,
  isUserTeacher = true,
}: {
  children: React.ReactNode;
  isUserTeacher?: boolean;
}) {
  const [isTeacherView, setIsTeacherView] = useState(isUserTeacher);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="relative flex h-screen flex-col md:flex-row overflow-hidden">
      <Sidebar isTeacherView={isTeacherView} />

      <div className="flex-1 flex flex-col h-full md:ml-64">
        <header className="w-full h-16 border-b bg-background px-4 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-2 min-w-[40px]"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline text-sm">User Name</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem
                  onClick={() => setIsTeacherView(!isTeacherView)}
                  className="cursor-pointer gap-2"
                >
                  {isTeacherView ? (
                    <>
                      <UserRound className="h-4 w-4" />
                      <span>Switch to Student View</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-4 w-4" />
                      <span>Switch to Teacher View</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>

          <aside className="hidden lg:block w-80 p-4 overflow-y-auto">
            <div className="space-y-4">
              <ProfileInfoCard />
              <Card className="w-full rounded-2xl overflow-hidden shadow-xl bg-background border">
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
