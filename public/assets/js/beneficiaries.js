// Stepper lement
let element = document.querySelector("#kt_stepper_example_basic");
// Initialize Stepper
let stepper = new KTStepper(element);
let index = 0;
let buttons = 0;
let beneId;
// Define form element
const form = document.getElementById('kt_docs_formvalidation_text');

// Init validartion 1
let validatorStep1 = FormValidation.formValidation(
    form,
    {
        fields: {
            'text_name': {
                validators: {
                    notEmpty: {
                        message: 'Name is required'
                    }
                }
            },
            'text_email': {
                validators:{
                    emailAddress:{
                        message: 'The value is not a valid email address'
                    }
                }
            },
            'text_nickname':{
                validators: {
                    notEmpty: {
                        message: 'Nickname is required'
                    }
                }
            },
            'select2_country':{
                validators:{
                    notEmpty: {
                        message: 'Country is required'
                    }
                }
            },
            'text_address':{
                validators:{
                    notEmpty: {
                        message: 'Address is required'
                    }
                }
            },
            'text_city':{
                validators:{
                    notEmpty: {
                        message: 'City is required'
                    }
                }
            },
            'text_state':{
                validators:{
                    notEmpty: {
                        message: 'State is required'
                    }
                }
            },
            'select2Purpose':{
                validators:{
                    notEmpty: {
                        message: 'Purpose is required'
                    }
                }
            },
            'purpose':{
                validators:{
                    notEmpty: {
                        message: 'Purpose is required'
                    }
                }
            },
            'input_textArea':{
                validators:{
                    notEmpty: {
                        message: 'Specific is required'
                    }
                }
            },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);
// Init validartion 2
let validatorStep2 = FormValidation.formValidation(
    form,
    {
        fields: {
            'select2Bank_currency': {
                validators: {
                    notEmpty: {
                        message: 'Currency is required'
                    }
                }
            },
            'select2Bank_countries':{
                validators: {
                    notEmpty: {
                        message: 'Country is required'
                    }
                }
            },
            'bankInformationOthers':{
                validators:{
                    notEmpty:{
                        message: 'Bank information is required'
                    }
                }
            },
            'bankInformationUnited':{
                validators:{
                    notEmpty:{
                        message: 'Bank information is required'
                    }
                }
            },
            'inputMexico_clabe':{
                validators:{
                    notEmpty:{
                        message: 'Clave is required'
                    }
                }
            },
            'inputMexico_SWIFT':{
                validators:{
                    notEmpty:{
                        message: 'SWIFT is required'
                    }
                }
            },
            'ABAunitedOne':{
                validators:{
                    notEmpty:{
                        message: 'ABA number is required'
                    }
                }
            },
            'accountUnitedOne':{
                validators:{
                    notEmpty:{
                        message: 'Account number is required'
                    }
                }
            },
            'SWIFTunitedOne':{
                validators:{
                    notEmpty:{
                        message: 'SWIFT is required'
                    }
                }
            },
            'accountUnitedTwo':{
                validators:{
                    notEmpty:{
                        message: 'Account number is required'
                    }
                }
            },
            'othersSwiftOne':{
                validators:{
                    notEmpty:{
                        message: 'SWIFT is required'
                    }
                }
            },
            'othersAccountOne':{
                validators:{
                    notEmpty:{
                        message: 'Account number is required'
                    }
                }
            },
            'othersAccountTwo':{
                validators:{
                    notEmpty:{
                        message: 'Account number is required'
                    }
                }
            },
            'othersTransitTwo':{
                validators:{
                    notEmpty:{
                        message: 'Transit code is required'
                    }
                }
            },
            'bankAdressLine':{
                validators:{
                    notEmpty:{
                        message: 'Adress line is required'
                    }
                }
            },
            'bankName':{
                validators:{
                    notEmpty:{
                        message: 'Bank name is required'
                    }
                }
            }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

// Función para limpiar los valores del formulario
function limpiarFormulario() {
    // Obtén todos los elementos del formulario
    const formulario = document.getElementById('kt_docs_formvalidation_text'); // Reemplaza 'tuFormulario' con el ID de tu formulario
    const elementosFormulario = formulario.elements;

    // Itera sobre los elementos y establece sus valores a vacíos
    for (let i = 0; i < elementosFormulario.length; i++) {
        const elemento = elementosFormulario[i];
        // Verifica el tipo de elemento y límpialo
        switch (elemento.type) {
            case 'text':
            case 'email':
                elemento.value = '';
                break;
            case 'select-one':
                // Para Select2, debes usar el método .val(null) y luego .trigger('change')
                $(elemento).val([]).trigger('change');
                break;
            case 'radio':
                elemento.checked = false;
                break;
            case 'textarea':
                elemento.value = '';
                break;
            // Agrega más casos según sea necesario para otros tipos de elementos
        }
    }
}

// Revalidate Select2 input when an option is chosen
['select2_country', 'select2Purpose', 'select2Bank_currency', 'select2Bank_countries'].forEach(function (select2Name){
    if(select2Name === "select2_country" || select2Name === "select2Purpose"){
        $(form.querySelector('[name="' + select2Name +'"]')).on('change', function () {
            validatorStep1.revalidateField(select2Name);
        });
    }else{
        $(form.querySelector('[name="' + select2Name +'"]')).on('change', function () {
            validatorStep2.revalidateField(select2Name);
        });
    }
});

// step 1
$("input[name='purpose']" ).change(function() {
    let specificTextarea = document.getElementById('specificTextarea');
    if ($(this).val() == 'Others') {
        specificTextarea.style.display = 'block';
        validatorStep1.enableValidator('input_textArea');  // Habilita la validación
    }
    else {
        specificTextarea.style.display = 'none';
        validatorStep1.disableValidator('input_textArea');  // Deshabilita la validación
    }
});

// step 2 first part
let blockOthersCurrency = document.getElementById('othersStepOne');
let blockUnitedState = document.getElementById('unitedState');
let blockMexico = document.getElementById('mexico');

let othersSelectOne = document.getElementById('othersSelectOne');
let othersSelectTwo = document.getElementById('othersSelectTwo');

let unitedSelectOne = document.getElementById('unitedSelectOne');
let unitedSelectTwo = document.getElementById('unitedSelectTwo');

function handleBankInformationChange(value, selectOne, selectTwo, validatorStep2) {
    if (value === 'ABA') {
        selectOne.style.display = 'block';
        selectTwo.style.display = 'none';
        validatorStep2.enableValidator('ABAunitedOne');
        validatorStep2.enableValidator('accountUnitedOne');
        validatorStep2.disableValidator('SWIFTunitedOne');
        validatorStep2.disableValidator('accountUnitedTwo');
    } else if (value === 'SWIFT') {
        selectOne.style.display = 'none';
        selectTwo.style.display = 'block';
        validatorStep2.disableValidator('ABAunitedOne');
        validatorStep2.disableValidator('accountUnitedOne');
        validatorStep2.enableValidator('SWIFTunitedOne');
        validatorStep2.enableValidator('accountUnitedTwo');
    }
}
function handleBankInformationOthersChange(value, selectOne, selectTwo, validatorStep2) {
    if (value === 'SWIFT') {
        selectOne.style.display = 'block';
        selectTwo.style.display = 'none';
        validatorStep2.enableValidator('othersSwiftOne');
        validatorStep2.enableValidator('othersAccountOne');
        validatorStep2.disableValidator('othersTransitTwo');
        validatorStep2.disableValidator('othersAccountTwo');
    } else if (value === 'transitCode') {
        selectOne.style.display = 'none';
        selectTwo.style.display = 'block';
        validatorStep2.disableValidator('othersSwiftOne');
        validatorStep2.disableValidator('othersAccountOne');
        validatorStep2.enableValidator('othersTransitTwo');
        validatorStep2.enableValidator('othersAccountTwo');
    }
}
$("#kt_docs_select2_currency").change(function(){
    validatorStep2.disableValidator('ABAunitedOne');
    validatorStep2.disableValidator('accountUnitedOne');
    validatorStep2.disableValidator('SWIFTunitedOne');
    validatorStep2.disableValidator('accountUnitedTwo');
    

    validatorStep2.disableValidator('bankInformationUnited');
    validatorStep2.disableValidator('bankInformationOthers');
    validatorStep2.disableValidator('inputMexico_SWIFT');
    validatorStep2.disableValidator('inputMexico_clabe');
    
    validatorStep2.disableValidator('othersSwiftOne');
    validatorStep2.disableValidator('othersAccountOne');
    validatorStep2.disableValidator('othersAccountTwo');
    validatorStep2.disableValidator('othersTransitTwo');
    

    $("input[name='bankInformationUnited']").prop('checked', false);
    $("input[name='bankInformationOthers']").prop('checked', false);

    if($(this).val() === 'USD'){
        blockUnitedState.style.display = 'block';
        blockMexico.style.display = 'none';
        blockOthersCurrency.style.display = 'none';
        // Deseleccionar el radio button antes de que ocurra el evento change
        validatorStep2.enableValidator('bankInformationUnited');
        
        $("input[name='bankInformationUnited']").change(function(){
            const selectedValue = $(this).val();
            handleBankInformationChange(selectedValue, unitedSelectOne, unitedSelectTwo, validatorStep2);
        });
    }else if($(this).val() === 'MXN'){
        blockUnitedState.style.display = 'none';
        blockMexico.style.display = 'block';
        blockOthersCurrency.style.display = 'none';
        validatorStep2.enableValidator('inputMexico_SWIFT');
        validatorStep2.enableValidator('inputMexico_clabe');
    }else{
        blockUnitedState.style.display = 'none';
        blockMexico.style.display = 'none';
        blockOthersCurrency.style.display = 'block';
        validatorStep2.enableValidator('bankInformationOthers');
        
        $("input[name='bankInformationOthers']").change(function(){
            const selectedValue = $(this).val();
            handleBankInformationOthersChange(selectedValue, othersSelectOne, othersSelectTwo, validatorStep2);
        });
    }
});

//text area option united state
var checkBoxUnitedOne = document.getElementById('checkBoxUnitedOne');
var instrUnitedOne = document.getElementById('instructionsUnitedStateOne'); 
var checkBoxUnitedTwo = document.getElementById('checkBoxUnitedTwo');
var instrUnitedTwo = document.getElementById('instructionsUnitedStateTwo');
checkBoxUnitedOne.addEventListener('click', function(){
    if(checkBoxUnitedOne.checked === true ){
        instrUnitedOne.style.display = "block";
    }else{
        instrUnitedOne.style.display = "none";
    }
});

checkBoxUnitedTwo.addEventListener('click', function(){
    if(checkBoxUnitedTwo.checked === true ){
        instrUnitedTwo.style.display = "block";
    }else{
        instrUnitedTwo.style.display = "none";
    }
});

//text area option others
var checkBoxOthersOne = document.getElementById('checkBoxOthersOne');
var instructionsSelectOne = document.getElementById('instructionsSelectOne');
var checkBoxOthersTwo = document.getElementById('checkBoxOthersTwo');
var instructionsSelectTwo = document.getElementById('instructionsSelectTwo');

checkBoxOthersOne.addEventListener('click', function(){
    if(checkBoxOthersOne.checked === true ){
        instructionsSelectOne.style.display = "block";
    }else{
        instructionsSelectOne.style.display = "none";
    }
});

    checkBoxOthersTwo.addEventListener('click', function(){
    if(checkBoxOthersTwo.checked === true ){
        instructionsSelectTwo.style.display = "block";
    }else{
        instructionsSelectTwo.style.display = "none";
    }
});

//text area option mexico
var checkBoxMexico = document.getElementById('checkBoxMexico');
var instructions = document.getElementById('instructions');

checkBoxMexico.addEventListener('click', function(){
    if(checkBoxMexico.checked === true ){
        instructions.style.display = "block";
    }else{
        instructions.style.display = "none";
    }
});
function getStep1Data() {
    var step1Data = {};
    // Recorrer los inputs del paso 1 que no están ocultos
    $(".current :input:visible").each(function() {
        // Excluir elementos ocultos
        if ($(this).is(":visible")) {
            if($(this).is(":radio")){
                if($(this).is(":checked") && $(this).val() !== "Others"){
                    step1Data[$(this).attr('name')] = $(this).val();
                }else if ($(this).is("textarea") && $(this).css("display") !== "none") {
                    step1Data[$(this).attr('name')] = $(this).val();
                }
            }else{
                step1Data[$(this).attr('name')] = $(this).val();
            }
        }
    });

    return step1Data;
}
function getStep2Data() {
    var step2Data = {};
    var foundTextarea = false;
    // Recorrer los inputs del paso 2 que no están ocultos
    $(".current :input:visible").each(function () {
        // Excluir elementos ocultos
        if ($(this).is(":visible") && $(this).css("display") !== "none" && $(this).attr('name') !== 'checkbox' && !$(this).is(":radio")) {
            if ($(this).is("textarea")) {
                // Marcar que se encontró un textarea
                foundTextarea = true;
                step2Data[$(this).attr('name')] = $(this).val();
            } else {
                if ($(this).is(":radio")) {
                    if ($(this).is(":checked")) {
                        step2Data[$(this).attr('name')] = $(this).val();
                    }
                } else {
                    step2Data[$(this).attr('name')] = $(this).val();
                }
            }
        }
    });

    // Si no se encontró ningún textarea, asigna el valor predeterminado
    if (!foundTextarea) {
        step2Data['instruction'] = "";
    }

    return step2Data;
}

// Function to validate Step 1
const validateStep1 = async () => {
    return new Promise((resolve) => {
        validatorStep1.validate().then((status) => {
            resolve(status === 'Valid');
        });
    });
};

// Function to validate Step 2
const validateStep2 = async () => {
    return new Promise((resolve) => {
        validatorStep2.validate().then((status) => {
            resolve(status === 'Valid');
        });
    });
};

// Submit button handler
let step1Data;
let step2Data;
const submitButton = document.getElementById('kt_docs_formvalidation_text_submit');
submitButton.addEventListener('click', async function (e) {
    // Prevent default button action
    e.preventDefault();
    // Validate the form based on the current step
    if (index === 0) {
        // Validate the form for step 1
        let isValidStep1 = await validateStep1();

        if (isValidStep1) {
            // Move to the next step if validation is successful
            step1Data = getStep1Data();
            stepper.goNext();
            index += 1;
        }
    } else if (index === 1) {
        // Validate the form for step 2
        let isValidStep2 = await validateStep2();
        if (isValidStep2) {
            // Move to the next step if validation is successful
            step2Data = getStep2Data();
            stepper.goNext();
            index += 1;
            // Generate HTML for step 3 and append it to a container
            generateStep3HTML(step1Data, step2Data);
        }
    } 
});

function generateStep3HTML(step1Data, step2Data) {
    // Obtén la referencia al div donde quieres insertar la tabla
    const step3Content = document.getElementById('tableBeneficiary');
    step3Content.innerHTML ='';
    
    const step3ContentBank = document.getElementById('tableBank');
    step3ContentBank.innerHTML ='';
    // Crea la tabla y sus elementos
    const table = document.createElement('table');
    table.classList.add('table', 'fs-6', 'fw-semibold', 'gs-0', 'gy-2', 'gx-2', 'm-0');

    const table2 = document.createElement('table');
    table2.classList.add('table', 'fs-6', 'fw-semibold', 'gs-0', 'gy-2', 'gx-2', 'm-0');
    const names = {
        text_name : 'Name',
        text_nickname : 'Nickname',
        select2_country : 'Country',
        text_address : 'Address line',
        text_city : 'City',
        text_state : 'State/Province',
        text_postal : 'Postal code',
        text_email : 'Email address',
        select2Purpose : 'Purpose of payment',
        purpose : 'Purpose of payment description',
        input_textArea : 'Purpose of payment description',
        select2Bank_countries : 'Bank country',
        select2Bank_currency : 'Currency',
        bankName : 'Bank name',
        bankAdressLine : 'Adress line',
        instruction: 'Sending bank instructions',

        ABAunitedOne : 'ABA number',
        SWIFTunitedOne: 'SWIFT',
        othersSwiftOne: 'SWIFT',
        othersTransitTwo: 'Transit code',
        inputMexico_SWIFT: 'SWIFT',
        
        accountUnitedOne : 'Account number',
        accountUnitedTwo : 'Account number',
        othersAccountOne : 'Account number',
        othersAccountTwo : 'Account number',
        inputMexico_clabe: 'CLABE',

        instructionsUSDOne : 'Sending bank instructions',
        instructionsUSDTwo : 'Sending bank instructions',
        instructionsOtherstOne: 'Sending bank instructions',
        instructionsOtherstTwo: 'Sending bank instructions',
        instructionsMXN: 'Sending bank instructions',
    }
    // Itera sobre los datos y crea las filas de la tabla
    for (const key in step1Data) {
        const row = document.createElement('tr');
        const labelCell = document.createElement('td');
        const valueCell = document.createElement('td');
        labelCell.classList.add('text-gray-600');
        labelCell.textContent = names[key] || key.charAt(0).toUpperCase() + key.slice(1);

        valueCell.classList.add('text-gray-800', 'text-end');
        //varificar si la clave es country para agregar la img:
        if(key.toLowerCase() === 'select2_country'){
            const symbolSpan = document.createElement('span');
            symbolSpan.classList.add('symbol', 'symbol-20px', 'p-0');

            const flagImage = document.createElement('img');
            flagImage.classList.add('rounded-0');
            flagImage.src = '/assets/media/flags/countries/' + step1Data[key] + '.svg';

            symbolSpan.appendChild(flagImage);
            valueCell.appendChild(symbolSpan);
            
            const countryText = document.createElement('span');
            countryText.textContent = step1Data[key];
            valueCell.appendChild(countryText);
        }
        else{
            valueCell.textContent = step1Data[key];
        }

        row.appendChild(labelCell);
        row.appendChild(valueCell);

        table.appendChild(row);
    }

    // Itera sobre los datos y crea las filas de la tabla
    for (const key in step2Data) {
        const row2 = document.createElement('tr');
        const labelCell2 = document.createElement('td');
        const valueCell2 = document.createElement('td');
        labelCell2.classList.add('text-gray-600');
        valueCell2.classList.add('text-gray-800', 'text-end');
        if (step2Data[key] !== '') {
            labelCell2.textContent = names[key] || key.charAt(0).toUpperCase() + key.slice(1);
            
            //varificar si la clave es country para agregar la img:
            if(key === 'select2Bank_countries'){
                const symbolSpan = document.createElement('span');
                symbolSpan.classList.add('symbol', 'symbol-20px', 'p-0');

                const flagImage = document.createElement('img');
                flagImage.classList.add('rounded-0');
                flagImage.src = '/assets/media/flags/countries/' + step2Data[key] + '.svg';

                symbolSpan.appendChild(flagImage);
                valueCell2.appendChild(symbolSpan);
                
                const countryText = document.createElement('span');
                countryText.textContent = step2Data[key];
                valueCell2.appendChild(countryText);
            }else if(key === 'select2Bank_currency'){
                const symbolSpan = document.createElement('span');
                symbolSpan.classList.add('symbol', 'symbol-20px', 'p-0');

                const flagImage = document.createElement('img');
                flagImage.classList.add('rounded-0');
                flagImage.src = '/assets/media/flags/' + step2Data[key] + '.svg';

                symbolSpan.appendChild(flagImage);
                valueCell2.appendChild(symbolSpan);
                
                const countryText = document.createElement('span');
                countryText.textContent = step2Data[key];
                valueCell2.appendChild(countryText);
            }else{
                valueCell2.textContent = step2Data[key];
            }
        } else {
            // La clave no existe en step2Data
            labelCell2.textContent = names[key];
            valueCell2.textContent = 'N/A';
        }
        row2.appendChild(labelCell2);
        row2.appendChild(valueCell2);

        table2.appendChild(row2);
    }
    
    if(buttons === 1){
        // Crear el boton:
        // Crea el elemento button de submmit
        const button = document.createElement("button");
        
        // Establece los atributos del botón
        button.type = "submit";
        button.id = "formSubmitCreate";
        button.className = "text-primary btn btn-warning w-200px rounded hover-scale";
        
        // Establece el texto del botón
        button.textContent = "Create beneficiary";

        // Obtén el div con el id 'buttonCreate'
        const buttonCreateDiv = document.getElementById("buttonCreate");
        buttonCreateDiv.innerHTML = '';
        // Agrega el botón al div
        buttonCreateDiv.appendChild(button);
        // Agrega la tabla al contenido del paso 3
        step3Content.appendChild(table);
        step3ContentBank.appendChild(table2);

        // Previous button handler
        const formSubmit = document.getElementById('formSubmitCreate');
        formSubmit.addEventListener('click', async function (e) {
            e.preventDefault();

            // Populate the page loading element dynamically.
            // Optionally you can skipt this part and place the HTML
            // code in the body element by refer to the above HTML code tab.
            const loadingEl = document.createElement("div");
            document.body.prepend(loadingEl);
            loadingEl.classList.add("page-loader");
            loadingEl.classList.add("flex-column");
            loadingEl.classList.add("bg-dark");
            loadingEl.classList.add("bg-opacity-25");
            loadingEl.innerHTML = `
                <span class="spinner-border text-primary" role="status"></span>
                <span class="text-gray-800 fs-6 fw-semibold mt-5">Loading...</span>
            `;

            // Show page loading
            KTApp.showPageLoading();
            const response = await axios.post('/admin/newBeneficiaries',{step1Data, step2Data});
            KTApp.hidePageLoading();
            loadingEl.remove();
            if(response.data === 'success'){
                //función para ir a la página de success
                window.location.href = "/admin/beneficiaries/success";
            }else {
                Swal.fire({
                    text: `Beneficiary creation failed!. Please review the entered information and try again`,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-danger"
                    }
                });
            }
            
        });
    }else if(buttons === 2){
        // Crear el boton:
        // Crea el elemento button de submmit
        const button = document.createElement("button");
        
        // Establece los atributos del botón
        button.type = "submit";
        button.id = "formSubmitEdit";
        button.className = "text-primary btn btn-warning w-200px rounded hover-scale";
        
        // Establece el texto del botón
        button.textContent = "Save changes";

        // Obtén el div con el id 'buttonCreate'
        const buttonCreateDiv = document.getElementById("buttonCreate");
        buttonCreateDiv.innerHTML = '';
        // Agrega el botón al div
        buttonCreateDiv.appendChild(button);
        // Agrega la tabla al contenido del paso 3
        step3Content.appendChild(table);
        step3ContentBank.appendChild(table2);

        // Previous button handler
        const formSubmit = document.getElementById('formSubmitEdit');
        formSubmit.addEventListener('click', async function (e) {
            e.preventDefault();

            // Populate the page loading element dynamically.
            // Optionally you can skipt this part and place the HTML
            // code in the body element by refer to the above HTML code tab.
            const loadingEl = document.createElement("div");
            document.body.prepend(loadingEl);
            loadingEl.classList.add("page-loader");
            loadingEl.classList.add("flex-column");
            loadingEl.classList.add("bg-dark");
            loadingEl.classList.add("bg-opacity-25");
            loadingEl.innerHTML = `
                <span class="spinner-border text-primary" role="status"></span>
                <span class="text-gray-800 fs-6 fw-semibold mt-5">Loading...</span>
            `;

            // Show page loading
            KTApp.showPageLoading();
            const response = await axios.post('/admin/editBeneficiaries',{step1Data, step2Data, beneId});
            KTApp.hidePageLoading();
            loadingEl.remove();
            if(response.data === 'success'){
                Swal.fire({
                    text: `Beneficiary edit success!.`,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-success"
                    },
                    allowOutsideClick: false,
                }).then((result) => {
                    if(result.isConfirmed){
                        location.reload();
                    }
                })
            }else {
                Swal.fire({
                    text: `Beneficiary edit failed!. Please review the entered information and try again`,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-danger"
                    }
                });
            }
        });
    }
    
}

const previousButton = document.getElementById('previousButton'); // Asume que tienes un botón con id 'previousButton'
previousButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();
    // Move to the previous step
    stepper.goPrevious();
    index -= 1;
});

