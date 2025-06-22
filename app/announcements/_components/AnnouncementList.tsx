"use client";

import React from "react";
import { AnnouncementCard } from "./AnnouncementCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Announcement, MapAnnouncement } from "@/types/announcement";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";
import { useState } from "react";

// Définir l'interface pour la fenêtre globale
declare global {
  interface Window {
    updateAnnouncementResults?: (data: {
      announcements: Announcement[];
      mapAnnouncements: MapAnnouncement[];
    }) => void;
  }
}

type AnnouncementListProps = {
  announcements: Announcement[];
  onAnnouncementZoom?: (announcementId: string) => void;
};

function EmptyState(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetFilters = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);

      // Appel direct à l'API de recherche sans paramètres pour obtenir toutes les annonces
      const response = await fetch(`/api/search?initial=true&_t=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`);
      }

      const rawData = await response.json();

      // Convertir correctement les dates avant de mettre à jour les résultats
      const processedData = {
        ...rawData,
        announcements: rawData.announcements.map(
          (announcement: Record<string, unknown>) => ({
            ...announcement,
            startDate: announcement.startDate
              ? new Date(announcement.startDate as string)
              : null,
            endDate: announcement.endDate
              ? new Date(announcement.endDate as string)
              : null,
            createdAt: new Date(announcement.createdAt as string),
          }),
        ),
      };

      // Mise à jour des résultats via la fonction globale définie dans DynamicAnnouncementResults
      if (window.updateAnnouncementResults) {
        window.updateAnnouncementResults(processedData);
      }

      // Nettoyage de l'URL pour enlever les paramètres de filtrage
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-muted/40 rounded-full p-3 mb-4">
        <Search className="h-8 w-8 text-muted-foreground/60" />
      </div>
      <h3 className="text-lg font-medium mb-2">Aucune annonce trouvée</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        Aucune annonce ne correspond à vos critères de recherche. Essayez
        d&apos;ajuster vos filtres ou de réinitialiser votre recherche.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleResetFilters}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
}

export function AnnouncementList({
  announcements,
  onAnnouncementZoom,
}: AnnouncementListProps) {
  if (announcements.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-3 p-2">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            isLiked={announcement.isLiked}
            onZoomToLocation={onAnnouncementZoom}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
