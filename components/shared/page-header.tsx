import React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  actions?: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4",
        className
      )}
    >
      <div>
        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2 sm:gap-2.5">
          {Icon && <Icon className="xs:size-6 size-5 sm:size-7 text-forest shrink-0" />}
          <span>{title}</span>
          {badge}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">{description}</p>
      </div>

      {actions && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
