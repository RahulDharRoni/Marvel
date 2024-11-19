const posts = [
  {
    category: "Comics",
    title: "Marvel Reveals 2025 Free Comic Book Day Titles",
    time: "8 hours ago",
    image: "https://via.placeholder.com/150",
  },
  {
    category: "Comics",
    title: "Doctor Doom Imposes His Will on the Fantastic Four",
    time: "10 hours ago",
    image: "https://via.placeholder.com/150",
  },
];

const postContainer = document.querySelector("#postContainer");
posts.forEach((post) => {
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
