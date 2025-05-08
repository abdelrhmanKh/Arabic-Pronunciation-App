const fullWordList = [
    { word: "قطة", img: "cat.png" },
    { word: "كلب", img: "dog.png" },
    { word: "تفاحة", img: "apple.png" },
    { word: "سيارة", img: "car.png" },
    { word: "منزل", img: "house.png" },
    { word: "كتاب", img: "book.png" },
    { word: "قلم", img: "pen.png" },
    { word: "شجرة", img: "tree.png" },
    { word: "زهرة", img: "flower.png" },
    { word: "كرة", img: "ball.png" },
    { word: "باب", img: "door.png" },
    { word: "نافذة", img: "window.png" },
    { word: "دراجة", img: "bike.png" },
    { word: "طاولة", img: "table.png" },
    { word: "كرسي", img: "chair.png" },
    { word: "سمكة", img: "fish.png" },
    { word: "طيارة", img: "plane.png" },
    { word: "ماء", img: "water.png" },
    { word: "حليب", img: "milk.png" },
    { word: "خبز", img: "bread.png" },
    { word: "تفاح", img: "apple2.png" },
    { word: "برتقال", img: "orange.png" },
    { word: "موز", img: "banana.png" },
    { word: "كرز", img: "cherry.png" },
    { word: "فراولة", img: "strawberry.png" },
    { word: "بطة", img: "duck.png" },
    { word: "حصان", img: "horse.png" },
    { word: "نمر", img: "tiger.png" },
    { word: "أسد", img: "lion.png" },
    { word: "فيل", img: "elephant.png" }
];

const words = shuffle(fullWordList).slice(0, 6);
const cardsDiv = document.getElementById("cards");
const scoreDiv = document.getElementById("score");

let activeIndex = null;
let score = 0;
let completed = 0;

function shuffle(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}
words.forEach((w, i) => {
    const container = document.createElement("div");
    container.className = "card-container";

    const card = document.createElement("div");
    card.className = "card";

    const content = document.createElement("div");
    content.className = "card-content";

    const front = document.createElement("div");
    front.className = "card-inner card-front";

    const back = document.createElement("div");
    back.className = "card-inner card-back";
    back.textContent = w.word;

    content.appendChild(front);
    content.appendChild(back);
    card.appendChild(content);

    card.onclick = () => switchCard(i, card);
    container.appendChild(card);
    cardsDiv.appendChild(container);
});

function switchCard(index, card) {
    if (card.classList.contains("pass") || card.classList.contains("fail")) return;
    const cards = document.querySelectorAll(".card");
    if (activeIndex !== null && activeIndex !== index) {
        cards[activeIndex].classList.remove("flipped");
    }
    activeIndex = index;
    card.classList.add("flipped");
}

function markGood() {
    if (activeIndex === null) return;
    const card = document.querySelectorAll(".card")[activeIndex];
    if (!card.classList.contains("pass") && !card.classList.contains("fail")) {
        card.classList.add("pass");
        completed++;
        score = Math.round((completed / words.length) * 100);
        scoreDiv.textContent = `%درجة الطالب: ${score}`;
        const allCards = document.querySelectorAll('.card');
        const allMarked = Array.from(allCards).every(card => card.classList.contains("pass") || card.classList.contains("fail"));
        if (score >= 75 && allMarked) launchCelebration();
    }
    resetState();
}

function markBad() {
    if (activeIndex === null) return;
    const card = document.querySelectorAll(".card")[activeIndex];
    if (!card.classList.contains("pass") && !card.classList.contains("fail")) {
        card.classList.add("fail");
        const allCards = document.querySelectorAll('.card');
        const allMarked = Array.from(allCards).every(card => card.classList.contains("pass") || card.classList.contains("fail"));
        if (score >= 75 && allMarked) launchCelebration();
    }
    resetState();
}

function resetState() {
    activeIndex = null;
    const allCards = document.querySelectorAll('.card');
    const allMarked = Array.from(allCards).every(card => card.classList.contains("pass") || card.classList.contains("fail"));
    if (allMarked) {
        const controls = document.getElementById("controls");
        controls.innerHTML = '<button onclick="location.reload()">🔁 ابدأ من جديد</button> ';
    }
}

function launchCelebration() {
    const controls = document.getElementById("controls");
    controls.innerHTML = '<button onclick="location.reload()">🔁 ابدأ من جديد</button>';
    const message = document.createElement('div');
    message.textContent = '🎉 تهانينا! لقد أنهيت التمرين بنجاح 🎉';
    message.style.position = 'fixed';
    message.style.top = '40%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(255, 255, 255, 0.95)';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '12px';
    message.style.fontSize = '22px';
    message.style.color = '#2b9348';
    message.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    message.style.zIndex = '10000';
    document.body.appendChild(message);

    const audio = new Audio('https://www.soundjay.com/human/cheering-01.mp3');
    audio.play();

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.top = `-${Math.random() * 100}px`;
        confetti.style.width = `${8 + Math.random() * 8}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 6000);
    }

    setTimeout(() => message.remove(), 5000);
}

function resetCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.classList.remove("pass", "fail", "flipped");
    });
    activeIndex = null;
    completed = 0;
    score = 0;
    scoreDiv.textContent = "%درجة الطالب: 0";
    document.getElementById("controls").innerHTML = `
          <button onclick="markGood()">✅ عمل رائع</button>
          <button onclick="markBad()">❌ حظًا أوفر</button>
        `;
}