import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon exploitation - Field4U",
  description:
    "Gérez les informations de votre exploitation agricole sur Field4U",
};

export default function FarmDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
