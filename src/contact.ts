declare var grecaptcha: any;

function createInputField(
  type: string,
  id: string,
  name: string,
  labelText: string
): HTMLElement {
  const container = document.createElement("div");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = name;
  input.required = true;

  container.appendChild(label);
  container.appendChild(input);

  return container;
}

function createTextAreaField(
  id: string,
  name: string,
  labelText: string
): HTMLElement {
  const container = document.createElement("div");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;

  const textarea = document.createElement("textarea");
  textarea.id = id;
  textarea.name = name;
  textarea.required = true;

  container.appendChild(label);
  container.appendChild(textarea);

  return container;
}

function createSubmitButton(): HTMLElement {
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Send";

  return button;
}

function createContactForm(): HTMLElement {
  const formContainer = document.createElement("div");
  formContainer.classList.add("contact-form-section");

  const form = document.createElement("form");
  form.classList.add("contact-form");
  form.setAttribute("id", "contact-form");

  form.appendChild(createInputField("text", "name", "name", "Name:"));
  form.appendChild(createInputField("email", "email", "email", "Email:"));
  form.appendChild(createTextAreaField("message", "message", "Message:"));
  form.appendChild(createSubmitButton());

  form.appendChild(createRecaptchaWidget());

  formContainer.appendChild(form);

  return formContainer;
}

function createRecaptchaWidget(): HTMLElement {
  const recaptchaContainer = document.createElement("div");
  recaptchaContainer.classList.add("g-recaptcha");
  recaptchaContainer.setAttribute("id", "recaptcha-container");
  recaptchaContainer.setAttribute(
    "data-sitekey",
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
  );

  return recaptchaContainer;
}

function handleFormSubmit(e: Event): void {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  const recaptchaResponse = grecaptcha.getResponse() as string;
  if (recaptchaResponse === "") {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  alert("Form submitted!");

  form.reset();
  grecaptcha.reset();
}

export function RenderContactPage(): void {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "";
    const contactFormComponent = createContactForm();
    main.appendChild(contactFormComponent);

    const form = contactFormComponent.querySelector("form");
    if (form) {
      form.addEventListener("submit", handleFormSubmit);
    }

    setTimeout(() => {
      if (typeof grecaptcha !== "undefined") {
        grecaptcha.render("recaptcha-container", {
          sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
        });
      }
    }, 100);
  }
}

function loadRecaptchaScript(): void {
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

loadRecaptchaScript();
