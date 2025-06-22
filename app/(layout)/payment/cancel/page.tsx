/* eslint-disable @typescript-eslint/no-unused-vars */
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

export default async function CancelPaymentPage(props: PageParams) {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Paiement annulé</LayoutTitle>
        <LayoutDescription>
          Votre paiement a été annulé. Si vous voulez toujours faire un don, vous pouvez réessayer ou choisir un autre moyen de paiement.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex justify-center">
        <Link href="/my-gleanings" className={buttonVariants({ size: "lg" })}>
          Retour à mes glanages
        </Link>
      </LayoutContent>
    </Layout>
  );
}
