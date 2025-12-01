// นับถอยหลังด้วย JavaScript
// 👉 ตั้งวัน-เวลาเป้าหมายที่นี่ (ปี-เดือน-วันTชั่วโมง:นาที:วินาที)
const targetDate = new Date("2026-01-17T23:59:59").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const doneText = document.getElementById("done-text");

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // ถ้าครบกำหนดเวลาแล้ว
    if (distance <= 0) {
        clearInterval(timer);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        doneText.textContent = "The wedding begins now!";
        return;
    }

    // คำนวณ วัน ชั่วโมง นาที วินาที
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // ใส่ค่าในหน้าจอ (ถ้าตัวเลขน้อยกว่า 10 ให้ขึ้น 0 ข้างหน้า)
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}, 1000);

// Photo Gallery
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.add("show");
}

function closeLightbox() {
    lightbox.classList.remove("show");
    lightboxImg.src = "";
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openLightbox(currentIndex);
}

function showPrev() {
    currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentIndex);
}

// เมื่อคลิกที่รูปใน gallery
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

// ปิดเมื่อคลิกปุ่ม X
lightboxClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
});

// ปุ่มก่อนหน้า/ถัดไป
lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
});

lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
});

// ปิดเมื่อคลิกพื้นที่มืดด้านหลัง
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ปิด/เลื่อนด้วยคีย์บอร์ด
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === "ArrowRight") {
        showNext();
    } else if (e.key === "ArrowLeft") {
        showPrev();
    }
});

// ----- Load more images -----
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const loadMoreBtn = document.getElementById("loadMoreBtn");

const batchSize = 15;      // จำนวนรูปต่อรอบ
let currentVisible = 0;     // ตอนเริ่มยังไม่ได้นับ

function updateGalleryVisibility() {
    galleryItems.forEach((item, index) => {
        if (index < currentVisible) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });

    // ถ้าแสดงครบทุกภาพแล้ว -> ซ่อนปุ่ม
    if (currentVisible >= galleryItems.length && loadMoreBtn) {
        loadMoreBtn.style.display = "none";
    }
}

// แสดงรูปชุดแรกตอนโหลดหน้า
currentVisible = batchSize;
updateGalleryVisibility();

// เมื่อกดปุ่ม Load more -> เพิ่มจำนวนที่ให้เห็นทีละ 15
if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
        currentVisible += batchSize;
        updateGalleryVisibility();
    });
}
