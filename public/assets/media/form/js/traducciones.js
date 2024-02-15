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
    });

    languageEN.addEventListener('click', () => {
      cambiarIdioma('en');
    });
    function cambiarIdioma(idioma) {
      for (let key in data[idioma]) {
        document.getElementById(key).innerHTML = data[idioma][key];
      }

      // Email
      document.getElementById('content_send_email').innerHTML =
        data[idioma].content_send_email;

      document.getElementById('label_send_email').textContent =
        data[idioma].label_send_email;

      document.getElementById('label_name').textContent =
        data[idioma].label_name;

      document.getElementById('label_company').textContent =
        data[idioma].label_company;

      document.getElementById('step_one_country').textContent =
        data[idioma].step_one_country;

      document.getElementById('label_phone').textContent =
        data[idioma].label_phone;

      document.getElementById('button_send_email').textContent =
        data[idioma].button_send_email;

      document.getElementById('label_advisor').textContent =
        data[idioma].label_advisor;

      document.getElementById('button_schedule_date').textContent =
        data[idioma].button_schedule_date;

      // Step 1
      document.getElementById('step_one_title').textContent =
        data[idioma].step_one_title;

      document.getElementById('step_one_companyName').textContent =
        data[idioma].step_one_companyName;

      document.getElementById('step_one_tradeName').textContent =
        data[idioma].step_one_tradeName;

      document.getElementById('step_one_state').textContent =
        data[idioma].step_one_state;

      document.getElementById('step_one_city').textContent =
        data[idioma].step_one_city;

      document.getElementById('step_one_postal_code').textContent =
        data[idioma].step_one_postal_code;

      document.getElementById('step_one_address').textContent =
        data[idioma].step_one_address;
    }
  })
  .catch((error) => {
    console.error('Hubo un problema con la petición fetch:', error);
  });
