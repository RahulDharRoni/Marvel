const apiUrl = "http://gateway.marvel.com/v1/public/comics";
const apiKey = "a867efefb807efec7a199e02868abba2";
const hash = "05087ec959c2b33ae7e56d7b05c97c5f";

// Get comic ID from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const comicId = urlParams.get("id");

const comicDetailsContainer = document.getElementById("comic-details");

async function fetchComicDetails() {
  if (!comicId) {
    comicDetailsContainer.innerHTML =
      "<p class='text-red-500'>Invalid comic ID.</p>";
    return;
  }

  try {
    const response = await fetch(
      `${apiUrl}/${comicId}?ts=1&apikey=${apiKey}&hash=${hash}`
    );
    const data = await response.json();

    // Check if data exists
    if (
      !data ||
      !data.data ||
      !data.data.results ||
      data.data.results.length === 0
    ) {
      comicDetailsContainer.innerHTML =
        "<p class='text-red-500'>Comic not found.</p>";
      return;
    }

    const comic = data.data.results[0];

    // Create comic detail elements
    const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    const img = document.createElement("img");
    img.src = thumbnail;
    img.alt = comic.title;
    img.className =
      "w-80 h-auto object-cover rounded-lg shadow-lg border-4 border-gray-700";

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "flex flex-col text-left gap-4";

    const title = document.createElement("h2");
    title.textContent = comic.title;
    title.className = "text-4xl font-bold text-red-400";

    const description = document.createElement("p");
    description.textContent = comic.description || "Description not available.";
    description.className = "text-gray-300 text-lg";

    const price = document.createElement("p");
    const comicPrice = comic.prices[0]?.price ?? "N/A";
    price.textContent = `Price: $${comicPrice}`;
    price.className = "text-xl font-semibold text-white";

    const pageCount = document.createElement("p");
    pageCount.textContent = `Page Count: ${comic.pageCount}`;
    pageCount.className = "text-md text-gray-400";

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className =
      "bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition";

    // Append elements to the details container
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(description);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(pageCount);
    detailsDiv.appendChild(addToCartButton);

    comicDetailsContainer.appendChild(img);
    comicDetailsContainer.appendChild(detailsDiv);
  } catch (error) {
    console.error("Error fetching comic details:", error);
    comicDetailsContainer.innerHTML =
      "<p class='text-red-500'>Failed to load comic details. Please try again later.</p>";
  }
}

// Call the function to fetch and display comic details
fetchComicDetails();
