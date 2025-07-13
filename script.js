// Toggle the mobile hamburger menu visibility
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open'); // Opens or closes the mobile nav
});

// Tabs logic: highlight the selected tab
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active')); // Remove active from all tabs
    tab.classList.add('active'); // Activate the clicked tab
  });
});

// Hide the hamburger icon while scrolling inside the nav (to avoid overlap)
let lastScrollTop = 0;
nav.addEventListener('scroll', () => {
  const currentScroll = nav.scrollTop;
  if (currentScroll > lastScrollTop) {
    // User is scrolling down
    hamburger.style.opacity = "0";
    hamburger.style.pointerEvents = "none";
  } else {
    // User is scrolling up
    hamburger.style.opacity = "1";
    hamburger.style.pointerEvents = "auto";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Hero banner switching logic (manual via dots + auto-rotation)
const heroBanner = document.querySelector('.heroBanner');
const bars = document.querySelectorAll('.bar');

bars.forEach(bar => {
  bar.addEventListener('click', () => {
    bars.forEach(b => b.classList.remove('active')); // Deactivate all bars
    bar.classList.add('active'); // Activate clicked bar
    const slideNumber = bar.dataset.slide; // Get the slide number
    heroBanner.className = `heroBanner hero-slide-${slideNumber}`; // Change class to update background
  });
});

// Auto-rotate the hero banner every 5 seconds
let current = 0;
setInterval(() => {
  current = (current + 1) % bars.length;
  bars[current].click(); // Simulate clicking the next bar
}, 5000);

// ------------------------
// Testimonial Carousel
// ------------------------

const testimonialQuote = document.querySelector('.testimonial-quote .quote');
const testimonialAuthor = document.querySelector('.testimonial-quote .author');
const testimonialImage = document.querySelector('.testimonial-image img');
const testimonialButton = document.querySelector('.story-btn');

// Array of testimonials
const testimonials = [
  {
    quote: "The energy I started to have was unbelievable.",
    author: "— Stephanie S.",
    image: "photos/author1.png",
    buttonText: "LEARN STEPHANIE'S STORY",
    buttonLink: "#stephanie-story"
  },
  {
    quote: "Almased changed my whole life completely!",
    author: "— Michael B.",
    image: "photos/author2.png",
    buttonText: "LEARN MICHAEL'S STORY",
    buttonLink: "#michael-story"
  }
];

let testimonialIndex = 0;

// Function to update testimonial content
function updateTestimonial(index) {
  testimonialQuote.textContent = `“${testimonials[index].quote}”`;
  testimonialAuthor.textContent = testimonials[index].author;
  testimonialImage.src = testimonials[index].image;
  testimonialButton.textContent = testimonials[index].buttonText;
  testimonialButton.href = testimonials[index].buttonLink;
}

// Left arrow: previous testimonial
document.querySelector('.testimonial-arrows .arrow-btn:first-child').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial(testimonialIndex);
});

// Right arrow: next testimonial
document.querySelector('.testimonial-arrows .arrow-btn:last-child').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  updateTestimonial(testimonialIndex);
});

updateTestimonial(testimonialIndex); // Load first testimonial

// ------------------------
// Benefits Slider Section
// ------------------------

const benefitBars = document.querySelectorAll('.benefit-Bars .Bar');
const slider = document.getElementById('benefits-slider');
const cardWidth = 400; // Fixed width per card
const totalCards = benefitBars.length;
let currentIndex = 0;

// Scrolls the benefit slider to the correct card
function scrollSlider(index) {
  if (index < 0) {
    currentIndex = totalCards - 1;
  } else if (index >= totalCards) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Move the slider and update the bar indicator
  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  benefitBars.forEach(Bar => Bar.classList.remove('active'));
  benefitBars[currentIndex].classList.add('active');
}

// Arrow button click handlers (left/right)
function slideBy(direction) {
  scrollSlider(currentIndex + direction);
}

// Click on a bar to jump to specific card
benefitBars.forEach((Bar, index) => {
  Bar.addEventListener('click', () => {
    scrollSlider(index);
  });
});

// Prev and Next arrows for benefits slider
document.querySelectorAll('.arrow-outline')[0].addEventListener('click', () => slideBy(-1));
document.querySelectorAll('.arrow-outline')[1].addEventListener('click', () => slideBy(1));

scrollSlider(0); // Show the first card on load

// ------------------------
// Quote Section Carousel (Doctors)
// ------------------------

let quoteIndex = 0;

const quoteText = document.getElementById('quote-text');
const doctorImg = document.getElementById('quote-doctor');
const doctorLeft = document.getElementById('doctor-left');
const doctorRight = document.getElementById('doctor-right');
const signature = document.getElementById('quote-signature');

// Array of doctor quotes (can be expanded)
const quotes = [
  {
    text: `"If you are on GLP-1s, it's important to supplement with Almased so you maintain muscle while still both losing weight and losing fat."`,
    doctorImg: "photos/doctor.png",
    signatureImg: "photos/signature.png",
    left: "Dr Eric J Rosenbaum",
    right: "Dr Aloys Berg"
  },
  {
    text: `"If you are on GLP-1s, it's important to supplement with Almased so you maintain muscle while still both losing weight and losing fat."`,
    doctorImg: "photos/doctor.png",
    signatureImg: "photos/signature.png",
    left: "Dr Aloys Berg",
    right: "Dr Eric J Rosenbaum"
  }
];

// Switches the quote and doctor display
function changeQuote(direction) {
  quoteIndex = (quoteIndex + direction + quotes.length) % quotes.length;
  const quote = quotes[quoteIndex];

  // Update DOM with new quote data
  quoteText.textContent = quote.text;
  doctorImg.src = quote.doctorImg;
  signature.src = quote.signatureImg;
  doctorLeft.textContent = quote.left;
  doctorRight.textContent = quote.right;

  // Update active author highlight
  doctorLeft.classList.remove("active-author");
  doctorRight.classList.remove("active-author");

  if (quote.left === "Dr Eric J Rosenbaum") {
    doctorLeft.classList.add("active-author");
  } else if (quote.left === "Dr Aloys") {
    doctorRight.classList.add("active-author");
  }
}

changeQuote(0); // Show the first quote on page load
