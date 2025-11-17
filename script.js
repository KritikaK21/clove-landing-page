// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
  });
}

// Header Hide on Scroll Down, Show on Scroll Up
let lastScrollTop = 0;
const header = document.getElementById('header');
const fixedCta = document.getElementById('fixedCta');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.classList.add('hidden');
  } else {
    // Scrolling up
    header.classList.remove('hidden');
  }
  
  // Show/hide fixed CTA based on scroll position
  if (scrollTop > 500) {
    fixedCta.classList.remove('hidden');
  } else {
    fixedCta.classList.add('hidden');
  }
  
  lastScrollTop = scrollTop;
});

// Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      accordionItem.classList.add('active');
    }
  });
});

// Testimonials Slider
let currentSlide = 0;
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');

function slideTestimonials(direction) {
  const cardWidth = testimonialCards[0].offsetWidth + 20; // card width + gap
  const maxScroll = testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth;
  
  currentSlide += direction;
  
  // Calculate scroll position
  let scrollPosition = currentSlide * cardWidth;
  
  // Boundary checks
  if (scrollPosition < 0) {
    scrollPosition = 0;
    currentSlide = 0;
  } else if (scrollPosition > maxScroll) {
    scrollPosition = maxScroll;
    currentSlide = Math.floor(maxScroll / cardWidth);
  }
  
  testimonialsTrack.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = header.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });
  }
}

// Form Submission Handler
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  
  // Show success message
  alert('Thank you for your interest! We will contact you shortly.');
  
  // Reset form
  event.target.reset();
  
  return false;
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.service-card, .testimonial-card, .accordion-item').forEach(el => {
  observer.observe(el);
});

// Pause ticker animation on hover
const tickerContent = document.querySelector('.ticker-content');
if (tickerContent) {
  tickerContent.addEventListener('mouseenter', () => {
    tickerContent.style.animationPlayState = 'paused';
  });
  
  tickerContent.addEventListener('mouseleave', () => {
    tickerContent.style.animationPlayState = 'running';
  });
}

// Touch swipe for testimonials on mobile
let touchStartX = 0;
let touchEndX = 0;

testimonialsTrack.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

testimonialsTrack.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    slideTestimonials(1);
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right
    slideTestimonials(-1);
  }
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

console.log('Clove Dental Landing Page Loaded Successfully!');
