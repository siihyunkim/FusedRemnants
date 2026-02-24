const bg1 = document.getElementById('bg1');
const person1 = document.getElementById('person1');
const person2 = document.getElementById('person2');
const bg2 = document.getElementById('bg2');
const spacer1 = document.getElementById('spacer1');
const spacer2 = document.getElementById('spacer2');

function update() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  // 1. Scroll < vh: show bg1 + person1
  if (scrollY < vh) {
    bg1.style.opacity = 1;
    bg1.style.transform = `translateY(${-scrollY}px)`;
    person1.style.opacity = 1;
    person1.classList.remove('trace','hide');
    person1.style.filter = '';
    person2.style.opacity = 0;
    person2.classList.remove('trace','hide');
    person2.style.filter = '';

    bg2.style.position = 'absolute';
    bg2.style.top = 'auto';
    bg2.style.bottom = '0';
    bg2.style.opacity = 0;
  } 
  // 2. vh <= scrollY < 2*vh: spacer1 + person2 rises, person1 visible
  else if (scrollY < vh * 2) {
    bg1.style.opacity = 0;
    bg1.style.transform = `translateY(${-vh}px)`;
    person1.style.opacity = 1;
    person1.classList.remove('trace','hide');
    person1.style.filter = '';

    const progress = (scrollY - vh) / vh;
    person2.style.opacity = progress;
    person2.style.transform = `translateY(${(1 - progress) * 100}vh)`;
    person2.classList.remove('trace','hide');
    person2.style.filter = '';

    bg2.style.position = 'absolute';
    bg2.style.top = 'auto';
    bg2.style.bottom = '0';
    bg2.style.opacity = 0;
  }
  // 3. 2*vh <= scrollY < 3*vh: bg2 fixed, person1 fades away, person2 hidden
  else if (scrollY >= vh * 2 && scrollY < vh * 3) {
    bg1.style.opacity = 0;
    bg1.style.transform = `translateY(${-vh}px)`;

    // Fix bg2 to viewport
    bg2.style.position = 'fixed';
    bg2.style.top = '0';
    bg2.style.bottom = 'auto';
    bg2.style.width = '100vw';
    bg2.style.height = '100vh';
    bg2.style.opacity = 1;

    // Fade out person1 gradually during this scroll range
    const fadeProgress = (scrollY - vh * 2) / vh;
    const newOpacity = Math.max(0, 1 - fadeProgress);
    person1.style.opacity = newOpacity;
    if (newOpacity === 0) {
      person1.classList.add('hide');
    } else {
      person1.classList.remove('hide');
    }
    person1.classList.remove('trace');
    person1.style.filter = '';

    // Hide person2 in this range
    person2.style.opacity = 0;
    person2.classList.add('hide');
    person2.style.transform = '';
    person2.style.filter = '';

  }
  // 4. scrollY >= 3*vh: bg2 returns to absolute at bottom, person2 appears at end
  else {
    bg1.style.opacity = 0;
    bg1.style.transform = `translateY(${-vh}px)`;

    // bg2 positioned absolutely at bottom of container
    bg2.style.position = 'absolute';
    bg2.style.top = 'auto';
    bg2.style.bottom = '0';
    bg2.style.width = '100vw';
    bg2.style.height = '100vh';
    bg2.style.opacity = 1;

    person1.style.opacity = 0;
    person1.classList.add('hide');

    // person2 at very end of page, fully visible and fixed or absolute?
    // Since your layout ends with person2 at the end, keep it fixed or absolute?  
    // I will set absolute to follow natural scroll at bottom
    person2.style.opacity = 1;
    person2.style.position = 'absolute';
    person2.style.top = 'auto';
    person2.style.bottom = '0';
    person2.style.width = '100vw';
    person2.style.height = '100vh';
    person2.classList.remove('hide','trace');
    person2.style.filter = '';
    person2.style.transform = 'translateY(0)';
  }
}

window.addEventListener('scroll', update);
window.addEventListener('resize', update);
window.addEventListener('DOMContentLoaded', update);
