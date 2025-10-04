import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyLogo, { SkeletonLogo } from "@/components/company-logo";
import CompanyImage, { SkeletonImage } from "@/components/company-image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Suspense fallback={<SkeletonLogo />}>
            <CompanyLogo />
          </Suspense>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={
              <div className="flex flex-col space-y-5">
                <div className="space-y-2">
                  <Skeleton className="mx-10 h-10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="mx-30 w-15 h-4 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="mx-30 w-15 h-4 rounded-xl" />
                </div>
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Suspense fallback={<SkeletonImage />}>
          <CompanyImage />
        </Suspense>
      </div>
    </div>
  );
}
