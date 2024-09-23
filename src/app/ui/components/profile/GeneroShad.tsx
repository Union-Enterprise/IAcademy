"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "Homem",
    label: "Homem",
  },
  {
    value: "Mulher",
    label: "Mulher",
  },
  {
    value: "Não-Binario",
    label: "Não-Binario",
  },
];

export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="framework-combobox" className="text-lg font-medium">
        Gênero
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            id="framework-combobox"
            aria-expanded={open}
            className="flex  items-center w-[160px] h-[50px] text-center truncate hover:border-mainBlue"
          >
            <span className="ml-1">
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Selecione um Gênero"}
            </span>
            <CaretSortIcon className="shrink-0 opacity-50 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[160px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>Nenhum framework encontrado.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
