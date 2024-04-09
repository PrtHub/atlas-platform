import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <section className="p-6 space-y-4">
      <section className="grid grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          numberOfItems={coursesInProgress.length}
          label="In Progress"
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </section>
      <CoursesList items={[...completedCourses, ...coursesInProgress]} />
    </section>
  );
}
