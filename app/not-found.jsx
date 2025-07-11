import { Suspense } from "react";
import PageNotFound from "@/components/PageNotFound"; // Assuming your file is here

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <PageNotFound />
    </Suspense>
  );
}
