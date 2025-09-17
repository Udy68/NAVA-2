import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onBack: () => void;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function BackButton({ 
  onBack, 
  label = "Back", 
  className = "",
  variant = "outline",
  size = "default"
}: BackButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onBack}
      className={`inline-flex items-center gap-2 hover:scale-105 transition-all duration-200 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {size !== "icon" && <span>{label}</span>}
    </Button>
  );
}