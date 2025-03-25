import { RenderContactPage } from "./contact.js";
import { RenderGalleryPage } from "./gallery.js";

const pageUrls = {
  about: "/index.html?about",
  contact: "/index.html?contact",
  gallery: "/index.html?gallery",
};

document.querySelector("#contact-link")?.addEventListener("click", (e) => {
  let stateObj = { page: "contact" };
  document.title = "Contact";
  history.pushState(stateObj, "contact", "?contact");
  RenderContactPage();
});

document.querySelector("#gallery-link")?.addEventListener("click", (e) => {
  let stateObj = { page: "gallery" };
  document.title = "Gallery";
  history.pushState(stateObj, "gallery", "?gallery");
  RenderGalleryPage();
});

function OnStartUp(): void {
  popStateHandler();
}
OnStartUp();
function popStateHandler(): void {
  const loc: string = window.location.href
    .toString()
    .split(window.location.host)[1];
  if (loc === pageUrls.contact) {
    RenderContactPage();
  }
  if (loc === pageUrls.about) {
  }
  if (loc == pageUrls.gallery) {
    RenderGalleryPage();
  }
}
