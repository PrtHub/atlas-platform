import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format-price";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <section className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <figure className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </figure>

        <section className="flex flex-col pt-2">
          <span className="text-lg md:text-base font-medium group-hover:text-orange/90 transition line-clamp-2">
            {title}
          </span>

          <p className="text-xs text-muted-foreground">{category}</p>

          <section className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-gray-500">
              <IconBadge size="sm" icon={BookOpen} />

              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </section>

          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-gray-700">
              {formatPrice(price)}
            </p>
          )}
        </section>
      </section>
    </Link>
  );
};
