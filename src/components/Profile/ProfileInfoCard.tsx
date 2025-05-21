"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";

const ProfileInfoCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl overflow-hidden  bg-background border">
      {/* Top Banner */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500" />

      {/* Avatar */}
      <div className="flex justify-center -mt-14">
        <Avatar className="h-24 w-24 border-4 border-background shadow-md">
          <AvatarImage src="/profile.png" alt="User Avatar" />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <CardHeader className="text-center mt-2">
        <h2 className="text-xl font-bold text-foreground">Cloud Learner</h2>
        <p className="text-sm text-muted-foreground ">Student</p>
        <Badge className="mt-2 flex items-center justify-center w-fit mx-auto text-sm px-3 py-1 rounded-full">
          Free Plan
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 text-sm px-6">
        <div>
          <p className="text-muted-foreground">📧 Email</p>
          <p className="font-medium text-foreground">
            cloud.learner@example.com
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between px-6 pb-6 pt-4">
        <Button variant="outline" className="gap-1 w-full cursor-pointer">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileInfoCard;
