document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  AOS.init({
    duration: 800,
    once: true,
    offset: 80
  });

  const attractionsGlide = document.querySelector(".attractions-glide");

  if (attractionsGlide) {
    new Glide(attractionsGlide, {
      type: "carousel",
      perView: 3,
      gap: 20,
      autoplay: 3200,
      hoverpause: true,
      animationDuration: 700,
      breakpoints: {
        1024: {
          perView: 2
        },
        767: {
          perView: 1
        }
      }
    }).mount();
  }

  lightbox.option({
    resizeDuration: 250,
    fadeDuration: 250,
    imageFadeDuration: 250,
    wrapAround: true,
    disableScrolling: true,
    showImageNumberLabel: true
  });

  const map = L.map("map", {
    scrollWheelZoom: false
  }).setView([51.4968, -115.9281], 10);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const stops = [
    {
      title: "Banff Town",
      coords: [51.1784, -115.5708],
      description: "A good base for restaurants, shopping, and easy access to nearby viewpoints."
    },
    {
      title: "Banff Gondola",
      coords: [51.1429, -115.5705],
      description: "Ride up Sulphur Mountain for panoramic views over the valley."
    },
    {
      title: "Lake Louise",
      coords: [51.4254, -116.1773],
      description: "One of the most iconic alpine lakes in Canada."
    },
    {
      title: "Moraine Lake",
      coords: [51.3215, -116.186],
      description: "A dramatic lake and mountain viewpoint in the Valley of the Ten Peaks."
    },
    {
      title: "Johnston Canyon",
      coords: [51.2447, -115.8398],
      description: "A scenic walk featuring waterfalls, canyon walls, and suspended pathways."
    }
  ];

  const bounds = [];

  stops.forEach((stop) => {
    L.marker(stop.coords)
      .addTo(map)
      .bindPopup(`<strong>${stop.title}</strong><br>${stop.description}`);

    bounds.push(stop.coords);
  });

  if (bounds.length) {
    map.fitBounds(bounds, {
      padding: [30, 30]
    });
  }

  window.addEventListener("resize", () => {
    map.invalidateSize();
  });
});
