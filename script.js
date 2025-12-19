const accessKey = "XH2MCClHM7aMhxmZrcn6C2G6YiTUQyj_F-bVat7NS2I";

const formEl = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) searchResults.innerHTML = "";

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        // Image
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description || "Unsplash Image";

        // Unsplash link
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description || "View Image";

        // Download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = result.links.download + "?force=true";
        downloadBtn.download = "image.jpg";
        downloadBtn.textContent = "Download";
        downloadBtn.classList.add("download-btn");

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(downloadBtn);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) showMore.style.display = "block";
}

// Event listeners
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
