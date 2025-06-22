/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { PageParams } from "@/types/next";
import { SignInDialog } from "./SignInDialog";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function RoutePage(props: PageParams<{}>) {
  return <SignInDialog />;
}
