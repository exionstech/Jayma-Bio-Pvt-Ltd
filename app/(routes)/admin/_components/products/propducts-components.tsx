"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductsCard from "./products-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Loader from "@/components/shared/loader";
import { useConfirm } from "@/hooks/use-confirm";

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  link: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
};

export default function ProductsTable() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ConfirmDialogue, confirm] = useConfirm(
    "Delete Product",
    "Are you sure you want to delete this product ? This action cannot be undone."
  );
  
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/getAll");
      const data = await response.json();
      if (data.status === 200) {
        setData(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      try {
        const response = await fetch("/api/products/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.status === 200) {
          toast.success("Product deleted successfully");
          fetchProducts();
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };
  
  const columns: ColumnDef<Product>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => <span>${row.original.price}</span>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="max-w-[300px] truncate block">
          {row.original.description}
        </span>
      ),
    },
    {
      header: "Images",
      accessorKey: "image",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.image.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product ${idx + 1}`}
              className="w-10 h-10 object-cover rounded"
            />
          ))}
          {row.original.image.length > 2 && (
            <span className="text-sm text-gray-500">
              +{row.original.image.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProduct(row.original)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              {selectedProduct && (
                <ProductsCard
                  setDialogOpen={setUpdateDialogOpen}
                  initialData={selectedProduct}
                  onSuccess={fetchProducts}
                />
              )}
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <>
      <ConfirmDialogue />
      <div className="space-y-4">
        <div className="w-full h-full py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Products</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green hover:bg-green/90 px-6 flex items-center gap-2">
                Add Product
                <Plus className="size-5 shrink-0" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <ProductsCard setDialogOpen={setDialogOpen} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(val) => {
                table.setPageSize(Number(val));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="px-4">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          <span className="text-sm text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </>
  );
}
