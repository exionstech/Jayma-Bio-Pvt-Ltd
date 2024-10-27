"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ProductsCard from "./products-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ProductsComponents = () => {
  return (
    <div className="my-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <ProductsCard />
          </DialogContent>
        </Dialog>
      </div>
      <div></div>
    </div>
  );
};

export default ProductsComponents;
