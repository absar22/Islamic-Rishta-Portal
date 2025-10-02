

const risthaProfiles = [
  {
    name: 'Absar Ahmad',
    bio: 'Web Developer who still Googles "how to center a div". Prays 5 times daily, codes 24/7.',
    age: 25,
    rishtaRating: 42,
    income: 45000,
    img: "https://picsum.photos/200?random=1",
    gender: 'male'
  },
  {
    name: 'Sahil Khan',
    bio: 'Full Stack Developer by profession, rishta rejecter by passion. Never misses Jummah prayers.',
    age: 23,
    rishtaRating: 68,
    income: 65000,
    img: "https://picsum.photos/200?random=2",
    gender: 'male'
  },
  {
    name: 'Farukh Khan (Dilli wale)',
    bio: 'Pega Developer. Recites Quran beautifully. No one knows what Pega means — including him.',
    age: 25,
    rishtaRating: 31,
    income: 38000,
    img: "https://picsum.photos/200?random=3",
    gender: 'male'
  },
  {
    name: 'Abid Khan',
    bio: 'Left bank job for LPU. Hafiz-e-Quran. Says it\'s "for growth", really for hostel chai.',
    age: 25,
    rishtaRating: 39,
    income: 28000,
    img: "https://picsum.photos/200?random=4",
    gender: 'male'
  },
  {
    name: 'Ayesha Fatima',
    bio: 'UI/UX Designer. Designs beautiful interfaces, reads Quran daily. Hijabi fashionista.',
    age: 24,
    rishtaRating: 78,
    income: 42000,
    img: "https://picsum.photos/200?random=11",
    gender: 'female'
  },
  {
    name: 'Zainab Rahman',
    bio: 'Software Engineer at Google. Prays Tahajjud regularly. Codes in React, believes in Rizq.',
    age: 26,
    rishtaRating: 85,
    income: 120000,
    img: "https://picsum.photos/200?random=12",
    gender: 'female'
  },
  {
    name: 'Mariam Siddiqui',
    bio: 'Doctor (MBBS). Treats patients, memorized 5 Surahs. Ammi\'s dream daughter-in-law.',
    age: 27,
    rishtaRating: 92,
    income: 80000,
    img: "https://picsum.photos/200?random=13",
    gender: 'female'
  },
  {
    name: 'Hafsa Begum',
    bio: 'Teacher & Islamic scholar. Makes the best biryani. Can debate Fiqh and fix bugs.',
    age: 25,
    rishtaRating: 71,
    income: 35000,
    img: "https://picsum.photos/200?random=14",
    gender: 'female'
  }
];

const molviAdvice = [
  "MashAllah! Good choice, but first check: do they pray Fajr on time?",
  "Beta, Rizq is from Allah. But a stable income helps with the electricity bill.",
  "Remember: Taqwa > Salary. But both together? That's the sweet spot!",
  "The Prophet (PBUH) said look for Deen first. Then check their GitHub commits.",
  "SubhanAllah! Good match. But ask: Can they recite Surah Mulk from memory?",
  "Beta, before proposal, confirm: Do they know the difference between Farz and Wajib?",
  "Excellent choice! But remember: Jannah is under the feet of mothers. Get Ammi's approval!",
  "This rishta looks promising. But first, observe them during Ramadan fasting!"
];

let currentIndex = 0;
let proposalsList = [];
let stats = {
  viewed: 1,
  proposals: 0,
  rejected: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  showProfile(currentIndex);
  updateStats();
});

function showProfile(index) {
  const profile = risthaProfiles[index];
  
  document.getElementById('profile-img').src = profile.img;
  document.getElementById('profile-name').textContent = profile.name;
  document.getElementById('profile-bio').textContent = profile.bio;
  document.getElementById('profile-age').textContent = profile.age;
  document.getElementById('profile-rating').textContent = profile.rishtaRating;
  document.getElementById('profile-income').textContent = '₹' + profile.income.toLocaleString();
  
  const stars = '⭐'.repeat(Math.min(5, Math.ceil(profile.rishtaRating / 20)));
  document.getElementById('stars').textContent = stars;
}

