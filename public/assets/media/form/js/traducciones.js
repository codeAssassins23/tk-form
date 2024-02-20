/* eslint-disable prettier/prettier */

let languageES = document.getElementById('languageES');
let languageEN = document.getElementById('languageEN');

fetch('/assets/media/form/languages/traducciones.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    languageES.addEventListener('click', () => {
      cambiarIdioma('es');
      fillIndustryEspañol();
    });

    languageEN.addEventListener('click', () => {
      cambiarIdioma('en');
      fillIndustryIngles();
    });
    function cambiarIdioma(idioma) {
      for (let key in data[idioma]) {
        document.getElementById(key).innerHTML = data[idioma][key];
      }
    }
  })
  .catch((error) => {
    console.error('Hubo un problema con la petición fetch:', error);
  });
