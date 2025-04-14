function createModal(): HTMLElement {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">Zamknij</button>
      <img src="" alt="" class="modal-image" />
    </div>
  `;
  modal.style.display = "none";

  modal.querySelector(".modal-close")?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).classList.contains("modal")) {
      modal.style.display = "none";
    }
  });

  document.body.appendChild(modal);
  return modal;
}

function GalleryItemComponent(
  imageUrl: string,
  altText: string,
  observer: IntersectionObserver,
  modal: HTMLElement,
  size: number
): HTMLElement {
  const item = document.createElement("div");
  item.classList.add("gallery-item");

  const img = document.createElement("img");

  img.dataset.src = imageUrl;
  img.alt = altText;
  img.loading = "lazy";

  // Reserve space to prevent layout collapse
  img.width = size;
  img.height = size;

  // Initial animation state
  img.style.opacity = "0";
  img.style.transform = "translateY(30px)";
  img.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

  observer.observe(img);

  img.addEventListener("click", () => {
    const modalImg = modal.querySelector(".modal-image") as HTMLImageElement;
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.style.display = "flex";
  });

  item.appendChild(img);
  return item;
}

function GalleryComponent(count: number = 9): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("gallery-container");

  const modal = createModal();

  const observer: IntersectionObserver = new IntersectionObserver(
    async (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          img.onload = () => {
            img.style.opacity = "1";
            img.style.transform = "translateY(0)";
          };

          try {
            const response = await fetch(img.dataset.src || "");
            const blob = await response.blob();
            img.src = URL.createObjectURL(blob);
          } catch (err) {
            console.error("Failed to load image:", err);
          }

          obs.unobserve(img);
        }
      }
    },
    {
      rootMargin: "100px",
      threshold: 0.1,
    }
  );

  const galleryData = Array.from({ length: count }, (_, index) => {
    const width = Math.floor(Math.random() * 701) + 300;
    const size = Math.floor(Math.random() * 701) + 300;

    return {
      imageUrl: `https://picsum.photos/${size}?random=${Math.random()}`,
      size: size,
      altText: `Gallery image ${index + 1}`,
    };
  });

  galleryData.forEach(({ imageUrl, altText, size }) => {
    const galleryItem = GalleryItemComponent(
      imageUrl,
      altText,
      observer,
      modal,
      size
    );
    container.appendChild(galleryItem);
  });

  return container;
}

export function RenderGalleryPage(): void {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "";
    const gallery = GalleryComponent(25);
    main.appendChild(gallery);
  }
}
