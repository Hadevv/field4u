import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import Link from "next/link";
import type { PageParams } from "@/types/next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function SuccessPaymentPage(props: PageParams) {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Paiement réussi</LayoutTitle>
        <LayoutDescription>
          Merci pour votre contribution au glanage et à l&apos;agriculture
          locale. Votre soutien fait une différence réelle pour notre communauté
          et nos agriculteurs locaux.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex justify-center">
        <Link href="/my-gleanings" className={buttonVariants({ size: "sm" })}>
          Voir mes glanages
        </Link>
      </LayoutContent>
    </Layout>
  );
}
