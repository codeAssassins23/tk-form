/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

//EEUU

// Función para llenar el select de estados de EEUU
function fillEstadoSelectEEUU() {
  estadosEEUU.estados.forEach(function (estado) {
    $('#state').append(new Option(estado.nombre, estado.nombre)); // Usar el nombre como valor
  });
}


// Función para llenar el select de ciudades basado en el estado seleccionado de EEUU
function fillCiudadesSelect(estadoSeleccionado) {
  // Obtener las ciudades del estado seleccionado
  let ciudades = EEUU[estadoSeleccionado].ciudades;

  // Limpiar y llenar el select de ciudades
  $('#city').empty().append('<option value="">Seleccione una ciudad</option>');
  ciudades.forEach(function (ciudad) {
    $('#city').append(new Option(ciudad, ciudad)); // Usar el nombre de la ciudad como valor
  });
}

//MEXICO

// Función para llenar el select de estados
function fillEstadoSelect() {
  EstadosMexico.forEach(function (estado) {
    $('#state').append(new Option(estado.nombre, estado.id)); // Usar el ID como valor
  });
}

// Función para llenar el select de municipios basado en el ID de estado seleccionado
function fillMunicipioSelect(estado_id) {
  // Filtrar municipios por estado_id
  let municipios = MunicipiosMXN.filter(function (municipio) {
    return municipio.estado_id == estado_id;
  });

  // Limpiar y llenar el select de ciudades
  $('#city').empty().append('<option value="">Seleccione una ciudad</option>');
  municipios.forEach(function (municipio) {
    $('#city').append(new Option(municipio.nombre, municipio.id)); // Usar el ID como valor
  });
}


