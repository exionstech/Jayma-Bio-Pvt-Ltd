"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ProductsCard from "./products-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const ProductsComponents = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="my-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green rounded-lg  hover:bg-green/90 px-6 flex items-center justify-center py-2">
              Add
              <Plus className="size-5 shrink-0" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <ProductsCard setDialogOpen={setDialogOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <div></div>
    </div>
  );
};

export default ProductsComponents;
