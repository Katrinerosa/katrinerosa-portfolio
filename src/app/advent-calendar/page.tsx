import type { Metadata } from "next";
import AdventCalendar from "@/components/AdventCalendar";

export const metadata: Metadata = {
  title: "Julekalender | Katrine Rosa Beck",
  description:
    "Åbn 24 låger med illustrationer, animationer og små magiske øjeblikke.",
};

export default function AdventCalendarPage() {
  return <AdventCalendar />;
}
