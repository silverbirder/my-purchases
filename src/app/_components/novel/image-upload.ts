import { toast } from "@/hooks/use-toast";
import { createImageUpload } from "novel/plugins";

const onUpload = async (file: File) => {
  const promise = fetch("/api/upload", {
    method: "POST",
    headers: {
      "content-type": file?.type || "application/octet-stream",
      "x-vercel-filename": file?.name || "image.png",
    },
    body: file,
  });

  //This should return a src of the uploaded image
  return promise;
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast({
        variant: "destructive",
        title: "File type not supported.",
        description: "Please upload an image file.",
      });
      // console.log("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      toast({
        variant: "destructive",
        title: "File size too big.",
        description: "Max file size is 20MB.",
      });
      return false;
    }
    return true;
  },
});
