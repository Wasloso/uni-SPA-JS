import { RenderHomePage } from "./home.js";
import { RenderContactPage } from "./contact.js";
import { RenderGalleryPage } from "./gallery.js";
import { renderNavbar } from "./navbar.js";
import { pageUrls, Page } from "./pages.js";
import { RenderPortfolioPage } from "./portfolio.js";

const routes: Record<Page, () => void> = {
  contact: RenderContactPage,
  gallery: RenderGalleryPage,
  home: RenderHomePage,
  portfolio: RenderPortfolioPage,
};

export function navigateTo(page: Page): void {
  history.pushState({ page }, page, pageUrls[page]);
  document.title = page.charAt(0).toUpperCase() + page.slice(1);
  routes[page]();
}

function handleRouting(): void {
  const current = parsePageFromUrl();
  routes[current]();
}
function parsePageFromUrl(): Page {
  const query = window.location.search.replace("?", "");
  if (isValidPage(query)) return query as Page;
  return "home";
}
function isValidPage(p: string): p is Page {
  return ["contact", "gallery", "portfolio", "home"].includes(p);
}

function OnStartUp(): void {
  renderNavbar();
  window.addEventListener("DOMContentLoaded", () => {
    handleRouting();
  });
  window.addEventListener("popstate", handleRouting);
}
OnStartUp();
