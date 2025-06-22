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
import { UserTableContainer } from "@/features/admin/users/UserTableContainer";
import { isAdmin } from "@/lib/auth/helper";
import { Plus } from "lucide-react";
import { Prisma, UserRole } from "@/generated/client";
import { convertDecimal } from "@/lib/format/decimal";

export const metadata = {
  title: "Gestion des utilisateurs | Field4U Admin",
  description: "Gérez les utilisateurs de la plateforme Field4U",
};

export default async function UsersPage(props: PageParams<{}>) {
  await isAdmin();

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const role =
    typeof searchParams.role === "string" ? searchParams.role : "ALL";

  let whereClause: Prisma.UserWhereInput = {
    deletedAt: null,
  };

  if (search) {
    whereClause = {
      ...whereClause,
      OR: [
        { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
        {
          email: { contains: search, mode: "insensitive" as Prisma.QueryMode },
        },
      ],
    };
  }

  if (role && role !== "ALL") {
    whereClause = {
      ...whereClause,
      role: role as UserRole,
    };
  }

  const totalUsers = await prisma.user.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalUsers / pageSize);

  const rawUsers = await prisma.user.findMany({
    where: whereClause,
    orderBy: [{ createdAt: "desc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const users = convertDecimal(rawUsers);

  return (
    <Layout size="full">
      <LayoutHeader>
        <LayoutTitle>Gestion des Utilisateurs</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Suspense>
          <UserTableContainer
            initialUsers={users}
            page={page}
            totalPages={totalPages}
            search={search}
            role={role}
            createButtonSlot={
              <Button
                variant="outline"
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus className="mr-2 size-4" />
                Nouvel Utilisateur
              </Button>
            }
          />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
