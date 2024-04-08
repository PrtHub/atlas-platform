"use client";

import toast from "react-hot-toast";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      appearance={{
        button:
          "ut-uploading:cursor-not-allowed bg-orange cursor-pointer outline-none after:bg-red-400",
        label: "text-orange hover:text-red-400",
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}}`);
      }}
    />
  );
};

export default FileUpload;
