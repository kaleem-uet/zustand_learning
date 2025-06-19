import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface BaseSheetProps {
  title: string;
  description?: string;
  triggerButton?: {
    label: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  };
  children: ReactNode;
  footerButtons?: {
    submit?: {
      label: string;
      onClick?: () => void;
    };
    close?: {
      label: string;
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    };
  };
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export function BaseSheet({
  title,
  description,
  triggerButton = { label: "Open", variant: "outline" },
  children,
  footerButtons = {
    submit: { label: "Save changes" },
    close: { label: "Close", variant: "outline" },
  },
  side = "right",
  className,
}: BaseSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={triggerButton.variant}>{triggerButton.label}</Button>
      </SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 py-6">{children}</div>
        <SheetFooter>
          {footerButtons.submit && (
            <Button type="submit" onClick={footerButtons.submit.onClick}>
              {footerButtons.submit.label}
            </Button>
          )}
          {footerButtons.close && (
            <SheetClose asChild>
              <Button variant={footerButtons.close.variant}>
                {footerButtons.close.label}
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 