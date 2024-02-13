/* // Obtener referencia al bloque inferior
var bloqueInferior1 = document.getElementById('bloque1');
var bloqueInferior2 = document.getElementById('bloque2');
var bloqueInferior3 = document.getElementById('bloque3');
var bloqueInferior4 = document.getElementById('bloque4');
var optionNinguno = document.getElementById('optionNinguno');
var textNinguno = document.getElementById('textNinguno');

// Obtener referencia a los botones de radio
var radioButtons = document.querySelectorAll('input[name="sociosAcciones"]');
// Iterar sobre los botones de radio y agregar un event listener a cada uno
radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', function() {
    // Si el botón "Ninguno" está seleccionado, ocultar el bloque inferior
    if (this.value === '1') {
        optionNinguno.style.display = 'none';
        textNinguno.style.display = 'block';
        bloqueInferior1.style.display = 'block';
        bloqueInferior2.style.display = 'none';
        bloqueInferior3.style.display = 'none';
        bloqueInferior4.style.display = 'none';

        validatorStep5.enableValidator('nameOwner');
        validatorStep5.enableValidator('occupation');
        validatorStep5.enableValidator('ownership');
        validatorStep5.enableValidator('dateOfBirth');
        validatorStep5.enableValidator('addressOwner');
        validatorStep5.enableValidator('emailOwner');

        validatorStep5.disableValidator('nameOwner2');
        validatorStep5.disableValidator('occupation2');
        validatorStep5.disableValidator('ownership2');
        validatorStep5.disableValidator('dateOfBirth2');
        validatorStep5.disableValidator('addressOwner2');
        validatorStep5.disableValidator('emailOwner2');

        validatorStep5.disableValidator('nameOwner3');
        validatorStep5.disableValidator('occupation3');
        validatorStep5.disableValidator('ownership3');
        validatorStep5.disableValidator('dateOfBirth3');
        validatorStep5.disableValidator('addressOwner3');
        validatorStep5.disableValidator('emailOwner3');
        
        validatorStep5.disableValidator('nameOwner4');
        validatorStep5.disableValidator('occupation4');
        validatorStep5.disableValidator('ownership4');
        validatorStep5.disableValidator('dateOfBirth4');
        validatorStep5.disableValidator('addressOwner4');
        validatorStep5.disableValidator('emailOwner4');

    } else if(this.value === '2'){
        optionNinguno.style.display = 'none';
        textNinguno.style.display = 'block';
        bloqueInferior1.style.display = 'block';
        bloqueInferior2.style.display = 'block';
        bloqueInferior3.style.display = 'none';
        bloqueInferior4.style.display = 'none';

        validatorStep5.enableValidator('nameOwner');
        validatorStep5.enableValidator('occupation');
        validatorStep5.enableValidator('ownership');
        validatorStep5.enableValidator('dateOfBirth');
        validatorStep5.enableValidator('addressOwner');
        validatorStep5.enableValidator('emailOwner');

        validatorStep5.enableValidator('nameOwner2');
        validatorStep5.enableValidator('occupation2');
        validatorStep5.enableValidator('ownership2');
        validatorStep5.enableValidator('dateOfBirth2');
        validatorStep5.enableValidator('addressOwner2');
        validatorStep5.enableValidator('emailOwner2');

        validatorStep5.disableValidator('nameOwner3');
        validatorStep5.disableValidator('occupation3');
        validatorStep5.disableValidator('ownership3');
        validatorStep5.disableValidator('dateOfBirth3');
        validatorStep5.disableValidator('addressOwner3');
        validatorStep5.disableValidator('emailOwner3');
        
        validatorStep5.disableValidator('nameOwner4');
        validatorStep5.disableValidator('occupation4');
        validatorStep5.disableValidator('ownership4');
        validatorStep5.disableValidator('dateOfBirth4');
        validatorStep5.disableValidator('addressOwner4');
        validatorStep5.disableValidator('emailOwner4');

    } else if(this.value === '3'){
        optionNinguno.style.display = 'none';
        textNinguno.style.display = 'block';
        bloqueInferior1.style.display = 'block';
        bloqueInferior2.style.display = 'block';
        bloqueInferior3.style.display = 'block';
        bloqueInferior4.style.display = 'none';

        validatorStep5.enableValidator('nameOwner');
        validatorStep5.enableValidator('occupation');
        validatorStep5.enableValidator('ownership');
        validatorStep5.enableValidator('dateOfBirth');
        validatorStep5.enableValidator('addressOwner');
        validatorStep5.enableValidator('emailOwner');

        validatorStep5.enableValidator('nameOwner2');
        validatorStep5.enableValidator('occupation2');
        validatorStep5.enableValidator('ownership2');
        validatorStep5.enableValidator('dateOfBirth2');
        validatorStep5.enableValidator('addressOwner2');
        validatorStep5.enableValidator('emailOwner2');

        validatorStep5.enableValidator('nameOwner3');
        validatorStep5.enableValidator('occupation3');
        validatorStep5.enableValidator('ownership3');
        validatorStep5.enableValidator('dateOfBirth3');
        validatorStep5.enableValidator('addressOwner3');
        validatorStep5.enableValidator('emailOwner3');

        validatorStep5.disableValidator('nameOwner4');
        validatorStep5.disableValidator('occupation4');
        validatorStep5.disableValidator('ownership4');
        validatorStep5.disableValidator('dateOfBirth4');
        validatorStep5.disableValidator('addressOwner4');
        validatorStep5.disableValidator('emailOwner4');
    } else if(this.value === '4'){
        optionNinguno.style.display = 'none';
        textNinguno.style.display = 'block';
        bloqueInferior1.style.display = 'block';
        bloqueInferior2.style.display = 'block';
        bloqueInferior3.style.display = 'block';
        bloqueInferior4.style.display = 'block';

        validatorStep5.enableValidator('nameOwner');
        validatorStep5.enableValidator('occupation');
        validatorStep5.enableValidator('ownership');
        validatorStep5.enableValidator('dateOfBirth');
        validatorStep5.enableValidator('addressOwner');
        validatorStep5.enableValidator('emailOwner');

        validatorStep5.enableValidator('nameOwner2');
        validatorStep5.enableValidator('occupation2');
        validatorStep5.enableValidator('ownership2');
        validatorStep5.enableValidator('dateOfBirth2');
        validatorStep5.enableValidator('addressOwner2');
        validatorStep5.enableValidator('emailOwner2');

        validatorStep5.enableValidator('nameOwner3');
        validatorStep5.enableValidator('occupation3');
        validatorStep5.enableValidator('ownership3');
        validatorStep5.enableValidator('dateOfBirth3');
        validatorStep5.enableValidator('addressOwner3');
        validatorStep5.enableValidator('emailOwner3');

        validatorStep5.enableValidator('nameOwner4');
        validatorStep5.enableValidator('occupation4');
        validatorStep5.enableValidator('ownership4');
        validatorStep5.enableValidator('dateOfBirth4');
        validatorStep5.enableValidator('addressOwner4');
        validatorStep5.enableValidator('emailOwner4');

    } else if(this.value === '5'){
        optionNinguno.style.display = 'block';
        textNinguno.style.display = 'none';
        bloqueInferior1.style.display = 'block';
        bloqueInferior2.style.display = 'none';
        bloqueInferior3.style.display = 'none';
        bloqueInferior4.style.display = 'none';

        validatorStep5.enableValidator('nameOwner');
        validatorStep5.enableValidator('occupation');
        validatorStep5.enableValidator('ownership');
        validatorStep5.enableValidator('dateOfBirth');
        validatorStep5.enableValidator('addressOwner');
        validatorStep5.enableValidator('emailOwner');

        validatorStep5.disableValidator('nameOwner2');
        validatorStep5.disableValidator('occupation2');
        validatorStep5.disableValidator('ownership2');
        validatorStep5.disableValidator('dateOfBirth2');
        validatorStep5.disableValidator('addressOwner2');
        validatorStep5.disableValidator('emailOwner2');

        validatorStep5.disableValidator('nameOwner3');
        validatorStep5.disableValidator('occupation3');
        validatorStep5.disableValidator('ownership3');
        validatorStep5.disableValidator('dateOfBirth3');
        validatorStep5.disableValidator('addressOwner3');
        validatorStep5.disableValidator('emailOwner3');
        
        validatorStep5.disableValidator('nameOwner4');
        validatorStep5.disableValidator('occupation4');
        validatorStep5.disableValidator('ownership4');
        validatorStep5.disableValidator('dateOfBirth4');
        validatorStep5.disableValidator('addressOwner4');
        validatorStep5.disableValidator('emailOwner4');
    }
  });
});
 */