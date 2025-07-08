const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Hide/show hamburger icon on scrolling inside nav 
let lastScrollTop = 0;
nav.addEventListener('scroll', () => {
  const currentScroll = nav.scrollTop;
  if (currentScroll > lastScrollTop) {
    hamburger.style.opacity = "0";
    hamburger.style.pointerEvents = "none";
  } else {
    hamburger.style.opacity = "1";
    hamburger.style.pointerEvents = "auto";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

const heroBanner = document.querySelector('.heroBanner');
const bars = document.querySelectorAll('.bar');

bars.forEach(bar => {
  bar.addEventListener('click', () => {
    bars.forEach(b => b.classList.remove('active'));
    bar.classList.add('active');
    const slideNumber = bar.dataset.slide;
    heroBanner.className = `heroBanner hero-slide-${slideNumber}`;
  });
});

// Auto-rotate hero banner every 5 seconds
let current = 0;
setInterval(() => {
  current = (current + 1) % bars.length;
  bars[current].click();
}, 5000);

// Testimonial Carousel
const testimonialQuote = document.querySelector('.testimonial-quote .quote');
const testimonialAuthor = document.querySelector('.testimonial-quote .author');
const testimonialImage = document.querySelector('.testimonial-image img');

const testimonials = [
  {
    quote: "The energy I started to have was unbelievable.",
    author: "— Stephanie S.",
    image: "photos/author1.png"
  },
  {
    quote: "Almased changed my whole life completely!",
    author: "— Michael B.",
    image: "photos/author2.png"
  }
];

let testimonialIndex = 0;

function updateTestimonial(index) {
  testimonialQuote.textContent = `“${testimonials[index].quote}”`;
  testimonialAuthor.textContent = testimonials[index].author;
  testimonialImage.src = testimonials[index].image;
}

document.querySelector('.testimonial-arrows .arrow-btn:first-child').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial(testimonialIndex);
});

document.querySelector('.testimonial-arrows .arrow-btn:last-child').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  updateTestimonial(testimonialIndex);
});

updateTestimonial(testimonialIndex);

// Benefit Bars carousel
const benefitBars = document.querySelectorAll('.benefit-Bars .Bar');
const slider = document.getElementById('benefits-slider');
const cardWidth = 400;
const totalCards = benefitBars.length;
let currentIndex = 0;

function scrollSlider(index) {
  if (index < 0) {
    currentIndex = totalCards - 1;
  } else if (index >= totalCards) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  benefitBars.forEach(Bar => Bar.classList.remove('active'));
  benefitBars[currentIndex].classList.add('active');
}

function slideBy(direction) {
  scrollSlider(currentIndex + direction);
}

benefitBars.forEach((Bar, index) => {
  Bar.addEventListener('click', () => {
    scrollSlider(index);
  });
});

document.querySelectorAll('.arrow-outline')[0].addEventListener('click', () => slideBy(-1));
document.querySelectorAll('.arrow-outline')[1].addEventListener('click', () => slideBy(1));

scrollSlider(0);

// Quote Section Carousel
let quoteIndex = 0;

const quoteText = document.getElementById('quote-text');
const doctorImg = document.getElementById('quote-doctor');
const doctorLeft = document.getElementById('doctor-left');
const doctorRight = document.getElementById('doctor-right');
const signature = document.getElementById('quote-signature');

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

function changeQuote(direction) {
  quoteIndex = (quoteIndex + direction + quotes.length) % quotes.length;
  const quote = quotes[quoteIndex];

  quoteText.textContent = quote.text;
  doctorImg.src = quote.doctorImg;
  signature.src = quote.signatureImg;
  doctorLeft.textContent = quote.left;
  doctorRight.textContent = quote.right;

  doctorLeft.classList.remove("active-author");
  doctorRight.classList.remove("active-author");

  if (quote.left === "Dr Eric J Rosenbaum") {
    doctorLeft.classList.add("active-author");
  } else if (quote.left === "Dr Aloys"){
    doctorRight.classList.add("active-author");
  }
}

changeQuote(0);
