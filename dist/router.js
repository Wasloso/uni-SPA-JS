import { RenderHomePage } from "./home.js";
import { RenderContactPage } from "./contact.js";
import { RenderGalleryPage } from "./gallery.js";
import { renderNavbar } from "./navbar.js";
import { pageUrls } from "./pages.js";
import { RenderPortfolioPage } from "./portfolio.js";
const routes = {
    contact: RenderContactPage,
    gallery: RenderGalleryPage,
    home: RenderHomePage,
    portfolio: RenderPortfolioPage,
};
export function navigateTo(page) {
    history.pushState({ page }, page, pageUrls[page]);
    document.title = page.charAt(0).toUpperCase() + page.slice(1);
    routes[page]();
}
export function handleRouting() {
    const current = parsePageFromUrl();
    routes[current]();
}
function parsePageFromUrl() {
    const query = window.location.search.replace("?", "");
    if (isValidPage(query))
        return query;
    else {
        console.error(`Invalid page: ${query}`);
        return "home";
    }
    return "home";
}
function isValidPage(p) {
    return ["contact", "gallery", "portfolio", "home"].includes(p);
}
function OnStartUp() {
    renderNavbar();
    window.addEventListener("DOMContentLoaded", () => {
        handleRouting();
    });
    window.addEventListener("popstate", handleRouting);
}
OnStartUp();
