const baseUrl = "/index.html";
export type Page = "home" | "contact" | "gallery" | "portfolio";
export const pageUrls: Record<Page, string> = {
  home: "/",
  contact: "/contact",
  gallery: "/gallery",
  portfolio: "/portfolio",
};

export const pages: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "portfolio", label: "Portfolio" },
  { page: "gallery", label: "Gallery" },
  { page: "contact", label: "Contact" },
];