function abrirModalBeneficiaries(e) {
    e.preventDefault();
    // Limpiar el formulario antes de abrir el modal
    limpiarFormulario();
    // Ir al paso 1 del Stepper
    index = 0;
    stepper.goTo(1);
    buttons = 1;
    blockUnitedState.style.display = 'none';
    blockMexico.style.display = 'none';
    blockOthersCurrency.style.display = 'none';
    let specificTextarea = document.getElementById('specificTextarea');
    specificTextarea.style.display = 'none';
    // Abrir el modal
    $('#kt_create_beneficiaries').modal('show');
}


const modalCreate = document.getElementById('create');
modalCreate.addEventListener('click', (e) => abrirModalBeneficiaries(e));

const modalCreateSecond = document.getElementById('createSecond');
modalCreateSecond.addEventListener('click', (e) => abrirModalBeneficiaries(e));

////
// Format options country with select2
let optionFormat = function(item) {
    if (!item.id) {
        return item.text;
    }

    let span = document.createElement('span');
    let imgUrl = item.element.getAttribute('data-kt-select2-country');
    let template = '';

    // Usa una imagen predeterminada si no se proporciona ninguna
    template += '<img src="' + (imgUrl || '/assets/media/flags/countries/default-image.svg') + '" class="rounded-circle h-20px me-2" alt="image"/>';
    template += item.text;

    span.innerHTML = template;
    return $(span);
}
// Init Select2 --- more info: https://select2.org/
$('#kt_docs_select2_country').select2({
    dropdownParent: $("#kt_create_beneficiaries"),
    templateSelection: optionFormat,
    templateResult: optionFormat,
});

