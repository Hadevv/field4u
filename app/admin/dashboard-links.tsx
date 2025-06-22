import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import {
  LayoutDashboard,
  User2,
  MapPin,
  Megaphone,
  Calendar,
} from "lucide-react";

export const DASHBOARD_LINKS: NavigationLinkGroups[] = [
  {
    links: [
      {
        title: "Tableau de Bord",
        icon: <LayoutDashboard />,
        url: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Gestion",
    links: [
      {
        title: "Utilisateurs",
        icon: <User2 />,
        url: "/admin/users",
      },
      {
        title: "Champs",
        icon: <MapPin />,
        url: "/admin/fields",
      },
      {
        title: "Annonces",
        icon: <Megaphone />,
        url: "/admin/announcements",
      },
      {
        title: "Glanages",
        icon: <Calendar />,
        url: "/admin/gleanings",
      },
    ],
  },
];
