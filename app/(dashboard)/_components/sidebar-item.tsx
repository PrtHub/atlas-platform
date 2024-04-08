"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "h-full flex items-center gap-x-2 text-gray-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-orange bg-orange/5 hover:bg-orange/5 hover:text-orange/90"
      )}
    >
      <div className="flex items-center gap-x-2 py-5">
        <Icon
          size={22}
          className={cn(
            "text-gray-500",
            isActive && "text-orange/90"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-orange/90 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}