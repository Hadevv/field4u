"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, Leaf, Paperclip, Users } from "lucide-react";

export function RulesSection() {
  return (
    <Card className="overflow-hidden border border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <Paperclip className="h-5 w-5" />
          Règles du glanage
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Consignes importantes à respecter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                Respectez les horaires
              </p>
              <p className="text-xs text-muted-foreground">
                Arrivez à l&apos;heure indiquée et ne dépassez pas l&apos;heure
                de fin
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                Respectez les cultures
              </p>
              <p className="text-xs text-muted-foreground">
                Ne récoltez que les produits autorisés par le propriétaire
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                Entraide et partage
              </p>
              <p className="text-xs text-muted-foreground">
                Aidez-vous mutuellement et partagez équitablement les récoltes
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
