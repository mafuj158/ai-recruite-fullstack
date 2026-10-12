import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types/global.types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-xs text-zinc-500 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1.5 shrink-0">
            {index > 0 && <LuChevronRight className="size-3 text-zinc-400 shrink-0" />}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "hover:text-zinc-900 transition-colors shrink-0",
                  item.maxWidth && `truncate ${item.maxWidth}`
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "text-zinc-900 font-medium truncate shrink-0",
                  item.maxWidth && item.maxWidth
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
