import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  try {
    const existingEvent = await prismadb.event.findUnique({
      where: { id: id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const updatedEvent = await prismadb.event.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
