"use client";

import axios from "axios";

import MuxPlayer from "@mux/mux-player-react";

import { useState } from "react";

import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId: string;

  courseId: string;

  chapterId: string;

  nextChapterId?: string;

  isLocked: boolean;

  completeOnEnd: boolean;

  title: string;
}

export const VideoPlayer = ({
  playbackId,

  courseId,

  chapterId,

  nextChapterId,

  isLocked,

  completeOnEnd,

  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <section className="relative aspect-video">
      {!isReady && !isLocked && (
        <span className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </span>
      )}

      {isLocked && (
        <span className="absolute inset-0 flex items-center justify-center bg-gray-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </span>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </section>
  );
};
