"use client";
import React, { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Moved ImageDialog outside main component to prevent re-creation on every render
interface ImageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  selectedIndex: number;
  onPrevious: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  title: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  onOpenChange,
  images,
  selectedIndex,
  onPrevious,
  onNext,
  title,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col rounded-lg md:rounded-xl">
      <div className="relative flex-1 flex items-center justify-center w-full h-full min-h-[70vh]">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={images[selectedIndex]}
            alt={`${title}-${selectedIndex + 1}`}
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

interface ImageGridProps {
  images: string[];
  title: string;
}

export const ImageGrid = ({ images, title }: ImageGridProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const renderImageGrid = () => {
    if (images.length === 1) {
      return (
        <div className="w-[550px] h-250px] md:h-[350px] overflow-hidden object-contain flex items-center justify-center">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => handleImageClick(0)}
          />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="w-[550px] h-250px] md:h-[350px] flex flex-row gap-1 overflow-hidden object-contain rounded-lg">
          {images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`${title}-${idx + 1}`}
              className="w-1/2 object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(idx)}
            />
          ))}
        </div>
      );
    }

    if (images.length === 3) {
      return (
        <div className="pt-3 w-[550px] h-250px] md:h-[350px]">
          <div className="flex flex-row h-full">
            <div className="w-1/2 pr-[4px]">
              <img
                src={images[0]}
                alt={`${title}-1`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(0)}
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <img
                src={images[1]}
                alt={`${title}-2`}
                className="w-full h-1/2 object-cover rounded-lg mb-1 cursor-pointer"
                onClick={() => handleImageClick(1)}
              />
              <img
                src={images[2]}
                alt={`${title}-3`}
                className="w-full h-1/2 object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(2)}
              />
            </div>
          </div>
        </div>
      );
    }

    // For 4 or more images
    return (
      <div className="pt-3 w-[550px] h-250px] md:h-[350px] overflow-hidden rounded-lg">
        <div className="flex flex-row h-full">
          <div className="w-1/2 pr-[4px]">
            <img
              src={images[0]}
              alt={`${title}-1`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <img
              src={images[1]}
              alt={`${title}-2`}
              className="w-full h-1/2 object-cover rounded-lg mb-1 cursor-pointer"
              onClick={() => handleImageClick(1)}
            />
            <div className="w-full h-1/2 flex flex-row gap-1 rounded-lg overflow-hidden">
              <img
                src={images[2]}
                alt={`${title}-3`}
                className="w-1/2 h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(2)}
              />
              <div className="w-1/2 h-full relative">
                <img
                  src={images[3]}
                  alt={`${title}-4`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(3)}
                />
                {images.length > 4 && (
                  <div
                    className="w-full h-full absolute bg-black opacity-60 backdrop-blur-sm rounded-sm bottom-0 right-0 flex items-center justify-center gap-1 cursor-pointer"
                    onClick={() => handleImageClick(3)}
                  >
                    <Plus className="size-7 shrink-0 text-white" />
                    <h1 className="text-5xl text-white font-medium select-none">
                      {images.length - 4}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderImageGrid()}
      <ImageDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        images={images}
        selectedIndex={selectedImageIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        title={title}
      />
    </>
  );
};

export default ImageGrid;








