const BASE_PATH = window.location.pathname.replace(/\/[^/]*$/, "");
export const pageUrls = {
    home: `${BASE_PATH}?home`,
    contact: `${BASE_PATH}?contact`,
    gallery: `${BASE_PATH}?gallery`,
    portfolio: `${BASE_PATH}?portfolio`,
};
export const pages = [
    { page: "home", label: "Home" },
    { page: "portfolio", label: "Portfolio" },
    { page: "gallery", label: "Gallery" },
    { page: "contact", label: "Contact" },
];
