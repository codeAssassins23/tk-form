/* eslint-disable prettier/prettier */

let defES = document.getElementById('defES');
let defEN = document.getElementById('defEN');

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
      defEN.classList.remove('d-block');
      defEN.classList.add('d-none');
      defES.classList.remove('d-none');
      defES.classList.add('d-block');
      cambiarIdioma('es');
      fillIndustryEspañol();
    });

    languageEN.addEventListener('click', () => {
      defEN.classList.remove('d-none');
      defEN.classList.add('d-block');
      defES.classList.remove('d-block');
      defES.classList.add('d-none');
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
