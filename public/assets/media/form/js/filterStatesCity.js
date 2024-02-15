/* eslint-disable prettier/prettier */

import { EstadosMexico, MunicipiosMXN } from '../json/MX.js';

$(document).ready(function () {
  EstadosMexico.forEach(function (estado) {
    $('#state').append(new Option(estado.nombre, estado.nombre));
  });

  estado.select2();
});

$('#state').on('change', function () {
  let value = $(this).val();
  console.log(value);
  console.log(MunicipiosMXN[value]);

  $('#city').empty();

  MunicipiosMXN[value].forEach(function (estado) {
    console.log(estado);
    $('#city').append(new Option(estado, estado));
  });

  $('#city').val(null).trigger('change');
});
