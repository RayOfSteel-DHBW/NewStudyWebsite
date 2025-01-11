class PageNavigator {
  constructor() {
    this.hiddenSections = document.querySelectorAll('.content-section.hidden');
    this.scrollButtons = document.querySelectorAll('.scroll-button');
    this.initIntersectionObserver();
    this.initScrollButtons();
  }

  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1, // Adjust if you want earlier/later reveals
    };

    this.observer = new IntersectionObserver(this.revealSection.bind(this), observerOptions);

    this.hiddenSections.forEach(section => {
      this.observer.observe(section);
    });
  }

  revealSection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the .visible class, removing .hidden
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
        // Once visible, unobserve so it doesn’t animate again on scroll
        observer.unobserve(entry.target);
      }
    });
  }

  initScrollButtons() {
    const sections = Array.from(document.querySelectorAll('.content-section'));
    const headerHeight = document.querySelector('nav').offsetHeight; // Dynamically get header height

    this.scrollButtons.forEach((button, index) => {
      if (index < sections.length - 1) {
        button.addEventListener('click', () => {
          const nextSection = sections[index + 1];
          const sectionTop = nextSection.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: sectionTop - headerHeight, // Offset by header height
            behavior: 'smooth',
          });
        });
      } else {
        // Hide the button in the last section
        button.style.display = 'none';
      }
    });
  }
}

// Initialize the PageNavigator class when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new PageNavigator();
});
