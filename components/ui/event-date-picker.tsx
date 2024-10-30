import React, { useState, useEffect } from "react";
import { format, isBefore } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Extend the years list to 3000
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: 2100 - currentYear },
  (_, i) => currentYear + i
);

interface DatePickerFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  className?: string;
}

const EventDatePicker: React.FC<DatePickerFieldProps> = ({
  form,
  name,
  label,
  className,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  const fieldValue = form.watch(name);

  useEffect(() => {
    if (fieldValue) {
      const date =
        fieldValue instanceof Date ? fieldValue : new Date(fieldValue);
      setSelectedMonth(date.getMonth());
      setSelectedYear(date.getFullYear());
    }
  }, [fieldValue]);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(parseInt(value));
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(parseInt(value));
  };

  const navigateMonth = (direction: number) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return undefined;
    const dateObject = date instanceof Date ? date : new Date(date);
    return isNaN(dateObject.getTime()) ? undefined : dateObject;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 font-normal flex items-center justify-start",
                    !field.value && "text-muted-foreground",
                    className
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(formatDate(field.value) || new Date(), "LLL dd, y")
                  ) : (
                    <span>Select Date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-2 bg-white rounded-lg shadow flex items-center justify-center flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateMonth(-1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Select
                      value={selectedMonth.toString()}
                      onValueChange={handleMonthChange}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue>{monthNames[selectedMonth]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {monthNames.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedYear.toString()}
                      onValueChange={handleYearChange}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue>{selectedYear}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateMonth(1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={formatDate(field.value)}
                  onSelect={(date) => {
                    field.onChange(date);
                    setIsOpen(false);
                  }}
                  month={new Date(selectedYear, selectedMonth)}
                  disabled={(date) => isBefore(date, today)}
                  className="rounded-md border"
                  showNav={false}
                />
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventDatePicker;
