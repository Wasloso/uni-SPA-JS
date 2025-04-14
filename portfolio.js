async function fetchGitHubRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
        throw new Error("Failed to fetch repositories.");
    }
    const repos = await response.json();
    return repos;
}
function PortfolioComponent(repos) {
    const container = document.createElement("div");
    container.classList.add("portfolio-grid");
    repos.forEach((repo) => {
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.classList.add("repo-card");
        const title = document.createElement("h3");
        title.textContent = repo.name;
        const description = document.createElement("p");
        description.textContent = repo.description || "No description";
        description.classList.add("repo-description");
        const stars = document.createElement("span");
        stars.textContent = `⭐ ${repo.stargazers_count}`;
        stars.classList.add("repo-stars");
        link.appendChild(title);
        link.appendChild(description);
        link.appendChild(stars);
        container.appendChild(link);
    });
    return container;
}
export async function RenderPortfolioPage() {
    const username = "wasloso";
    const repos = await fetchGitHubRepos(username);
    const portfolioPage = PortfolioComponent(repos);
    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        main.appendChild(portfolioPage);
    }
}
