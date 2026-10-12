import React from "react";

interface StepHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function StepHeader({
  title,
  description,
  className = "mb-4",
}: StepHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-xl font-bold text-zinc-900">{title}</h1>
      <p className="text-xs text-zinc-500 mt-1">{description}</p>
    </div>
  );
}
