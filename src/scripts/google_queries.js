document.addEventListener("DOMContentLoaded", async function () {
    const domainInput = document.getElementById("domainInput");
    const dorkButtonsContainer = document.getElementById("dorkButtons");

    // Fetch dork data from JSON
    let dorks = [];
    try {
        const response = await fetch("/src/data/google_dorks.json");
        dorks = await response.json();
    } catch (error) {
        console.error("Error loading dorks:", error);
    }

    // Function to replace domain in dork query
    function getDorkQuery(query) {
        const domain = domainInput.value.trim() || "example.com";
        return query.replace(/example\.com/g, domain);
    }

    // Generate buttons dynamically
    dorks.forEach((dork) => {
        const button = document.createElement("button");
        button.textContent = dork.name;
        button.classList.add("dork-btn");

        button.addEventListener("click", () => {
            const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(
                getDorkQuery(dork.query)
            )}`;
            window.open(googleSearchURL, "_blank"); // Open in new tab
        });

        dorkButtonsContainer.appendChild(button);
    });
});
