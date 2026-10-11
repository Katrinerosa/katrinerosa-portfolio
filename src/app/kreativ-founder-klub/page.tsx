import type { Metadata } from "next";
import { ViewTransition } from "react";
import FounderClubCase from "@/components/FounderClubCase";

export const metadata: Metadata = {
  title: "Kreativ Founder Klub | Katrine Rosa Beck",
  description:
    "Case: Et digitalt medlemsunivers med Next.js, TypeScript, Supabase, realtime-chat og agentisk udvikling.",
};

export default function KreativFounderKlubPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <FounderClubCase locale="da" />
    </ViewTransition>
  );
}
