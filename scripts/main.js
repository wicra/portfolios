// THEMES 
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('switch');

    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            // Thème sombre
            document.documentElement.style.setProperty('--CouleurFont', 'black');
            document.documentElement.style.setProperty('--CouleurPrimaire', 'white');
            document.documentElement.style.setProperty('--CouleurSecondaire', '#e1e2e3');
            
        } else {
            // Thème clair
            document.documentElement.style.setProperty('--CouleurFont', 'white');
            document.documentElement.style.setProperty('--CouleurPrimaire', 'black');
            document.documentElement.style.setProperty('--CouleurSecondaire', '#A6A6A6');
            
        }
    });
});