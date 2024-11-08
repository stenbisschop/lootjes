const naamInput = document.getElementById('naam');
const naamForm = document.getElementById('naam-form');
const lootjesContainer = document.getElementById('lootjes-container');
const lootjesLijst = document.getElementById('lootjes-lijst');

const lootjes = [];

// Functie om de lootjes van de backend op te halen
async function fetchLootjes() {
    try {
        const response = await fetch('/.netlify/functions/verdeelLootjes');
        const data = await response.json();
        lootjes.push(...data);
    } catch (error) {
        console.error('Fout bij het ophalen van de lootjes:', error);
    }
}

// Functie om de lootjes van de ingevulde naam weer te geven
function toonLootjes(naam) {
    const deelnemerLootjes = lootjes.filter(l => l.trekker === naam);
    lootjesLijst.innerHTML = '';

    deelnemerLootjes.forEach(lootje => {
        const li = document.createElement('li');
        li.textContent = lootje.getrokken;
        lootjesLijst.appendChild(li);
    });

    lootjesContainer.classList.remove('hidden');
    naamForm.classList.add('hidden');
}

// Functie die wordt aangeroepen wanneer de gebruiker verder gaat
async function gaVerder() {
    const naam = naamInput.value.trim();

    if (naam === '') {
        alert('Voer je naam in');
        return;
    }

    await fetchLootjes();  // Haal de lootjes op van de backend

    toonLootjes(naam);  // Toon de lootjes voor de ingevulde naam
}
