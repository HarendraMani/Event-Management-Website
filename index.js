let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

// Toggle menu and navbar visibility
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

// Close the navbar when a menu item is clicked
let menuItems = document.querySelectorAll(".navbar a");
menuItems.forEach(item => {
  item.onclick = () => {
    menu.classList.remove("fa-times"); // Reset menu icon
    navbar.classList.remove("active"); // Close navbar
  };
});
//theme color part
let themeToggler = document.querySelector(".theme-toggler");
let toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.onclick = () => {
  themeToggler.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  themeToggler.classList.remove("active");

  scrollFunction();
};

document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
  btn.onclick = () => {
    let color = btn.style.background;
    document.querySelector(":root").style.setProperty("--theme-color", color);
    themeToggler.classList.remove("active");
  };
});

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".review-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

//gototop button
let goTopBtn = document.getElementById("goTopBtn");

// Ensure event listeners are correctly added
window.addEventListener("scroll", scrollFunction);

goTopBtn.addEventListener("click", topFunction);

function scrollFunction() {
  // Log to debug scroll position
  console.log("Scroll position:", document.documentElement.scrollTop || document.body.scrollTop);

  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
    goTopBtn.style.display = "block";
  } else {
    goTopBtn.style.display = "none";
  }
}

function topFunction() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(topFunction);
    window.scrollTo(0, currentScroll - currentScroll / 0);
  }
}


// Login button
document.getElementById('loginBtn').addEventListener('click', function () {
  window.location.href = "Login-&-Registration/login.html";
});


// Function to change the theme color
function changeThemeColor(newColor) {
  document.documentElement.style.setProperty('--theme-color', newColor);
}

//Change theme color when a theme button is clicked
document.querySelectorAll('.theme-btn').forEach(button => {
  button.addEventListener('click', function () {
    const newColor = this.style.backgroundColor;  // Get the background color of the clicked theme button
    changeThemeColor(newColor);  // Update the theme color
  });
});

//feedback star part 
const stars = document.querySelectorAll('.star');
const feedbackResult = document.getElementById('feedback-result');
let rating = 0;

// Highlight stars on hover
stars.forEach(star => {
  star.addEventListener('mouseover', function () {
    const value = this.getAttribute('data-value');
    highlightStars(value);
  });

  // Remove highlight when mouse leaves the star
  star.addEventListener('mouseleave', function () {
    highlightStars(rating);
  });

  // Set rating when star is clicked
  star.addEventListener('click', function () {
    rating = this.getAttribute('data-value');
    feedbackResult.textContent = `Your rating: ${rating} star${rating > 1 ? 's' : ''}`;
    highlightStars(rating);
  });
});

// Function to highlight stars based on rating
function highlightStars(value) {
  stars.forEach(star => {
    if (star.getAttribute('data-value') <= value) {
      star.classList.add('highlighted');
    } else {
      star.classList.remove('highlighted');
    }
  });
}

function openModal(imageSrc) {
  // Show the modal with the clicked image
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = imageSrc;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

//gallery
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const images = document.querySelectorAll(".gallery .box-container .box img");
  const closeModal = () => modal.style.display = "none";

  images.forEach(img => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });

  modal.addEventListener("click", closeModal);
  modalImg.addEventListener("click", closeModal); // Clicking the image closes the modal
});



//price in upi
document.addEventListener("DOMContentLoaded", function () {
  const upiId = "tripathiharendra05@oksbi"; // Replace with your actual UPI ID
  const qrModal = document.getElementById("qrModal");
  const closeModal = document.querySelector(".close");

  document.querySelectorAll(".checkout-btn").forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      let amount = this.getAttribute("data-amount");

      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        //Mobile
        let upiLink = `upi://pay?pa=${upiId}&pn=Event%20Management&mc=&tid=&tr=&tn=Event%20Booking&am=${amount}&cu=INR`;
        window.location.href = upiLink;
      } else {
        //Desktop
        qrModal.style.display = "block";
      }
    });
  });

  // Close QR Modal
  closeModal.addEventListener("click", function () {
    qrModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == qrModal) {
      qrModal.style.display = "none";
    }
  });
})