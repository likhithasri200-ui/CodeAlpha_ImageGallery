
const filterButtons = document.querySelectorAll(".filters button");
const galleryItems = document.querySelectorAll(".gallery-item");

// Gallery Filtering
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        galleryItems.forEach(item => {
            const category = item.dataset.category;

            item.style.display =
                selectedFilter === "all" || category === selectedFilter
                ? "block" : "none";
        });
    });
});

// Lightbox Elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentIndex = 0;

// Open Image
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        currentImages = [...document.querySelectorAll(".gallery-item")]
            .filter(item => item.style.display !== "none");

        currentIndex = currentImages.indexOf(item);
        showImage();
        lightbox.classList.add("show");
    });
});

function showImage() {
    const img = currentImages[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

// Next Image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
});

// Previous Image
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImages.length)
        % currentImages.length;
    showImage();
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

// Close when clicking outside image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

// Keyboard Controls
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        lightbox.classList.remove("show");
    }

    if (event.key === "ArrowRight") nextBtn.click();
    if (event.key === "ArrowLeft") prevBtn.click();
});

