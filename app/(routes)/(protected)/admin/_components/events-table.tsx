import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// types.ts
export interface Event {
  id: string;
  title?: string;
  description?: string;
  venue?: string;
  date?: string;
  link?: string;
  images?: string[];
  socials?: JSON[];
}

export interface UpdateEventPayload extends Omit<Event, "id"> {
  id?: string;
}

export interface DeleteEventPayload {
  id: string;
}

export interface MutationResponse {
  success: boolean;
  message: string;
  data?: Event;
}

export interface EventsManagementProps {
  initialPageSize?: number;
  showPagination?: boolean;
  showSorting?: boolean;
  className?: string;
}

// Add specific mutation result types if needed
export type UpdateEventMutation = UseMutationResult<
  MutationResponse,
  Error,
  UpdateEventPayload
>;

export type DeleteEventMutation = UseMutationResult<
  MutationResponse,
  Error,
  DeleteEventPayload
>;

const EventsManagement: React.FC<EventsManagementProps> = ({
  initialPageSize = 10,
  showPagination = true,
  showSorting = true,
  className = "",
}) => {
  // State management with proper typing
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const queryClient = useQueryClient();

  // Query hook with proper typing
  const {
    data: events = [],
    isPending,
    error,
  } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[]> => {
      const response = await fetch("/api/events/getAll");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Column definitions with proper typing
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return showSorting ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1"
          >
            Title
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        ) : (
          "Title"
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return showSorting ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1"
          >
            Date
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        ) : (
          "Date"
        );
      },
      cell: ({ row }) => {
        return new Date(row.getValue("date")).toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex gap-2">
            <Dialog
              open={isUpdateDialogOpen}
              onOpenChange={setIsUpdateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedEvent(event)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Event</DialogTitle>
                  <DialogDescription>
                    Make changes to the event details below.
                  </DialogDescription>
                </DialogHeader>
                {selectedEvent && (
                  <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={selectedEvent.title}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        className="h-[100px] resize-none"
                        defaultValue={selectedEvent.description}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="venue" className="text-sm font-medium">
                        Venue
                      </label>
                      <Input
                        id="venue"
                        name="venue"
                        defaultValue={selectedEvent.venue}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="link" className="text-sm font-medium">
                        Registration Link
                      </label>
                      <Input
                        id="link"
                        name="link"
                        defaultValue={selectedEvent.link}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">
                        Date
                      </label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={selectedEvent?.date?.split("T")[0]!}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={updateMutation.isPending}>
                        {updateMutation.isPending
                          ? "Updating..."
                          : "Update Event"}
                      </Button>
                    </DialogFooter>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDelete(event.id)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  // Table initialization with proper typing
  const table = useReactTable({
    data: events,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  // Mutations with proper typing
  const updateMutation: UseMutationResult<
    MutationResponse,
    Error,
    UpdateEventPayload
  > = useMutation({
    mutationFn: async (updatedEvent) => {
      const response = await fetch("/api/events/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsUpdateDialogOpen(false);
      setSelectedEvent(null);
    },
  });

  const deleteMutation: UseMutationResult<
    MutationResponse,
    Error,
    DeleteEventPayload
  > = useMutation({
    mutationFn: async ({ id }) => {
      const response = await fetch("/api/events/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // Event handlers with proper typing
  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const formData = new FormData(e.currentTarget);
    const updatedEvent: UpdateEventPayload = {
      id: selectedEvent.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
    };
    updateMutation.mutate(updatedEvent);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteMutation.mutate({ id });
    }
  };

  if (isPending) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className={`py-5 space-y-4 ${className}`}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsManagement;
