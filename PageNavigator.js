class PageNavigator {
  constructor() {
    // Query all sections that are hidden initially
    this.hiddenSections = document.querySelectorAll('.content-section.hidden');
    // Query all buttons that should scroll to the next section
    this.scrollButtons = document.querySelectorAll('.scroll-button');

    this.initIntersectionObserver();
    this.initScrollButtons();
  }

  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1, // reveal once ~10% of the element is in view
    };

    this.observer = new IntersectionObserver(
      this.revealSection.bind(this),
      observerOptions
    );

    this.hiddenSections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  revealSection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add .visible, remove .hidden
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');

        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }

  initScrollButtons() {
    // Convert NodeList to array for easier indexing
    const sections = Array.from(document.querySelectorAll('.content-section'));
    const headerHeight = document.querySelector('nav').offsetHeight;

    this.scrollButtons.forEach((button, index) => {
      // If it's not the last button, scroll to the "next" section
      if (index < sections.length) {
        button.addEventListener('click', () => {
          // The "next" section is sections[index], if we line them up properly
          const nextSection = sections[index];
          // If you want the very first button to scroll to the first hidden section,
          // then index=0 => nextSection=sections[0] => #about
          if (nextSection) {
            const sectionTop = nextSection.getBoundingClientRect().top + window.scrollY;

            // If you want to shift the target slightly, e.g., 10px below nav, do:
            // const offset = headerHeight + 10;
            // or even: const offset = headerHeight - 20;
            const offset = headerHeight;

            window.scrollTo({
              top: sectionTop - offset,
              behavior: 'smooth',
            });
          }
        });
      } else {
        // Hide the button if it's the last
        button.style.display = 'none';
      }
    });
  }
}

// Initialize once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new PageNavigator();
});
