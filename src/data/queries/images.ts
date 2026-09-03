import { notFound } from "next/navigation";
import { cache } from "react";
import {
  illustrations,
  type Illustration,
} from "@/lib/photos";

export const getIllustrations = cache(
  async (): Promise<Illustration[]> => {
    return illustrations;
  },
);

export const getIllustration = cache(
  async (id: string): Promise<Illustration> => {
    const illustration = illustrations.find(
      (item) => item.id === id,
    );

    if (!illustration) {
      notFound();
    }

    return illustration;
  },
);

export const getCollection = cache(
  async (slug: string): Promise<Illustration[]> => {
    return illustrations.filter(
      (item) => item.collection === slug,
    );
  },
);