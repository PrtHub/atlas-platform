"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-gray-500 text-sm font-[500] pl-6 transition-all hover:text-gray-600 hover:bg-gray-300/20",
        isActive &&
          "text-gray-700 bg-gray-200/20 hover:bg-gray-200/20 hover:text-gray-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <section className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-gray-500",
            isActive && "text-gray-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </section>
      <span
        className={cn(
          "ml-auto opacity-0 border-2 border-gray-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      />
    </button>
  );
};
