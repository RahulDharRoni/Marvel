const apiUrl = "http://gateway.marvel.com/v1/public/comics";
const apiKey = "a867efefb807efec7a199e02868abba2";
const hash = "05087ec959c2b33ae7e56d7b05c97c5f";

// Get comic ID from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const comicId = urlParams.get("id");

const comicDetailsContainer = document.getElementById("comic-details");

async function fetchComicDetails() {
    if (!comicId) {
        comicDetailsContainer.innerHTML = "<p class='text-red-500'>Invalid comic ID.</p>";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${comicId}?ts=1&apikey=${apiKey}&hash=${hash}`);
        const data = await response.json();
        
        // Check if data exists
        if (!data || !data.data || !data.data.results || data.data.results.length === 0) {
            comicDetailsContainer.innerHTML = "<p class='text-red-500'>Comic not found.</p>";
            return;
        }

        const comic = data.data.results[0];

        // Create comic detail elements
        const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
        const img = document.createElement("img");
        img.src = thumbnail;
        img.alt = comic.title;
        img.className = "w-full h-80 object-cover rounded-md mb-6";

        const title = document.createElement("h2");
        title.textContent = comic.title;
        title.className = "text-3xl font-bold mb-4";

        const description = document.createElement("p");
        description.textContent = comic.description || "Description not available.";
        description.className = "text-gray-700 mb-4";

        const price = document.createElement("p");
        const comicPrice = comic.prices[0]?.price ?? "N/A";
        price.textContent = `Price: $${comicPrice}`;
        price.className = "text-lg font-bold text-gray-800 mb-6";

        const pageCount = document.createElement("p");
        pageCount.textContent = `Page Count: ${comic.pageCount}`;
        pageCount.className = "text-md text-gray-600 mb-4";

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.className = "bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition";

        // Append elements to the details container
        comicDetailsContainer.appendChild(img);
        comicDetailsContainer.appendChild(title);
        comicDetailsContainer.appendChild(description);
        comicDetailsContainer.appendChild(price);
        comicDetailsContainer.appendChild(pageCount);
        comicDetailsContainer.appendChild(addToCartButton);

    } catch (error) {
        console.error("Error fetching comic details:", error);
        comicDetailsContainer.innerHTML = "<p class='text-red-500'>Failed to load comic details. Please try again later.</p>";
    }
}

// Call the function to fetch and display comic details
fetchComicDetails();
