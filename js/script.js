document.addEventListener("DOMContentLoaded", function () {
// INITIALISATION DE AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});
    
// INDEX DES PROJETS
let projects = [];
let currentProjectIndex = 0;

// VARIABLES POUR GESTION DES SWIPES
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;

// MAP DES ICÔNES DE TECHNOLOGIES
const techIcons = {
    html: "fa-brands fa-html5",
    css: "fa-brands fa-css3-alt",
    js: "fa-brands fa-js",
    react: "fa-brands fa-react",
    node: "fa-brands fa-node-js",
    python: "fa-brands fa-python",
    php: "fa-brands fa-php",
    wordpress: "fa-brands fa-wordpress",
    laravel: "fa-brands fa-laravel",
    linkedin: "fa-brands fa-linkedin",
    gmail: "fa-solid fa-envelope",
    github: "fa-brands fa-github",
    flutter: "fa-brands fa-square-flutter",
    nodejs: "fa-brands fa-node-js",
    mysql: "fa-solid fa-database",
    dart: "fa-brands fa-dart",
    
};

// CHARGEMENT DES PROJETS EN JSON
fetch("data/projects.json")
    .then((response) => response.json())
    .then((data) => {
    projects = data.projects;
    displayProject(0); 
    })
    .catch((error) => {
    console.error("Erreur lors du chargement des projets:", error);

    document.querySelector("#project-title").textContent =
        "Erreur de chargement";
    document.querySelector("#project-description").textContent =
        "Impossible de charger les projets. Veuillez réessayer plus tard.";
    });

// FONCTION POUR AFFICHER UN PROJET
function displayProject(index) {
    if (!projects || projects.length === 0) return;

    const project = projects[index];

    // MAJ ELEMENTS DU PROJET
    animateUpdate("#project-number", `#${project.id}`);
    animateUpdate("#project-title", project.title);
    animateUpdate("#project-description", project.description);

    // MAJ URL GITHUB
    document.querySelector("#project-github-link").href =
    project.githubLink;

    // MAJ TECHNOLOGIES
    updateTechnologies(project.technologies, index === 0);

    // MAJ IMAGES
    updateImages(project.images);

    // MAJ INDEX ACTUEL
    currentProjectIndex = index;
    
    // PREMIER ELEMENT AVEC LIEN RESEAU
    const headerProject = document.querySelector(".container-header-project");
    if (index === 0) {
        headerProject.classList.add("profile-header");
    } else {
        headerProject.classList.remove("profile-header");
    }
}

// FONCTION POUR ANIMER LA MISE À JOUR D'UN ÉLÉMENT
function animateUpdate(selector, content) {
    const element = document.querySelector(selector);
    element.style.opacity = "0";

    setTimeout(() => {
    element.textContent = content;
    element.style.opacity = "1";
    element.classList.add("fade-in");

    setTimeout(() => {
        element.classList.remove("fade-in");
    }, 500);
    }, 300);
}

// FONCTION POUR METTRE À JOUR LES TECHNOLOGIES
function updateTechnologies(technologies, isFirstProject) {
    const techContainer = document.querySelector("#project-technologies");
    techContainer.innerHTML = "";

    if (isFirstProject) {
        // PREMIER PROJET AVEC LIENS
        technologies.forEach((tech, index) => {
            if (techIcons[tech.type]) {
                const link = document.createElement("a");
                link.href = tech.url;
                link.target = "_blank";
                link.className = "tech-link";
                link.style.opacity = "0";
                
                const icon = document.createElement("i");
                icon.className = techIcons[tech.type];
                
                link.appendChild(icon);
                techContainer.appendChild(link);
                
                setTimeout(() => {
                    link.style.opacity = "1";
                    link.classList.add("icon-fade-in");
                    setTimeout(() => {
                        link.classList.remove("icon-fade-in");
                    }, 500);
                }, 300 + (index * 100)); 
            }
        });
    } else {
        technologies.forEach((tech, index) => {
            if (techIcons[tech]) {
                const icon = document.createElement("i");
                icon.className = techIcons[tech];
                icon.style.opacity = "0"; 
                techContainer.appendChild(icon);
                
                setTimeout(() => {
                    icon.style.opacity = "1";
                    icon.classList.add("icon-fade-in");
                    setTimeout(() => {
                        icon.classList.remove("icon-fade-in");
                    }, 500);
                }, 300 + (index * 100)); 
            }
        });
    }
}

// FONCTION POUR METTRE À JOUR LES IMAGES DU CAROUSEL
function updateImages(images) {
    const imagesContainer = document.querySelector("#project-images");
    imagesContainer.innerHTML = "";

    images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className =
        index === 0 ? "carousel-image active" : "carousel-image";
    img.alt = `Project image ${index + 1}`;
    imagesContainer.appendChild(img);
    });

    setupCarousel();
}

