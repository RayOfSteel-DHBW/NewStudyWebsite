document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded fired!");

  const sections = Array.from(document.querySelectorAll('.snap-section'));
  let currentIndex = 0;        // Which section is currently visible
  let isSnapping = false;      // Are we currently snapping?

  /**
   * Helper to snap to a given section index.
   */
  function snapToIndex(index) {
    if (index < 0 || index >= sections.length) {
      console.log(`Invalid snap index ${index}, ignoring.`);
      return;
    }
    if (isSnapping) {
      console.log("Already snapping, ignoring new snap request.");
      return;
    }
    isSnapping = true;

    // Snap via scrollIntoView or scrollTo...
    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // After the snap animation, release the lock
    setTimeout(() => {
      currentIndex = index;
      isSnapping = false;
      console.log(`Snapped to index ${currentIndex}.`);
    }, 800); // match the smooth scrolling duration
  }

  /**
   * Move to next or previous section based on wheel delta.
   */
  function onWheel(e) {
    // Prevent the default browser scroll
    e.preventDefault();

    if (isSnapping) {
      // If we’re in the middle of a snap, ignore new wheel events
      console.log("Wheel ignored: already snapping.");
      return;
    }

    const delta = e.deltaY;
    if (delta > 0) {
      // Wheel down => next section
      if (currentIndex < sections.length - 1) {
        snapToIndex(currentIndex + 1);
      } else {
        console.log("At the last section, can’t scroll further down.");
      }
    } else if (delta < 0) {
      // Wheel up => previous section
      if (currentIndex > 0) {
        snapToIndex(currentIndex - 1);
      } else {
        console.log("At the first section, can’t scroll further up.");
      }
    } else {
      console.log("No vertical scroll delta.");
    }
  }

  /**
   * Optional: Handle arrow key or touch if you want
   * But for now, we skip that to keep it super simple.
   */

  // Listen for wheel events with { passive: false } to allow preventDefault
  document.addEventListener('wheel', onWheel, { passive: false });

  // If you have "Next" buttons, do something like:
  const nextButtons = document.querySelectorAll('.scroll-button');
  nextButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      // Example: each scroll-button might snap to the next index
      snapToIndex(currentIndex + 1);
    });
  });

  // Initialize by snapping to the first section if you want
  snapToIndex(0);
});
