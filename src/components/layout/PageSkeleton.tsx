/** Neutral placeholder shown for a moment during client navigation to a detail page. */
export function PageSkeleton() {
  return (
    <div aria-hidden="true" className="container-site min-h-[70vh] pt-14">
      <div className="h-4 w-40 rounded-full bg-sand" />
      <div className="mt-8 h-16 max-w-2xl rounded-2xl bg-sand" />
      <div className="mt-6 h-6 max-w-xl rounded-full bg-sand/70" />
    </div>
  );
}
