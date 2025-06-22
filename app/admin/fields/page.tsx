/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { FieldTableContainer } from "@/features/admin/fields/FieldTableContainer";
import { isAdmin } from "@/lib/auth/helper";
import { Plus } from "lucide-react";
import type { Prisma } from "@/generated/client";
import { convertDecimal } from "@/lib/format/decimal";

export const metadata = {
  title: "Gestion des champs | Field4U Admin",
  description: "Gérez les champs de la plateforme Field4U",
};

export default async function FieldsPage(props: PageParams<{}>) {
  await isAdmin();

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  let whereClause: Prisma.FieldWhereInput = {};

  if (search) {
    whereClause = {
      OR: [
        { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
        { city: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
        {
          postalCode: {
            contains: search,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ],
    };
  }

  const totalFields = await prisma.field.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalFields / pageSize);

  const rawFields = await prisma.field.findMany({
    where: whereClause,
    orderBy: [{ createdAt: "desc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      owner: true,
      farm: true,
    },
  });

  const fields = convertDecimal(rawFields);

  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: [{ name: "asc" }],
  });

  const rawFarms = await prisma.farm.findMany({
    orderBy: [{ name: "asc" }],
  });

  const farms = convertDecimal(rawFarms);

  return (
    <Layout size="full">
      <LayoutHeader>
        <LayoutTitle>Gestion des Champs</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Suspense>
          <FieldTableContainer
            initialFields={fields}
            page={page}
            totalPages={totalPages}
            search={search}
            users={users}
            farms={farms}
            createButtonSlot={
              <Button
                variant="default"
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus className="mr-2 size-4" />
                Nouveau Champ
              </Button>
            }
          />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
