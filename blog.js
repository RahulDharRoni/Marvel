// JavaScript to dynamically inject posts
const posts = [
  {
    category: "Comics",
    title: "Marvel Reveals 2025 Free Comic Book Day Titles",
    time: "8 hours ago",
    image: "./Images/one.jpg",
  },
  {
    category: "Comics",
    title: "Doctor Doom Imposes His Will on the Fantastic Four",
    time: "10 hours ago",
    image: "./Images/two.jpg",
  },
  {
    category: "Movies",
    title: "Spider-Man: Across the Spider-Verse Wins Best Animated Film",
    time: "12 hours ago",
    image: "./Images/three.jpg",
  },
  {
    category: "TV Shows",
    title: "Disney+ Announces New Daredevil Series",
    time: "1 day ago",
    image: "./Images/four.jpg",
  },
  {
    category: "Comics",
    title: "Batman and Joker Team Up in a Shocking New DC Comic",
    time: "3 days ago",
    image: "./Images/five.jpg",
  },
  {
    category: "Gaming",
    title: "Marvel's Spider-Man 2 Breaks Sales Records",
    time: "5 days ago",
    image: "./Images/six.jpg",
  },
  {
    category: "Movies",
    title: "Deadpool 3 Teaser Trailer Released",
    time: "6 days ago",
    image: "./Images/seven.jpg",
  },
  {
    category: "Comics",
    title: "X-Men Face Off Against Magneto in an Epic New Issue",
    time: "1 week ago",
    image: "./Images/eight.jpg",
  },
  {
    category: "Books",
    title: "The Art of Marvel's Avengers Now Available",
    time: "2 weeks ago",
    image: "./Images/nine.jpg",
  },
  {
    category: "Movies",
    title: "Thor 5 Rumored to Be in Development",
    time: "3 weeks ago",
    image: "./Images/ten.jpg",
  },
];

const postContainer = document.querySelector("#postContainer");
const loadMoreBtn = document.querySelector("#loadMoreBtn");

let currentPostIndex = 0; // Keeps track of how many posts are displayed
const postsPerPage = 4; // Number of posts to display per "Load More"

// Function to load and display posts
const loadPosts = () => {
  const postsToShow = posts.slice(
    currentPostIndex,
    currentPostIndex + postsPerPage
  );
  postsToShow.forEach((post) => {
    const postHTML = `
        <article class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 border-b pb-6">
          <img class="w-full md:w-48 h-32 object-cover rounded" src="${post.image}" alt="Post Image">
          <div>
            <p class="text-sm text-red-500 font-semibold uppercase">${post.category}</p>
            <h3 class="text-lg font-bold text-gray-800 hover:text-red-500 cursor-pointer">
              ${post.title}
            </h3>
            <p class="text-sm text-gray-500">${post.time}</p>
          </div>
        </article>
      `;
    postContainer.innerHTML += postHTML;
  });
  currentPostIndex += postsPerPage;

  // Hide Load More button if all posts are loaded
  if (currentPostIndex >= posts.length) {
    loadMoreBtn.style.display = "none";
  }
};

// Initial Load
loadPosts();

// Event Listener for Load More Button
loadMoreBtn.addEventListener("click", loadPosts);
