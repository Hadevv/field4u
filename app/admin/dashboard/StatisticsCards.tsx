import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Leaf, MapPin, Coins, Users, Tag } from "lucide-react";

type StatisticsCardsProps = {
  totalUsers: number;
  totalFields: number;
  totalGleanings: number;
  totalAnnouncements: number;
  activeWeeklyGleaners: number;
  totalDonations: number;
};

export default function StatisticsCards(props: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            Inscrits sur plateforme
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Champs</CardTitle>
          <MapPin className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.totalFields}</div>
          <p className="text-xs text-muted-foreground">
            Disponibles pour glanage
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Glanages</CardTitle>
          <Leaf className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.totalGleanings}</div>
          <p className="text-xs text-muted-foreground">
            Réalisés avec succès
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Annonces</CardTitle>
          <Tag className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.totalAnnouncements}</div>
          <p className="text-xs text-muted-foreground">
            Publiées par agriculteurs
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Glaneurs actifs</CardTitle>
          <CalendarClock className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.activeWeeklyGleaners}</div>
          <p className="text-xs text-muted-foreground">Cette semaine</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dons (€)</CardTitle>
          <Coins className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.totalDonations}</div>
          <p className="text-xs text-muted-foreground">
            Collect
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
