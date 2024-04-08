import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import ImageForm from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { CourseActions } from "./_components/course-actions";
import { Banner } from "@/components/banner";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished ? (
        <Banner variant='warning' label="This course is not published. It will not vissible to the students."/>
     ) : (
      <Banner variant='success' label="This course is published. It will be vissible to the students."/>
     )}
      <div className="p-6">
        <section className="flex items-center justify-between">
          <article className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-gray-700">
              Complete all fields {completionText}
            </span>
          </article>
          <CourseActions
          disabled={!isCompleted}
          courseId={params.courseId}
          isPublished={course.isPublished}
        />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />

            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <section>
              <div className="flex items-center justify-start gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </section>
            <section>
              <div className="flex items-center justify-start gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your Course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </section>
            <section>
              <div className="flex items-center justify-start gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resourses & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseIdPage;
