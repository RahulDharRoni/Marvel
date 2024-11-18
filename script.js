const apiUrl = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=a867efefb807efec7a199e02868abba2&hash=05087ec959c2b33ae7e56d7b05c97c5f";

const loadingMessage = document.getElementById("loading");
const comicsContainer = document.getElementById("comics-container");

// Fetch and display comics
async function fetchComics() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const comics = data.data.results;

        loadingMessage.style.display = "none";

        // JavaScript code to generate flip card with animation
// JavaScript code to generate cards with hover overlay effect
comics.forEach(comic => {
    const card = document.createElement("div");
    card.className = "relative w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer mx-auto mb-8 group";
    card.dataset.comicId = comic.id; // Set data attribute with comic ID

    // Comic image
    const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    const img = document.createElement("img");
    img.src = thumbnail;
    img.alt = comic.title;
    img.className = "w-full h-full object-cover";

    // Hover overlay
    const overlay = document.createElement("div");
    overlay.className = "absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100";
    
    const title = document.createElement("h2");
    title.textContent = comic.title;
    title.className = "text-lg font-semibold text-white mb-2 text-center";

    const price = document.createElement("p");
    const comicPrice = comic.prices[0].price || "N/A";
    price.textContent = `$${comicPrice}`;
    price.className = "text-md font-bold text-white";

    // Append title and price to overlay, and overlay and img to the card
    overlay.appendChild(title);
    overlay.appendChild(price);
    card.appendChild(img);
    card.appendChild(overlay);

    // Add onclick event to navigate to details page
    card.addEventListener("click", () => {
        window.location.href = `details.html?id=${comic.id}`;
    });

    // Add the card to the container
    comicsContainer.appendChild(card);
});

    } catch (error) {
        console.error("Error fetching comics data:", error);
        loadingMessage.textContent = "Failed to load comics. Please try again later.";
    }
}

// Add event listener to comicsContainer for card clicks
comicsContainer.addEventListener("click", (event) => {
    const card = event.target.closest(".bg-white"); // Select the clicked card
    if (card && card.dataset.comicId) {
        const comicId = card.dataset.comicId;
        console.log(`Comic ID ${comicId} clicked`); // Debugging log
        window.location.href = `details.html?id=${comicId}`;
    }
});

// Call the function to fetch and display comics on page load
fetchComics();
