"use client";

import { useEffect, useState } from "react";
import { InsightsPanel } from "@/components/insights/insights-panel";
import { ErrorState, LoadingState } from "@/components/ui/states";
import { apiRequest } from "@/lib/api";
import { Insights } from "@/types/finance";

export function InsightsView() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const response = await apiRequest<{ data: Insights }>("/api/insights");
        setInsights(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch insights");
      } finally {
        setLoading(false);
      }
    };

    void fetchInsights();
  }, []);

  if (loading) {
    return <LoadingState label="Loading insights..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!insights) {
    return <ErrorState message="Insights data unavailable." />;
  }

  return <InsightsPanel insights={insights} />;
}
