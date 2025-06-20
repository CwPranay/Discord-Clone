"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop()
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
        fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />

       <button
       onClick={()=>onChange("")}
       className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm "
       type="button"
       
       ><X className="h-4 w-4"/></button>

      </div>
    )
  }

  if (value && fileType==="pdf") {
    return(
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
         <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400 "/>
         <a href={value}
         target="_blank"
         rel="noopener noreferrer"
         className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
          {value}
         </a>
         <button
       onClick={()=>onChange("")}
       className="bg-rose-500 text-white p-1 rounded-full absolute top-2 right-2 shadow-sm "
       type="button"
       
       ><X className="h-4 w-4"/></button>
      </div>
    )
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
        appearance={{
          button: "bg-blue-600 hover:bg-blue-900 text-white py-2 px-4  rounded text-sm",
          label: "text-gray-600 text-sm mb-2",
          allowedContent: "text-xs text-gray-400",
          container:
            "border border-dashed border-gray-300 bg-white  rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer w-78 shadow-sm",
          uploadIcon: "text-gray-400 w-10 h-10",
        }}
      />
    </div>
  );
};
