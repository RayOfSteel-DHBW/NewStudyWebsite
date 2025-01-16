document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('.scroll-button');
  const sections = Array.from(document.querySelectorAll('.snap-section'));

  scrollButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // If there's a next section, scroll there
      if (index < sections.length - 1) {
        sections[index + 1].scrollIntoView({
          behavior: 'smooth'
        });
      } else {
        // Last button => do something else (no more content)
        alert('No more sections to scroll!');
      }
    });
  });
});
