import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight / 5 * 4) &&
    rect.bottom >= 0
  );
}

export function checkSections() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    if (isElementInViewport(section)) {
      section.classList.add('visible');
    }
  });
}
