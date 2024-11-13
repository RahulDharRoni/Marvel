const apiUrl2 = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a867efefb807efec7a199e02868abba2&hash=05087ec959c2b33ae7e56d7b05c97c5f";


// Reference to the slider container
const characterSlider = document.getElementById("character-slider");

async function fetchCharacters() {
    try {
        const response = await fetch(apiUrl2);
        const data = await response.json();
        const comics = data.data.results;

         // Check if we have characters data
        if (!data || !data.data || !data.data.results || data.data.results.length === 0) {
            characterSlider.innerHTML = "<p class='text-red-500'>Characters not found.</p>";
            return;
        }

         // Split characters into groups of 5
         const characters = data.data.results;
         const groupedCharacters = [];
         
         // Create an array of arrays where each array contains 5 characters
         for (let i = 0; i < characters.length; i += 5) {
             groupedCharacters.push(characters.slice(i, i + 5));
         }
 
         // Loop through the groups and create a slide for each
        groupedCharacters.forEach(group => {
            const slide = document.createElement("div");
            slide.className = "swiper-slide flex justify-around p-4"; // Flex layout with space between items

            group.forEach(character => {
                const characterContainer = document.createElement("div");
                characterContainer.className = "flex flex-col items-center"; // Each character inside a container

                const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                const img = document.createElement("img");
                img.src = imgUrl;
                img.alt = character.name;
                img.className = "w-32 h-32 object-cover rounded-full mb-4";

                const name = document.createElement("h3");
                name.textContent = character.name;
                name.className = "text-lg font-semibold text-center";

                characterContainer.appendChild(img);
                characterContainer.appendChild(name);
                slide.appendChild(characterContainer);
            });

            characterSlider.appendChild(slide);
        });

        // Initialize Swiper
        new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            spaceBetween: 10,  // Space between slides
            slidesPerView: 1,  // Default to 1 slide per view on small screens
            breakpoints: {
                640: {
                    slidesPerView: 2,  // 2 slides on medium screens
                },
                768: {
                    slidesPerView: 3,  // 3 slides on larger screens
                },
                1024: {
                    slidesPerView: 4,  // 4 slides on extra-large screens
                },
                1280: {
                    slidesPerView: 1,  // 1 slide at a time, with 5 characters inside (on larger screens)
                }
            }
        });
 

    } catch (error) {
        console.error("Error fetching characters:", error);
        characterSlider.innerHTML = "<p class='text-red-500'>Failed to load characters. Please try again later.</p>";
    }
}

// Fetch characters when the page is loaded
fetchCharacters();
