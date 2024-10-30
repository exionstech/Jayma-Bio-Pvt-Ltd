import { MaxWrapper } from "@/components/shared/max-wrapper";

export default function NotFoundPage() {
  return (
    <MaxWrapper>
      <main className="w-full min-h-svh md:min-h-lvh flex items-center justify-center notfound-bg">
        <div className="flex flex-col gap-3">
          <h1 className="text-6xl text-white tracking-wide">404</h1>
        </div>
      </main>
    </MaxWrapper>
  );
}
