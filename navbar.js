import { pageUrls, pages } from "./pages.js";
import { navigateTo } from "./router.js";
export function renderNavbar() {
    const nav = document.querySelector("nav");
    console.log("Rendering navbar");
    if (!nav)
        return;
    nav.innerHTML = "";
    const linkContainer = document.createElement("div");
    linkContainer.classList.add("nav-links");
    pages.forEach(({ page, label }) => {
        const link = document.createElement("a");
        link.href = pageUrls[page];
        link.dataset.link = page;
        link.textContent = label;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo(page);
        });
        linkContainer.appendChild(link);
    });
    const themeToggle = document.createElement("button");
    themeToggle.textContent = "🌓";
    themeToggle.id = "theme-toggle";
    themeToggle.addEventListener("click", () => {
        toggleTheme();
    });
    nav.appendChild(linkContainer);
    nav.appendChild(themeToggle);
}
function toggleTheme() {
    const currentTheme = document.body.classList.contains("dark")
        ? "dark"
        : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    const navbar = document.querySelector("nav");
    if (navbar) {
        navbar.classList.remove(currentTheme);
        navbar.classList.add(newTheme);
    }
    localStorage.setItem("theme", newTheme);
}
