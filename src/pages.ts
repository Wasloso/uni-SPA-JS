export type Page = "home" | "contact" | "gallery" | "portfolio";
const BASE_PATH = window.location.pathname.replace(/\/[^/]*$/, "");

export const pageUrls: Record<Page, string> = {
  home: `${BASE_PATH}?home`,
  contact: `${BASE_PATH}?contact`,
  gallery: `${BASE_PATH}?gallery`,
  portfolio: `${BASE_PATH}?portfolio`,
};

export const pages: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "portfolio", label: "Portfolio" },
  { page: "gallery", label: "Gallery" },
  { page: "contact", label: "Contact" },
];