// CONFIGURATION DU CAROUSEL D'IMAGES
function setupCarousel() {
    const images = document.querySelectorAll(".carousel-image");
    let currentIndex = 0;

    function showImage(index) {
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
    currentIndex = index;
    }

    function nextImage() {
    if (images.length <= 1) return;
    let newIndex = currentIndex + 1;
    if (newIndex >= images.length) newIndex = 0;
    showImage(newIndex);
    }

    if (window.carouselInterval) {
    clearInterval(window.carouselInterval);
    }

    if (images.length > 1) {
    window.carouselInterval = setInterval(nextImage, 5000);
    }
}

let isAnimating = false;

// FONCTION POUR PASSER AU PROJET SUIVANT
function goToNextProject() {
    if (isAnimating) return;
    isAnimating = true;
    
    let nextIndex = currentProjectIndex + 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    
    // ANIMATION DE SWIPE SUIVANT
    const containerProject = document.querySelector('.container-project');
    containerProject.classList.add('flip-out-left');
    
    setTimeout(() => {
        displayProject(nextIndex);
        containerProject.classList.remove('flip-out-left');
        containerProject.classList.add('flip-in-right');
        
        setTimeout(() => {
            containerProject.classList.remove('flip-in-right');
            isAnimating = false;
        }, 150);
    }, 150);
}

// FONCTION POUR PASSER AU PROJET PRÉCÉDENT
function goToPreviousProject() {
    if (isAnimating) return;
    isAnimating = true;
    
    let prevIndex = currentProjectIndex - 1;
    if (prevIndex < 0) prevIndex = projects.length - 1;
    
    // ANIMATION DE SWIPE PRÉCÉDENT
    const containerProject = document.querySelector('.container-project');
    containerProject.classList.add('flip-out-right');
    
    setTimeout(() => {
        displayProject(prevIndex);
        containerProject.classList.remove('flip-out-right');
        containerProject.classList.add('flip-in-left');
        
        setTimeout(() => {
            containerProject.classList.remove('flip-in-left');
            isAnimating = false;
        }, 150);
    }, 150);
}

// GESTIONNAIRE DE CLIC POUR PASSER AU PROJET SUIVANT
document.querySelector("#next-project-btn").addEventListener("click", goToNextProject);

// DÉTECTION DE SWIPE POUR MOBILE
const containerProject = document.querySelector('.container-project');

// EVENT DE TOUCHER - DÉBUT
containerProject.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

// EVENT DE TOUCHER - FIN
containerProject.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

// TRAITEMENT DU SWIPE
function handleSwipe() {
    if (isAnimating) return;
    
    // DISTANCE DU SWIPE
    const swipeDistance = touchEndX - touchStartX;
    
    // SWIPE SUIVANT
    if (swipeDistance < -minSwipeDistance) {
        goToNextProject();
    }

    // SWIPE PRECÉDENT
    else if (swipeDistance > minSwipeDistance) {
        goToPreviousProject();
    }
}
});
