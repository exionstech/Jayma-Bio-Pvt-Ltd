"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EventsCard from "./events-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EventsManagement from "./events-table";

const EventsComponents = () => {
  return (
    <div className="my-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <EventsCard />
          </DialogContent>
        </Dialog>
      </div>
      <EventsManagement />
    </div>
  );
};

export default EventsComponents;
