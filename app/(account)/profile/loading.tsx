import { Skeleton } from "@/components/ui/skeleton";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: LayoutParams<Record<string, never>>,
) {
  return <Skeleton className="h-12" />;
}
