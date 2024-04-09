import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  icon: LucideIcon;
  label: string;
}

const InfoCard = ({
  icon: Icon,
  variant,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center border rounded-md gap-x-2 gap-y-1 p-3">
      <IconBadge icon={Icon} variant={variant} />
      <span className="flex flex-col items-start">
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </span>
    </section>
  );
};

export default InfoCard;
