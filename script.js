// DOM Elements
const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const hamburger = document.querySelector(".hamburger");
const sections = document.querySelectorAll(".section");
const contactForm = document.getElementById("contactForm");

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Handle navigation between sections
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all links and sections
    navLinks.forEach((l) => l.classList.remove("active"));
    sections.forEach((s) => s.classList.remove("active"));

    // Add active class to clicked link
    link.classList.add("active");

    // Show the corresponding section
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
      window.scrollTo(0, 0);
    }
  });
});

// Scroll animations
window.addEventListener("scroll", () => {
  // Add shadow to navbar on scroll
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".activity-card, .org-card, .division-card, .news-card, .gallery-item",
  );

  animateElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    // If element is in viewport
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
});

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Set initial state for animated elements
  const animateElements = document.querySelectorAll(
    ".activity-card, .org-card, .division-card, .news-card, .gallery-item",
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Trigger initial scroll check
  window.dispatchEvent(new Event("scroll"));

  // Show home section by default
  document.getElementById("beranda").classList.add("active");
  document.querySelector('a[href="#beranda"]').classList.add("active");
});

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would normally send the form data to a server
  // For this demo, we'll just show a success message
  alert(
    `Terima kasih ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda melalui ${email}.`,
  );

  // Reset form
  contactForm.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // For single page navigation, we're already handling this above
      // This is just a fallback in case there are other anchor links
      if (!this.classList.contains("nav-link")) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});

// Add parallax effect to hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBg = document.querySelector(".hero-bg");

  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="close-lightbox">&times;</span>
        <img src="" alt="">
        <div class="lightbox-caption">
            <h3></h3>
            <p></p>
        </div>
    </div>
`;

// Add lightbox styles
const style = document.createElement("style");
style.textContent = `
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        justify-content: center;
        align-items: center;
    }
    
    .lightbox.active {
        display: flex;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
    
    .lightbox-caption {
        background-color: white;
        padding: 15px;
        border-radius: 0 0 5px 5px;
    }
    
    .lightbox-caption h3 {
        margin: 0 0 5px;
        color: #0A2A66;
    }
    
    .lightbox-caption p {
        margin: 0;
        color: #555;
    }
`;

document.head.appendChild(style);
document.body.appendChild(lightbox);

// Add click event to gallery items
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const title = item.querySelector("h3").textContent;
    const description = item.querySelector("p").textContent;

    lightbox.querySelector("img").src = img.src;
    lightbox.querySelector("h3").textContent = title;
    lightbox.querySelector("p").textContent = description;

    lightbox.classList.add("active");
  });
});

// Close lightbox
lightbox.querySelector(".close-lightbox").addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});
