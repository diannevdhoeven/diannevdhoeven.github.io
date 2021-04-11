const observers = [];
const $sticker = document.querySelector('[data-sticker]');
let isExpanded = false;

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: new Array(50).fill(0).map((val, i) => i / 50) };


function anim($box, $sticker) {
  const stickerRect = $sticker.getBoundingClientRect();
  const boxRect = $box.getBoundingClientRect();

  const $mask = $box.querySelector('.mask');
  $mask.style.opacity = 1;
  $mask.style.transition = 'none';
  $mask.style.transform = `translateX(${stickerRect.x - boxRect.x}px) translateY(${stickerRect.y - boxRect.y}px) scaleX(${stickerRect.width / boxRect.width}) scaleY(${stickerRect.height / boxRect.height})`;

  setTimeout(() => {
    $mask.style.transition = `transform 200ms cubic-bezier(.7,.3,0,1)`;
    setTimeout(() => {
      $mask.style.transform = `none`;
    }, 50);
  }, 50);
}

let timer;

function intersectionCallback(entries) {
  entries.forEach(function (entry) {
    let $box = entry.target;
    let visiblePct = Math.floor(entry.intersectionRatio * 100) + "%";

    //$box.innerHTML = `<h1>${visiblePct}</h1>`;

    clearTimeout(timer);


    if (entry.intersectionRatio > .95 && !isExpanded) {
      $sticker.classList.add('expand');
      $box.classList.add('expand');
      isExpanded = true;
      anim($box, $sticker);
    } else if (entry.intersectionRatio < .95 && isExpanded) {
      $sticker.classList.remove('expand');
      $box.classList.remove('expand');
      isExpanded = false;
      anim($sticker, $box);
    }

  });
}

const $targets = Array.from(document.querySelectorAll('[data-stick]'));


$targets.forEach(($el, i) => {

  const $anim = document.createElement('div');
  $anim.classList.add('mask');
  $el.appendChild($anim);

  observers[i] = new IntersectionObserver(intersectionCallback, observerOptions);
  observers[i].observe($el);
});