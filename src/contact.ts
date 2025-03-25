function ContactComponent(): HTMLElement {
  const container = document.createElement("div");
  container.innerHTML = `
      <h1 class="title">Contact with me</h1>
      <form id="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
      </form>
    `;

  const form = container.querySelector("#contact-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted!");
  });

  return container;
}

export function RenderContactPage(): void {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "";
    main.appendChild(ContactComponent());
  }
}