function updateStats() {
  document.getElementById('total-viewed').textContent = stats.viewed;
  document.getElementById('total-proposals').textContent = stats.proposals;
  document.getElementById('total-rejected').textContent = stats.rejected;
}

function showReaction(message) {
  const reactionEl = document.getElementById('reaction');
  reactionEl.textContent = message;
  setTimeout(() => {
    reactionEl.textContent = '';
  }, 3000);
}

function calculateMehr(income) {
  const minimumMehr = income * 3;
  const recommendedMehr = income * 10;
  const goldEquivalent = Math.round(recommendedMehr / 6000);
  
  return {
    minimum: minimumMehr.toLocaleString('en-IN'),
    recommended: recommendedMehr.toLocaleString('en-IN'),
    goldGrams: goldEquivalent
  };
}

function updateProposalsList() {
  const listElement = document.getElementById('proposal-list');
  const countElement = document.getElementById('proposal-count');
  
  countElement.textContent = proposalsList.length;
  
  if (proposalsList.length === 0) {
    listElement.innerHTML = '<li class="empty-state">No proposals yet. Make Dua and send one! 🤲</li>';
    return;
  }
  
  listElement.innerHTML = proposalsList.map((profile, idx) => `
    <li>
      <span>💍 ${profile.name} - Proposal sent! (Rating: ${profile.rishtaRating})</span>
      <button class="delete-btn" onclick="removeProposal(${idx})">🗑️ Cancel</button>
    </li>
  `).join('');
}

function removeProposal(index) {
  proposalsList.splice(index, 1);
  updateProposalsList();
  showReaction("Proposal cancelled! May Allah guide you 🤲");
}

// Event Listeners
document.getElementById('proposal-btn').addEventListener('click', function() {
  const profile = risthaProfiles[currentIndex];
  
  // Check if already proposed
  if (proposalsList.find(p => p.name === profile.name)) {
    showReaction("Already sent proposal! Patience is key 😊");
    return;
  }
  
  // If male profile, show Mehr calculator
  if (profile.gender === 'male') {
    const mehr = calculateMehr(profile.income);
    
    document.getElementById('mehr-intro').textContent = 
      `Based on ${profile.name}'s income of ₹${profile.income.toLocaleString()}/month`;
    document.getElementById('mehr-minimum').textContent = '₹' + mehr.minimum;
    document.getElementById('mehr-recommended').textContent = '₹' + mehr.recommended;
    document.getElementById('gold-equivalent').textContent = `≈ ${mehr.goldGrams}g of Gold`;
    
    document.getElementById('mehr-modal').classList.add('show');
  } else {
    // Female profile - direct proposal
    proposalsList.push(profile);
    updateProposalsList();
    stats.proposals++;
    updateStats();
    showReaction("MashAllah! Proposal sent! 💌 May Allah make it easy!");
  }
});

document.getElementById('reject-btn').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % risthaProfiles.length;
  showProfile(currentIndex);
  stats.rejected++;
  stats.viewed++;
  updateStats();
  showReaction("Next rishta! Allah knows best 🤲");
});

document.getElementById('molvi-btn').addEventListener('click', function() {
  const advice = molviAdvice[Math.floor(Math.random() * molviAdvice.length)];
  document.getElementById('molvi-advice').textContent = advice;
  document.getElementById('molvi-modal').classList.add('show');
});

document.querySelector('.close-modal').addEventListener('click', function() {
  document.getElementById('molvi-modal').classList.remove('show');
});

document.getElementById('confirm-proposal').addEventListener('click', function() {
  const profile = risthaProfiles[currentIndex];
  proposalsList.push(profile);
  updateProposalsList();
  stats.proposals++;
  updateStats();
  document.getElementById('mehr-modal').classList.remove('show');
  showReaction("MashAllah! Proposal sent with Mehr! 💍");
});

document.getElementById('cancel-mehr').addEventListener('click', function() {
  document.getElementById('mehr-modal').classList.remove('show');
});

// Close modals on background click
document.getElementById('molvi-modal').addEventListener('click', function(e) {
  if (e.target.id === 'molvi-modal') {
    this.classList.remove('show');
  }
});

document.getElementById('mehr-modal').addEventListener('click', function(e) {
  if (e.target.id === 'mehr-modal') {
    this.classList.remove('show');
  }
});