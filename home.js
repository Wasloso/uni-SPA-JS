function HomeComponent() {
    const container = document.createElement("div");
    container.innerHTML = `
        <h1 class="title">About Me</h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
    return container;
}
export function RenderHomePage() {
    console.log("Rendering Home Page");
    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        main.appendChild(HomeComponent());
    }
}
