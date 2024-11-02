"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { addManagement } from "@/actions/payment-management/add-management";
import { getManagement } from "@/actions/payment-management/get-management";
import { deleteManagement } from "@/actions/payment-management/delete-manangement";
import { toast } from "sonner";

type PaymentManagement = {
  id: string;
  shipping: string;
  tax: string;
  createdAt: Date;
  updatedAt: Date;
};

const PaymentManagementComponent = () => {
  const [data, setData] = useState<PaymentManagement[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shipping: "",
    tax: "",
  });

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await getManagement();
      if (response.success && response.data) {
        // Ensure dates are properly converted to Date objects
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  const columnHelper = createColumnHelper<PaymentManagement>();

  const columns = [
    columnHelper.accessor("shipping", {
      header: "Shipping Charge",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("tax", {
      header: "Tax Charge",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("updatedAt", {
      header: "Updated At",
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => (
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => handleDelete(info.getValue().toLocaleString())}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await addManagement(formData);
      if (response.success) {
        toast.success(response.message);
        setFormData({
          shipping: "",
          tax: "",
        });
        // Fetch updated data after successful submission
        await fetchData();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      // Delete data
      await deleteManagement({ id }).then(async (res) => {
        if (res.success) {
          toast.success(res.message);
          await fetchData();
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Shipping Charge"
              name="shipping"
              value={formData.shipping}
              onChange={handleInputChange}
              disabled={loading}
            />
            <Input
              placeholder="Tax Charge"
              name="tax"
              value={formData.tax}
              onChange={handleInputChange}
              disabled={loading}
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : data.length === 0 ? "Add" : "Update"}
            </Button>
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
              <TableBody>
                {table.getRowModel().rows.length > 0 ? (
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
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentManagementComponent;
