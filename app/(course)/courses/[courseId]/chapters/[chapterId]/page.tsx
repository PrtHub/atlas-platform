import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";

import { getChapter } from "@/actions/get-chapters";
import { VideoPlayer } from "./_components/video-player";
import { File } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseEnrollButton } from "./_components/course-enroll-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <section className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </section>
      <section>
        <section className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchase ? (
            <div>{/* TODO: Add CourseProgressButton */}</div>
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </section>
        <Separator />
        <article>
          <Preview value={chapter.description!} />
        </article>
        {!!attachments.length && (
          <>
            <Separator />
            <section className="p-4 space-y-2">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex gap-x-2 items-center p-3 w-full bg-orange/5 border border-orange/40 text-orange/90 rounded-md hover:underline"
                >
                  <File />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default ChapterIdPage;