$('#kt_docs_select2_purpose').select2({
    dropdownParent: $("#kt_create_beneficiaries"),
});
$('#kt_docs_select2_currency').select2({
    templateSelection:optionFormat,
    templateResult: optionFormat,
    dropdownParent: $("#kt_create_beneficiaries"),
});
$('#kt_docs_select2_bankCountry').select2({
    dropdownParent: $("#kt_create_beneficiaries"),
    templateSelection:optionFormat,
    templateResult: optionFormat,
});
$('#searchCurrency').select2({
    templateSelection:optionFormat,
    templateResult: optionFormat,
});
///DataTable de beneficiarios

"use strict";
		
// Class definition
let KTDatatablesServerSide = function () {
    // Shared variables
    let table;
    let dt;
    let filterPayment;

    // Private functions
    let initDatatable = function () {
        dt = $("#kt_datatable_holddingDetail").DataTable({
            searchDelay: 100,
            processing: true,
            serverSide: true,
            ajax: {
                url: "http://localhost:3200/admin/getListBeneficiaries",
            },
            columns: [
                { data: 'nickname' },
                { data: 'currency' },
                { data: 'bank_name'},
                { data: 'account_number'},
                { data: 'status'},
                { data: null },
            ],
            columnDefs:[
                {
                    targets: 4,
                    orderable: false,
                    render: function (data, type, row) {
                        // Puedes personalizar el contenido y agregar clases aquí
                        var color = row.color; // Sustituye con tu lógica para determinar el color
                        var symbol = row.symbol; // Sustituye con tu lógica para obtener el símbolo
                        var icon = row.icon; // Sustituye con tu lógica para obtener el icono
                        return '<td><div class="badge badge-light-' + color + '"> ' + data + '</div></td>';
                    }
                },
                {
                    targets: -1,
                    data: null,
                    orderable: false,
                    className: 'text-center',
                    render: function (data, type, row) {
                        return `
                            <a href="#" class="btn-actions btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions 
                            <i class="ki-outline ki-down fs-5 ms-1"></i></a>
                            <!--begin::Menu-->
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" data-currency-id="${row.id}" class="menu-link px-3" data-kt-docs-table-filter="edit_row" data-bs-toggle="modal" ><i class="ki-outline ki-user-edit fs-1"></i>Edit</a>
                                </div>
                                <!--end::Menu item-->
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" data-currency-id="${row.id}" class="menu-link px-3" data-kt-docs-table-filter="details_row"><i class="ki-outline ki-tablet-text-up fs-1"></i>Details</a>
                                </div>
                                <!--end::Menu item-->
                            </div>
                            <!--end::Menu-->
                        `;
                    },
                }
            ]
        });
        table = dt.$;

        dt.on('draw', function () {
            KTMenu.createInstances();
            handleDeleteRows();
        });
        
        dt.on('draw.dt', function () {
            if (dt.page.info().recordsTotal === 0) {
                $('#kt_datatable_holddingDetail_wrapper').hide();
                $('#customEmptyMessage').show();
            } else {
                $('#kt_datatable_holddingDetail_wrapper').show();
                $('#customEmptyMessage').hide();
            }
        });
    }

    let handleSearchDatatableCurrency = function () {
        const filterSearch = $('#searchCurrency'); // Cambiado a jQuery para trabajar con select2

        // Suscribe al evento 'select2:select' en lugar de 'change'
        filterSearch.on('select2:select', function (e) {
        const idToSearch = e.params.data.id; // Usar id en lugar de value para select2
        if (dt) { // Asegúrate de que dt esté definido
            dt.column(1)
            .search(idToSearch)
            .draw();
        }
        });
    };

    let handleSearchDatatable = function () {
        const filterSearch = document.querySelector('[data-kt-docs-table-filter="searchDeal"]');
        filterSearch.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                performSearch();
                filterSearch.blur();
            }
        });
        filterSearch.addEventListener('blur', function () {
            performSearch();
        });
        function performSearch() {
            const search = filterSearch.value;
            if (dt) {
                dt.column(0)
                    .search(search)
                    .draw();
            }
        }
    };

    // Delete customer
    let handleDeleteRows = () => {
        
        // Select all delete buttons
        const detailButtons = document.querySelectorAll('[data-kt-docs-table-filter="details_row"]');
        const editButtons = document.querySelectorAll('[data-kt-docs-table-filter="edit_row"]');
        // Función asincrónica para manejar la solicitud POST
        const handleEditClick = async (e) => {
            e.preventDefault();
            limpiarFormulario();
            const loadingEl = document.createElement("div");
            document.body.prepend(loadingEl);
            loadingEl.classList.add("page-loader");
            loadingEl.classList.add("flex-column");
            loadingEl.classList.add("bg-dark");
            loadingEl.classList.add("bg-opacity-25");
            loadingEl.innerHTML = `
                <span class="spinner-border text-primary" role="status"></span>
                <span class="text-gray-800 fs-6 fw-semibold mt-5">Loading...</span>
            `;

            // Show page loading
            KTApp.showPageLoading();

            beneId = parseInt(e.currentTarget.getAttribute('data-currency-id'));
            let response = await axios.post('/admin/getBeneficiariesById', { beneId });
            let beneData = response.data.bene; 
            //llenar el formulario
            document.getElementById('nameBeneficiary').value = beneData.name;
            document.getElementById('nicknameBeneficiary').value = beneData.nickname;
            $('#kt_docs_select2_country').val(beneData.countryName).trigger('change');
            document.getElementById('addressBeneficiary').value = beneData.address1 !== '' ? beneData.address1 : beneData.address2;
            document.getElementById('cityBeneficiary').value = beneData.city;
            document.getElementById('stateBeneficiary').value = beneData.province;
            document.getElementById('postalCodeBeneficiary').value = beneData.postal;
            document.getElementById('emailBeneficiary').value = beneData.email;
            $('#kt_docs_select2_purpose').val(beneData.purposeName).trigger('change');
            let radioPurpose = document.querySelector('input[name="purpose"][value="'+beneData.purposeDescription+'"]');
            if(radioPurpose === null){
                radioPurpose = document.querySelector('input[name="purpose"][value="Others"]');
                document.getElementById('floatingSpecific').value = beneData.purposeDescription;
            }
            if (radioPurpose) {
                radioPurpose.checked = true;
                // Muestra el área de texto
                document.getElementById('specificTextarea').style.display = 'block';
            }
            $('#kt_docs_select2_currency').val(beneData.currencyName).trigger('change');
            $('#kt_docs_select2_bankCountry').val(beneData.mainBank.countryName).trigger('change');
            document.getElementById('nameBank').value = beneData.mainBank.name;
            document.getElementById('addressBank').value = beneData.mainBank.address1 !== '' ? beneData.mainBank.address1 : beneData.mainBank.address2;
            
            if(beneData.currencyName === 'MXN'){
                document.getElementById('mexicoClabe').value = beneData.mainBank.accountNumber;
                document.getElementById('mexicoSwift').value = beneData.mainBank.routingCode;
                document.getElementById('textAreaInstructions').value = beneData.mainBank.instructions;
            }
            if(beneData.currencyName === 'USD'){
                let unitedSelectOne = document.getElementById('unitedSelectOne');
                let unitedSelectTwo = document.getElementById('unitedSelectTwo');
                if(beneData.mainBank.routingCodeType === 'aba'){
                    let radioPurpose = document.querySelector('input[name="bankInformationUnited"][value="ABA"]');
                    radioPurpose.checked = true;
                    handleBankInformationChange('ABA', unitedSelectOne, unitedSelectTwo, validatorStep2);
                    document.getElementById('abaUsdOne').value = beneData.mainBank.routingCode;
                    document.getElementById('accountUsdOne').value = beneData.mainBank.accountNumber;
                    document.getElementById('textAreaUnitedStateOne').value = beneData.mainBank.instructions;
                }else if(beneData.mainBank.routingCodeType === 'swift'){
                    let radioPurpose = document.querySelector('input[name="bankInformationUnited"][value="SWIFT"]');
                    radioPurpose.checked = true;
                    handleBankInformationChange('SWIFT', unitedSelectOne, unitedSelectTwo, validatorStep2);
                    document.getElementById('abaUsdTwo').value = beneData.mainBank.routingCode;
                    document.getElementById('accountUsdTwo').value = beneData.mainBank.accountNumber;
                    document.getElementById('textAreaUnitedStateTwo').value = beneData.mainBank.instructions;
                }
            }else{
                let othersSelectOne = document.getElementById('othersSelectOne');
                let othersSelectTwo = document.getElementById('othersSelectTwo');
                if(beneData.mainBank.routingCodeType === 'swift' || beneData.mainBank.routingCodeType === 'generic'){
                    let radioPurpose = document.querySelector('input[name="bankInformationOthers"][value="SWIFT"]');
                    radioPurpose.checked = true;
                    handleBankInformationOthersChange('SWIFT', othersSelectOne, othersSelectTwo, validatorStep2);
                    document.getElementById('swiftOtherOne').value = beneData.mainBank.routingCode;
                    document.getElementById('accountOthersOne').value = beneData.mainBank.accountNumber;
                    document.getElementById('textSelectOne').value = beneData.mainBank.instructions;
                }else if(beneData.mainBank.routingCodeType === 'transitCode'){
                    let radioPurpose = document.querySelector('input[name="bankInformationOthers"][value="transitCode"]');
                    radioPurpose.checked = true;
                    handleBankInformationOthersChange('transitCode', othersSelectOne, othersSelectTwo, validatorStep2);
                    document.getElementById('transitOthersTwo').value = beneData.mainBank.routingCode;
                    document.getElementById('accountOthersTwo').value = beneData.mainBank.accountNumber;
                    document.getElementById('textSelectTwo').value = beneData.mainBank.instructions;
                }
            }

            // Ir al paso 1 del Stepper
            stepper.goTo(1);
            index=0;
            //Abrir el modal
            buttons = 2;
            $('#kt_create_beneficiaries').modal('show');
            //cerrar el loading
            KTApp.hidePageLoading();
            loadingEl.remove();
        };

        // Asigna la función asincrónica al evento click de los botones "Edit"
        editButtons.forEach(d => {
            d.addEventListener('click', handleEditClick);
        });

        detailButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                const beneId = e.currentTarget.getAttribute('data-currency-id');
                // Redirect
                window.location.href = `http://localhost:3200/admin/getBeneficiaries/detail/${beneId}`;
            })
        });
    }

        // Public methods
    return {
        init: function () {
            initDatatable();
            handleSearchDatatable();
            handleDeleteRows();
            handleSearchDatatableCurrency();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTDatatablesServerSide.init();
});