import { create } from "zustand";

interface LightboxState {
  isOpen: boolean;
  imageUrl: string;
  caption?: string;

  openLightbox: (imageUrl: string, caption?: string) => void;
  closeLightbox: () => void;
}

export const useLightboxStore = create<LightboxState>((set) => ({
  isOpen: false,
  imageUrl: "",
  caption: "",

  openLightbox: (imageUrl: string, caption?: string) =>
    set({
      isOpen: true,
      imageUrl,
      caption: caption || "",
    }),

  closeLightbox: () =>
    set({
      isOpen: false,
      imageUrl: "",
      caption: "",
    }),
}));
