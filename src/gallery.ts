// Create a component for an individual gallery item
function GalleryItemComponent(imageUrl: string, altText: string): HTMLElement {
  const item = document.createElement("div");
  item.classList.add("gallery-item");

  const img = document.createElement("img");

  img.src = imageUrl;
  img.alt = altText;
  //TODO: add lazy loading

  item.appendChild(img);
  return item;
}

function GalleryComponent(count: number = 10): HTMLElement {
  const container = document.createElement("div");
  container.setAttribute("data-tags", "gallery-items");

  const galleryData = Array.from({ length: count }, (_, index) => ({
    imageUrl: `https://picsum.photos/200`,
    altText: `Gallery image ${index + 1}`,
  }));

  galleryData.forEach(({ imageUrl, altText }) => {
    const galleryItem = GalleryItemComponent(imageUrl, altText);
    container.appendChild(galleryItem);
  });

  return container;
}

export function RenderGalleryPage(): void {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "";
    main.appendChild(GalleryComponent());
  }
}
