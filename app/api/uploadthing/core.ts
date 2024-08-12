/** @format */

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "DBakes" };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
