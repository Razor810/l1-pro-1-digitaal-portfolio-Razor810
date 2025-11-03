// --- dynamisch hero-beeld ---
// Een array van afbeeldingen voor de hero-sectie
const heroAfbeeldingen = [
  "https://cms.dierenbescherming.nl/assets/common/default/Afdelingen/Collecte/_882x1004_crop_center-center_none/Kelly-collectebus-885x1005_2025.png",
  "https://cms.dierenbescherming.nl/assets/common/default/Banners/_882x1004_crop_center-center_none/DB-EENDEN-885x1005.png"
];

// Kies willekeurig één afbeelding uit de array
const randomIndex = Math.floor(Math.random() * heroAfbeeldingen.length);

// Stel de src van het hero-beeld in op de gekozen afbeelding
document.querySelector(".hero-image img").src = heroAfbeeldingen[randomIndex];



// --- donatie logica ---
// Selecteer DOM-elementen die nodig zijn voor de donatie-stappen
const options = document.querySelectorAll('.option');       // Maandelijks / Eenmalig
const amounts = document.querySelectorAll('.amount');       // Donatiebedragen
const nextBtn = document.getElementById('nextBtn');         // Volgende stap knop
const previousBtn = document.getElementById('previousBtn'); // Vorige stap knop
const step1 = document.getElementById('step1');             // Stap 1 div
const step2 = document.getElementById('step2');             // Stap 2 div
const otherInput = document.getElementById('otherAmount');  // Input voor ander bedrag
const finalAmount = document.getElementById('finalAmount');// Final bedrag in formulier

// Variabelen om de huidige donatie-instellingen bij te houden
let donationType = 'maandelijks';
let donationAmount = 50;



// --- Kies type donatie (maandelijks / eenmalig) ---
options.forEach(opt => {
  opt.addEventListener('click', () => {
    // Verwijder actieve status van alle opties
    options.forEach(o => o.classList.remove('active'));
    // Voeg actieve status toe aan de geklikte optie
    opt.classList.add('active');
    // Update de donatie-type variabele
    donationType = opt.dataset.type;
  });
});



// --- Kies donatiebedrag ---
amounts.forEach(a => {
  a.addEventListener('click', () => {
    // Verwijder actieve status van alle bedragen
    amounts.forEach(x => x.classList.remove('active'));
    // Voeg actieve status toe aan het geselecteerde bedrag
    a.classList.add('active');

    if (a.dataset.value === 'ander') {
      // Als "Anders" is geselecteerd, toon inputveld voor eigen bedrag
      otherInput.classList.remove('hidden');
      otherInput.focus();
    } else {
      // Anders: verberg input en gebruik standaard waarde
      otherInput.classList.add('hidden');
      donationAmount = parseFloat(a.dataset.value);
    }
  });
});

// --- Bij invoer van eigen bedrag ---
otherInput.addEventListener('input', () => {
  donationAmount = parseFloat(otherInput.value);
});

// --- Volgende stap knop ---
nextBtn.addEventListener('click', () => {
  // Controleer op geldig bedrag
  if (!donationAmount || donationAmount <= 0) {
    alert('Voer een geldig bedrag in.');
    return;
  }

  if (donationAmount < 5) {
    alert('Het minimale donatiebedrag is €5.');
    return;
  }

  // Vul het finalAmount veld in en ga naar stap 2
  finalAmount.value = donationAmount;
  step1.classList.add('hidden');
  step2.classList.remove('hidden');
});



// --- Vorige stap knop ---
previousBtn.addEventListener('click', () => {
  step2.classList.add('hidden');
  step1.classList.remove('hidden');
});



// --- Formulier verzenden ---
document.getElementById('donationForm').addEventListener('submit', e => {
  e.preventDefault(); // Voorkom standaard submit

  // Toon bedankbericht
  alert(`Bedankt voor je ${donationType}e donatie van €${donationAmount}! 💚`);

  // Reset formulier en ga terug naar stap 1
  e.target.reset();
  step2.classList.add('hidden');
  step1.classList.remove('hidden');

  // Reset donatie-waarden naar standaard
  donationAmount = 50;
  donationType = 'maandelijks';

  // Reset actieve status van opties en bedragen
  options.forEach(o => o.classList.remove('active'));
  options[0].classList.add('active');

  amounts.forEach(a => a.classList.remove('active'));
  amounts[1].classList.add('active'); // €50 standaard

  otherInput.classList.add('hidden');
  otherInput.value = '';
  finalAmount.value = '';
});



// --- Locaties tonen/verbergen ---
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('viewLocationsBtn'); // Knop
  const grid = document.getElementById('locationsGrid');   // Grid met locaties

  btn.addEventListener('click', () => {
    if (grid.style.display === 'none') {
      // Als grid verborgen is, toon het en verander knoptekst
      grid.style.display = 'grid';
      btn.textContent = 'Verberg locaties';
    } else {
      // Als grid zichtbaar is, verberg het en reset knoptekst
      grid.style.display = 'none';
      btn.textContent = 'Bekijk locaties';
    }
  });
});
const form = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');

// --- Sterren rating logica ---
let selectedRating = 0;
const stars = document.querySelectorAll('#starRating span');

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = star.getAttribute('data-value');
    stars.forEach(s => s.classList.toggle('hover', s.getAttribute('data-value') <= val));
  });

  star.addEventListener('mouseout', () => {
    stars.forEach(s => s.classList.remove('hover'));
  });

  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    stars.forEach(s => s.classList.toggle('selected', s.getAttribute('data-value') <= selectedRating));
  });
});
form.addEventListener('submit', (e) => {
  e.preventDefault(); // voorkom standaard submit

  const name = document.getElementById('name').value.trim();
  const review = document.getElementById('review').value.trim();
  const avatarInput = document.getElementById('avatar').value.trim();

  if (!name || !review) return; // check lege velden

  if (selectedRating === 0) {
    alert('Geef astublieft eerst een Beoordeling.');
    return;
  }

  // Standaard grijs poppetje als geen URL
  const avatar = avatarInput ? avatarInput : "https://www.bing.com/th/id/OIP.J3MyiG7V9QLHeu-x6xiT7wHaHa?w=197&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2";

  const reviewBox = document.createElement('div');
  reviewBox.classList.add('review-box');
  let starsHTML = '';
for (let i = 0; i < selectedRating; i++) starsHTML += '⭐';

reviewBox.innerHTML = `
  <img src="${avatar}" class="review-avatar" alt="Avatar">
  <div class="review-stars">${starsHTML}</div>
  <p>"${review}"</p>
  <span>- ${name}</span>
`;

  reviewList.appendChild(reviewBox);
  form.reset(); // reset formulier
});
// Functie om een random aantal sterren (1 t/m 5) te genereren
function randomStars() {
  return (Math.random() * 1 + 4).toFixed(1); // geeft 1.0 t/m 5.0 met 1 decimaal
}

// Functie om een random aantal reviews te genereren
function randomReviewCount() {
  return Math.floor(Math.random() * 400) + 200; // 1 t/m 500 reviews
}

// Voorbeeld van hoe je dit kunt gebruiken in je HTML
const averageStars = randomStars();
const reviewCount = randomReviewCount();

document.getElementById("review-info").innerHTML = `
  Gemiddelde beoordeling: ${averageStars} ★<br>
  Aantal reviews: ${reviewCount}
`;



