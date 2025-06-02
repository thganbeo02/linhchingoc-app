// Array of all images to cycle through
const images = [
  './assets/image-content/chi1.png',
  './assets/image-content/chi2.png',
  './assets/image-content/chi3.png',
  './assets/image-content/chi4.png',
  './assets/image-content/chi5.png'
];

const texts = [
    "Qua 1/6 hoi muon xiu",
    "A biet may hom nay em buon",
    "A cung kbt an ui nhu nao ngoai noi chuyen voi em",
    "A chi mong a lam em cuoi mot chut",
    "Co len nhe I am here with you ^^"
]

// Reference HTML elements
const imageContent = document.querySelector('.image-content');  
const mainButton = document.getElementById('main-button');      
const finalMessage = document.querySelector('.final-message');  
const dynamicText = document.querySelector('.dynamic-text');

// Track current image index
let currentIndex = 0;

function updateText() {
  if (currentIndex < texts.length) {
    dynamicText.textContent = texts[currentIndex];
    dynamicText.style.opacity = 0;
    
    // Fade in the new text
    setTimeout(() => {
      dynamicText.style.opacity = 1;
    }, 100);
  }
}

// Function to change images with fade effect
function updateImage() {
  // Fade out current image
  imageContent.style.opacity = 0;
  
  // Preload next image
  const img = new Image();
  img.src = images[currentIndex];
  
  // When image loads successfully
  img.onload = () => {
    imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;
    imageContent.style.opacity = 1;
  };
  
  // Handle image load errors
  img.onerror = () => {
    imageContent.style.backgroundImage = 'none';
    imageContent.style.backgroundColor = '#f0f0f0';
    imageContent.innerHTML = `<p style="text-align: center; padding: 20px;">Image ${currentIndex + 1} not found</p>`;
    imageContent.style.opacity = 1;
  };
}

// Show first image when page loads
updateImage();
updateText();

// Handle button clicks to cycle through images
mainButton.addEventListener('click', () => {
  currentIndex++;
  
  if (currentIndex < images.length) {
    updateImage();
    updateText();
  }
  
  // Show final message after last image
  if (currentIndex === images.length - 1) {
    mainButton.style.display = 'none';
  }
});

// Close button functionality (modern Electron way)
const { ipcRenderer } = require('electron');

// Find the minimize and close icons
const minimizeIcon = document.querySelector('img[alt="Shrink Icon"]');
const closeIcon = document.querySelector('img[alt="Close Icon"]');

// Minimize button
if (minimizeIcon) {
  minimizeIcon.addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
  });
}

// Close button
if (closeIcon) {
  closeIcon.addEventListener('click', () => {
    ipcRenderer.send('close-window');
  });
}

