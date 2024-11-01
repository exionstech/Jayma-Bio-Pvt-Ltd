"use server";

import prismadb from "@/lib/prismadb";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  link: string;
  images: string[];
}

export const getAllEvents = async () => {
  try {
    const events = await prismadb.event.findMany();
    console.log(events);
    return { events: events, success: true };
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return { error: "Failed to fetch events", success: false };
  }
};
