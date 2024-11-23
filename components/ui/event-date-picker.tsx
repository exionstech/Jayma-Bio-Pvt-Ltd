import { useState, useEffect } from "react"
import { format, isBefore } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CalendarIcon } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 2100 - currentYear + 1 }, (_, i) => currentYear + i)

interface DatePickerFieldProps {
  form: UseFormReturn<any>
  name: string
  label: string
  className?: string
}

const EventDatePicker: React.FC<DatePickerFieldProps> = ({
  form,
  name,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false)
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [month, setMonth] = useState<Date>(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  useEffect(() => {
    const value = form.watch(name)
    if (value) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setSelectedDate(date)
        setMonth(date)
      }
    }
  }, [form.watch(name)])

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      form.setValue(name, format(date, "yyyy-MM-dd"), {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(selectedDate?.getFullYear() || new Date().getFullYear(), month, 1)
    setMonth(newDate)
    setIsMonthSelectOpen(false)
  }

  const handleYearSelect = (year: string) => {
    const newDate = new Date(parseInt(year), month.getMonth(), 1)
    setMonth(newDate)
    setIsYearSelectOpen(false)
  }

  const footer = (
    <div className="flex items-center gap-2 mt-2">
      <Select
        open={isMonthSelectOpen}
        onOpenChange={setIsMonthSelectOpen}
        value={month.getMonth().toString()}
        onValueChange={(value) => handleMonthSelect(parseInt(value))}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue>{monthNames[month.getMonth()]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        open={isYearSelectOpen}
        onOpenChange={setIsYearSelectOpen}
        value={month.getFullYear().toString()}
        onValueChange={handleYearSelect}
      >
        <SelectTrigger className="w-[90px]">
          <SelectValue>{month.getFullYear()}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

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
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    className
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(new Date(field.value), "PPP") : "Select date"}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                defaultMonth={selectedDate || new Date()}
                month={month}
                onMonthChange={setMonth}
                disabled={(date) => isBefore(date, today)}
                initialFocus
                footer={footer}
                className="cursor-pointer"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default EventDatePicker ;