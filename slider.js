// Fetch and inject character images into Swiper slider
async function fetchCharacters() {
  const apiUrl2 =
    "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a867efefb807efec7a199e02868abba2&hash=05087ec959c2b33ae7e56d7b05c97c5f";
  const characterSlider = document.getElementById("character-slider");

  try {
    const response = await fetch(apiUrl2);
    const data = await response.json();
    const characters = data.data.results;

    characters.forEach((character) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = character.name;

      slide.appendChild(img);
      characterSlider.appendChild(slide);
    });

    // Initialize Swiper with autoplay and coverflow effect
    new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 3000, // Time in milliseconds before automatically changing slides
        disableOnInteraction: false, // Allow autoplay to continue after interaction
      },
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    characterSlider.innerHTML =
      "<p class='text-red-500'>Failed to load characters. Please try again later.</p>";
  }
}

// Fetch characters when the page is loaded
document.addEventListener("DOMContentLoaded", fetchCharacters);
