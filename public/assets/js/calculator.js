// Format options

var optionFormat1 = function(item) {
    if ( !item.id ) {
        return item.text;
    }

    var span = document.createElement('span');
    var imgUrl = item.element.getAttribute('data-kt-select2-country');
    var template = '';

    template += '<img src="' + imgUrl + '" class="rounded-circle h-20px me-2" alt="image"/>';
    template += item.text;

    span.innerHTML = template;

    return $(span);
}

function initSelect2(){
    // Init Select2 --- más información: https://select2.org/
    $('#currencyRecibe').select2({
        templateSelection: optionFormat1,
        templateResult: optionFormat1
    });

    // Init Select2 --- más información: https://select2.org/
    $('#currencySend').select2({
        templateSelection: optionFormat1,
        templateResult: optionFormat1
    });
}

initSelect2();

// Recharge Calculator
let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");

let speed = 300; // Velocidad de la animación en milisegundos
let progress;
let status = true;

function updateProgress() {
    let totalSeconds = 30;
    let progressValue = 100;
    let progressEndValue = 0;

    progress = setInterval(async () => {
        if(status === true){
            progressValue--;
            // Calcular los segundos restantes
            let secondsRemaining = (progressValue / 100) * totalSeconds;

            // Cambiar el color según el porcentaje
            let color = getColorByPercentage(progressValue);
            valueContainer.textContent = `${secondsRemaining.toFixed(0)} sec`;
            progressBar.style.background = `conic-gradient(
                ${color} ${progressValue * 3.6}deg,
                #cadcff ${progressValue * 3.6}deg
            )`;
            if (progressValue === progressEndValue) {
                clearInterval(progress);
                showLoadingInStep("cardStep1");
                let currencySend = $('#currencySend').val();
                let currencyRecibe = $('#currencyRecibe').val();
                let response = await axios.post('/admin/paymentsCurrency', {
                    currencyRecibe
                });
                let buyFormat = response.data.buyFormat;
                let sellFormat = response.data.sellFormat;

                // Actualizar el contenido de los botones
                $('#buttonBuy').html(`Buy ${buyFormat}`);
                $('#buttonSell').html(`Sell ${sellFormat}`);

                // Actualizar los valores de los inputs hidden
                buy = response.data.buy;
                sell = response.data.sell;
                let inputSend = document.getElementById('sendInput').value;
                let inputRecib = document.getElementById('recibeInput');

                let send = parseFloat(inputSend.replace(/[^0-9.]/g, '')) * parseFloat(buy);
                inputRecib.value = send.toFixed(2);
                updateValueSend();
                hideLoadingInStep("cardStep1");
                updateProgress();
            }
        }
    }, speed);
}

function getColorByPercentage(percentage) {
    if (percentage >= 63) {
        return '#2ecc71'; // Verde
    } else if (percentage >= 33.3) {
        return '#f39c12'; // Naranja
    } else {
        return '#e74c3c'; // Rojo
    }
}

// Llamar a la función para iniciar la animación
updateProgress();

// Función para reanudar la animación
function toggleAnimationStart() {
    status = true;
    clearInterval(progress);
    if (status) {
        // Si la animación estaba pausada, la reanudamos
        updateProgress();
    }
}
// Función para pausarla animación
function toggleAnimationStop() {
    status = false;
    clearInterval(progress);
    if (status) {
        updateProgress();
    }
}

////////////////////////////////
var element1 = document.querySelector("#stepper_payment");

// Initialize Stepper
var stepperPayment = new KTStepper(element1);

//functions with inputs
Inputmask("999,999.99", {
    "numericInput": true
}).mask("#sendInput");

Inputmask("9,999,999.99", {
    "numericInput": true
}).mask("#recibeInput");

// Función para mostrar y ocultar el loading dentro del contenedor del paso 1
function showLoadingInStep(cardStep) {
    var card = document.getElementById(cardStep);
    var loader = card.querySelector(".loader");

    if(!loader){
        loader = document.createElement("div");
        loader.className = "loader";
        card.appendChild(loader);
    }
}

function hideLoadingInStep(cardStep) {
    var card = document.getElementById(cardStep);
    var loader = card.querySelector(".loader");

    if(loader){
        loader.remove();
    }
}

/////
let buy = document.getElementById('buy').value;
let sell = document.getElementById('sell').value;

let sendInput = document.getElementById('sendInput').value;
let recibeInput = document.getElementById('recibeInput');

let send = parseFloat(sendInput.replace(/[^0-9.]/g, '')) * parseFloat(buy);
recibeInput.value = send.toFixed(2);
calculateAmountSavings(send,parseFloat(sendInput.replace(/[^0-9.]/g, '')));
function calculateAmountSavings(receive, send) {
    let exchangeRate = getExchangeRateByType();
    let savings;
    if (exchangeRate.type === "buy") {
    savings = receive - send * (exchangeRate.rate * 0.9965);
    } else {
    savings = receive * (exchangeRate.rate * 1.0035) - send;
    }
    let fixedAmount = savings < 100 ? savings.toFixed(2) : savings.toFixed(2);

    let currencyRecibeText;
    currencyRecibeText = $('#currencyRecibe option:selected').text().trim();

    $("#saving").html(formatCurrency(fixedAmount) + " " + currencyRecibeText);
    
}

function formatCurrency(number) {
    if (isNaN(number)) return "";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getExchangeRateByType(type) {
    let buttonBuy = document.getElementById('buttonBuy');
    let buttonSell = document.getElementById('buttonSell');
    let rate;
    if (buttonBuy.classList.contains('active')) {
        rate = buy;
        return {rate, type: "buy"};
    }else if(buttonSell.classList.contains('active')){
        rate = sell;
        return {rate, type: "sell"};
    }
}

function getDateNow(){
    const currentDate = new Date();
    const dia = addZero(currentDate.getDate());
    const mes = addZero(currentDate.getMonth() + 1);
    const anio = currentDate.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

function addZero(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

let clickBuy = true;
let clickSell = false;
function updateValueRecieve(){
    let recibeInput = document.getElementById('recibeInput').value;
    let sendInput = document.getElementById('sendInput');

    let recibe = parseFloat(recibeInput.replace(/[^0-9.]/g, ''));
    if(clickBuy === true){
        recibe = recibe / parseFloat(buy);
        sendInput.value = recibe.toFixed(2);
        calculateAmountSavings(parseFloat(recibeInput.replace(/[^0-9.]/g, '')),recibe);
    }else if(clickSell === true){
        recibe = recibe * parseFloat(sell);
        sendInput.value = recibe.toFixed(2);
        calculateAmountSavings(parseFloat(recibeInput.replace(/[^0-9.]/g, '')),recibe = recibe);
    }
}

function updateValueSend(){
    let sendInput = document.getElementById('sendInput').value;
    let recibeInput = document.getElementById('recibeInput');

    let send = parseFloat(sendInput.replace(/[^0-9.]/g, ''));
    if(clickBuy === true){
        send = send * parseFloat(buy);
        recibeInput.value = send.toFixed(2);
        calculateAmountSavings(send,parseFloat(sendInput.replace(/[^0-9.]/g, '')));
    }else if(clickSell === true){
        send = send / parseFloat(sell);
        recibeInput.value = send.toFixed(2);
        calculateAmountSavings(send,parseFloat(sendInput.replace(/[^0-9.]/g, '')));
    }
}

function changeSelects(button){
    $('#currencySend').select2('destroy');
    $('#currencyRecibe').select2('destroy');

    let selectSend = $('#currencySend').val();
    let selectRecibe = $('#currencyRecibe').val();
    
    // Obtener referencias a los elementos y sus HTML
    let containerSend = $('#containerCurrencySend');
    let containerRecibe = $('#containerCurrencyRecibe');
    
    let htmlSend = containerSend.html();
    let htmlRecibe = containerRecibe.html();

    containerSend.html();
    containerRecibe.html();
    // Intercambiar HTML entre los contenedores
    containerSend.html(htmlRecibe);
    containerRecibe.html(htmlSend);
    
    // Actualizar Select2 después de intercambiar
    initSelect2();
    $('#currencySend').val(selectSend).trigger('change');
    $('#currencyRecibe').val(selectRecibe).trigger('change');
    // Agregar o quitar la clase de rotación
    button.toggleClass('active');
}

function changeActive(event) {
    let buttonRotate = $("#swapCurrenciesBtn");
    let buttonBuy = document.getElementById("buttonBuy");
    let buttonSell = document.getElementById("buttonSell");

    let targetButton = event.target;
    if (targetButton === buttonBuy && !buttonBuy.classList.contains('active')) {
        buttonBuy.classList.add('active');
        buttonSell.classList.remove('active');
        clickBuy = true;
        clickSell = false;
        updateValueSend();
        changeSelects(buttonRotate);
    } else if (targetButton === buttonSell && !buttonSell.classList.contains('active')) {
        buttonSell.classList.add('active');
        buttonBuy.classList.remove('active');
        clickBuy = false;
        clickSell = true;
        updateValueSend();
        changeSelects(buttonRotate);
    }else if (event === "swapCurrenciesBtn") {
        // Lógica específica para el tercer botón
        // Verificar qué botón tiene la clase 'active'
        if (buttonBuy.classList.contains('active')) {
            buttonBuy.classList.remove('active');
            buttonSell.classList.add('active');
            clickBuy = false;
            clickSell = true;
            // Puedes agregar más lógica aquí si es necesario
        } else if (buttonSell.classList.contains('active')) {
            buttonSell.classList.remove('active');
            buttonBuy.classList.add('active');
            clickBuy = true;
            clickSell = false;
            // Puedes agregar más lógica aquí si es necesario
        }
        updateValueSend();
        changeSelects(buttonRotate);
    }

}

let containerRecibe = $('#containerCurrencyRecibe, #containerCurrencySend');
containerRecibe.on("select2:select", "#currencyRecibe", async function(e) {
    showLoadingInStep("cardStep1");
    clearInterval(progress);
    let currencyRecibe = e.target.value;

    let response = await axios.post('/admin/paymentsCurrency', {
        currencyRecibe
    });
    let buyFormat = response.data.buyFormat;
    let sellFormat = response.data.sellFormat;

    // Actualizar el contenido de los botones
    $('#buttonBuy').html(`Buy ${buyFormat}`);
    $('#buttonSell').html(`Sell ${sellFormat}`);

    // Actualizar los valores de los inputs hidden
    buy = response.data.buy;
    sell = response.data.sell;
    let inputSend = document.getElementById('sendInput').value;
    let inputRecib = document.getElementById('recibeInput');

    let send = parseFloat(inputSend.replace(/[^0-9.]/g, '')) * parseFloat(buy);
    inputRecib.value = send.toFixed(2);
    updateValueSend();
    updateProgress();
    hideLoadingInStep1("cardStep1");
}); 

//buttons 
let wid;
const buttonStep1 = document.getElementById('buttonStep1');
buttonStep1.addEventListener('click',async function(event) {
    showLoadingInStep("cardStep1");
    toggleAnimationStop();
    let dataCalculator = getDataCalculator();
    dataCalculator.sendInput = parseFloat(dataCalculator.sendInput.replace(/,/g, ''));
    wid = await axios.post('/admin/generateWid', {
        dataCalculator
    });
    wid = wid.data;
    hideLoadingInStep("cardStep1");
    stepperPayment.goNext();

});

const buttonContainer = document.querySelector('.btn-group');
buttonContainer.addEventListener('click', function(event) {
    changeActive(event);
});

// Evento al hacer clic en el botón de intercambio
$('#swapCurrenciesBtn').on('click', function(event) {
    changeActive("swapCurrenciesBtn");
});

var response = $('#response').data('beneficiaries');
$('#search').on('keyup', async function(event){
    if(event.key === 'Enter'){
        showLoadingInStep("cardStep2");
        let responseSearch = await axios.post('/admin/searchBeneficiaries', {
            search: $(this).val()
        });
        const containerBene = $('#beneficiaries');
        containerBene.empty();
        // Actualizar el contenido de los botones
        if (responseSearch.data.rows && responseSearch.data.rows.length > 0) {
            responseSearch.data.rows.forEach((beneficiary, index) => {
                const beneficiaryHtml = `
                <button type="button" class="d-flex align-items-center justify-content-start mt-2 mb-9 text-center btn btn-next-search w-100 btn-active-secondary" data-id="${beneficiary.id}">
                    <a href="#" class="btn btn-icon fs-1 btn-active-icon-gray-600 btn-text-gray-600 btn-bg-secondary btn-active-light-secondary">
                        <span class="fs-2">${beneficiary.twoWords}</span><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></i>
                    </a>
                    <div class="mx-5 text-start">
                        <p class="fw-bold mb-0 mt-0 fs-6">${beneficiary.nickname}</p>
                        <p class="mb-0 mt-0 text-gray-600">${beneficiary.bankNameFormat}</p>
                        <p class="mb-0 mt-0 text-gray-600">${beneficiary.accountNumber}<span class="ms-2">${beneficiary.currencyCode}, {{bankCountryName}}</span></p>
                    </div>
                    <div class="ms-auto">
                        <!--begin::Actions-->
                        <div class="d-flex flex-stack mx-5">
                            <!--begin::Wrapper-->
                            <div class="me-2">
                                    <i class="ki-outline ki-right fs-2hx"></i>
                            </div>
                            <!--end::Wrapper-->
                        </div>
                        <!--end::Actions-->
                    </div>
                </button>
                `;
                // Agregar el contenido del beneficiario al contenedor
                containerBene.append(beneficiaryHtml);
            });
            } else {
            // Si no hay beneficiarios, puedes mostrar un mensaje o realizar otra acción
            containerBene.html('<p>No se encontraron beneficiarios.</p>');
            }
        hideLoadingInStep("cardStep2");
        response = responseSearch.data.rows;
    }
})

$('#search').on('blur', async function(event){
    showLoadingInStep("cardStep2");
    let responseSearch = await axios.post('/admin/searchBeneficiaries', {
        search: $(this).val()
    });
    const containerBene = $('#beneficiaries');
    containerBene.empty();
    // Actualizar el contenido de los botones
    if (responseSearch.data.rows && responseSearch.data.rows.length > 0) {
        responseSearch.data.rows.forEach((beneficiary, index) => {
            const beneficiaryHtml = `
            <button type="button" class="d-flex align-items-center justify-content-start mt-2 mb-9 text-center btn btn-next-search w-100 btn-active-secondary" data-id="${beneficiary.id}">
                <a href="#" class="btn btn-icon fs-1 btn-active-icon-gray-600 btn-text-gray-600 btn-bg-secondary btn-active-light-secondary">
                    <span class="fs-2">${beneficiary.twoWords}</span><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></i>
                </a>
                <div class="mx-5 text-start">
                    <p class="fw-bold mb-0 mt-0 fs-6">${beneficiary.nickname}</p>
                    <p class="mb-0 mt-0 text-gray-600">${beneficiary.bankNameFormat}</p>
                    <p class="mb-0 mt-0 text-gray-600">${beneficiary.accountNumber}<span class="ms-2">${beneficiary.currencyCode}, {{bankCountryName}}</span></p>
                </div>
                <div class="ms-auto">
                    <!--begin::Actions-->
                    <div class="d-flex flex-stack mx-5">
                        <!--begin::Wrapper-->
                        <div class="me-2">
                                <i class="ki-outline ki-right fs-2hx"></i>
                        </div>
                        <!--end::Wrapper-->
                    </div>
                    <!--end::Actions-->
                </div>
            </button>
            `;
            // Agregar el contenido del beneficiario al contenedor
            containerBene.append(beneficiaryHtml);
        });
        } else {
        // Si no hay beneficiarios, puedes mostrar un mensaje o realizar otra acción
        containerBene.html('<p>No se encontraron beneficiarios.</p>');
        }
    hideLoadingInStep("cardStep2");
    response = responseSearch.data.rows;
});

// Handle next step 2
let bene;
let data;
const beneficiariesContainer = $('#beneficiaries');
beneficiariesContainer.on('click', '.btn-next-search', function(event) {
    let id = $(this).data('id');
    bene = searchBene(id, response);
    data = getDataCalculator();
    $('#send').html(`${data.sendInput} ${data.currencySendText}`);
    $('#recibe').html(`${data.recibeInput} ${data.currencyRecibeText}`);
    $('#rate').html(`${data.rate}`);
    $('#nickname1').html(`${bene.nickname} will receive`);
    $('#nickname2').html(`${bene.nickname}`);
    $('#bankname').html(`${bene.bankName}`);
    $('#bankCountry').html(`${bene.bankCountryName}`);
    $('#accountNumber').html(`${bene.accountNumber}`);
    $('#currency').html(`${bene.currencyCode}`);
    $('#sentOn').html(getDateNow());
    $('#arrive').html(getDateNow());
    stepperPayment.goNext(); // go next step
});

const buttonsNext = document.querySelectorAll('.btn-next');
buttonsNext.forEach(function (button){
    button.addEventListener('click', function(event) {
        let id = button.getAttribute('data-id');
        bene = searchBene(id, response);
        data = getDataCalculator();
        $('#send').html(`${data.sendInput} ${data.currencySendText}`);
        $('#recibe').html(`${data.recibeInput} ${data.currencyRecibeText}`);
        $('#rate').html(`${data.rate}`);
        $('#nickname1').html(`${bene.nickname} will receive`);
        $('#nickname2').html(`${bene.nickname}`);
        $('#bankname').html(`${bene.bankName}`);
        $('#bankCountry').html(`${bene.bankCountryName}`);
        $('#accountNumber').html(`${bene.accountNumber}`);
        $('#currency').html(`${bene.currencyCode}`);
        $('#sentOn').html(getDateNow());
        $('#arrive').html(getDateNow());
        stepperPayment.goNext(); // go next step
    });
});

// Handle next step only step 3
let responseHolding;
const buttonStep3 = document.getElementById('step3');
buttonStep3.addEventListener('click', async function(event){
    showLoadingInStep("cardStep3")
    let currencySend;
    currencySend = $('#containerCurrencySend #currencySend option:selected').val();

    if(!currencySend){
        currencySend = $('#containerCurrencySend #currencyRecibe option:selected').val();
    }
    responseHolding = await axios.post('/admin/getHolding', {
        currencySend
    });
    let currencyCode = responseHolding.data[0].currencyCode;
    let balance = responseHolding.data[0].balance;
    balance = formatCurrency(balance);
    $('#currencyCode').html(`${currencyCode} 0.00 fee - `);
    $('#balance').html(`${balance} ${currencyCode}`);
    hideLoadingInStep("cardStep3");
    stepperPayment.goNext();
});

// Handle next step only step 4
const buttonStep4 = document.getElementById('btn-next-card');
buttonStep4.addEventListener('click', async function(event){
    $('#currencyCodeCard2_1').html(`${data.currencySendText}`);
    $('#balanceCard2').html(`Funds ${responseHolding.data[0].balance} ${responseHolding.data[0].currencyCode}`);
    $('#currencyCodeCard2_2').html(`${data.currencySendText} ${data.sendInput}`);
    $('#recibe2').html(`${data.recibeInput} ${data.currencyRecibeText}`);
    $('#send2').html(`${data.sendInput} ${data.currencySendText}`);
    $('#sentOn2').html(getDateNow());
    $('#arrive2').html(getDateNow());
    stepperPayment.goNext();
});

const buttonSuccess = $('#confirmPayment');
buttonSuccess.on('click', async function(event){
    showLoadingInStep("card2");
    let data = getDataCalculator();
    let dataPayment = {
        bene,
        data,
        wid,
    }
    let responsePayment = await axios.post('/admin/sendPayment', {dataPayment});
    console.log(responsePayment);
    if(responsePayment.data.data !== undefined){
        
        $("#stepper_payment").hide();
        hideLoadingInStep("card2");
        $("#succcessPayment").show();
    }else{
        hideLoadingInStep("card2");
        Swal.fire({
            text: `${responsePayment.data}`,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
                confirmButton: "btn btn-danger"
            }
        });
    }
    
});

//cards
$("#btn-next-card").click(function(){
    $("#card1").hide();
    $("#card2").show();
});

$("#btn-card-previus").click(function(){
    $("#card2").hide();
    $("#card1").show();
});

// Handle previous step
const bottonsPrevius = document.querySelectorAll('.btn-previus');
bottonsPrevius.forEach(function (button){
    button.addEventListener('click', function(event) {
        stepperPayment.goPrevious(); // go next step
        console.log(button.getAttribute('data-id'));
        if(button.getAttribute('data-id') === "previusStep1"){
            toggleAnimationStart();
        }
    });
})

function searchBene(id, response){
    for(let i = 0; i < response.length; i++){
        if(response[i].id === parseFloat(id)){
            return response[i];
        }
    }
}

function getDataCalculator(){
    let rate;
    let buttonBuy = document.getElementById('buttonBuy');
    let buttonSell = document.getElementById('buttonSell');
    // Verificar si el botón tiene la clase 'active'
    if (buttonBuy.classList.contains('active')) {
        // Recoger el texto del botón
        rate = buttonBuy.textContent || buttonBuy.innerText;
    }else if(buttonSell.classList.contains('active')){
        rate = buttonSell.textContent || buttonSell.innerText;
    }

    let sendInput = document.getElementById('sendInput').value;
    sendInput = sendInput.replace(/[_\,]/g, '');
    sendInput = parseFloat(sendInput).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let recibeInput = document.getElementById('recibeInput').value;
    recibeInput = recibeInput.replace(/[_\,]/g, '');
    recibeInput = parseFloat(recibeInput).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let currencyRecibeText;
    let currencySendText;
    currencyRecibeText = $('#containerCurrencyRecibe #currencyRecibe option:selected').text().trim();
    currencyRecibeValue = $('#containerCurrencyRecibe #currencyRecibe option:selected').val();

    currencySendValue = $('#containerCurrencySend #currencySend option:selected').val();
    currencySendText = $('#containerCurrencySend #currencySend option:selected').text().trim();

    if(!currencySendText){
        currencySendText = $('#containerCurrencySend #currencyRecibe option:selected').text().trim();
        currencySendValue = $('#containerCurrencySend #currencyRecibe option:selected').val();
    }

    if (!currencyRecibeText) {
        currencyRecibeText = $('#containerCurrencyRecibe #currencySend option:selected').text().trim();
        currencyRecibeValue = $('#containerCurrencyRecibe #currencySend option:selected').val();
    } 
    rate = rate.replace(/Buy|Sell/g, '');
    let data = {
        rate,
        sendInput,
        recibeInput,
        currencyRecibeText,
        currencyRecibeValue,
        currencySendText,
        currencySendValue
    }
    return data;
}

// copy and paste
const target1 = document.getElementById("accountNameSuccess");
const button1 = target1.nextElementSibling;

clipboard1 = new ClipboardJS(button1, {
    target: target1,
    text: function () {
        return target1.innerHTML;
    }
});

clipboard1.on('success', function (e) {
    var checkIcon = button1.querySelector('.ki-check');
    var copyIcon = button1.querySelector('.ki-copy');
    console.log("check");
    // Exit check icon when already showing
    if (checkIcon) {
        return;
    }

    // Create check icon
    checkIcon = document.createElement('i');
    checkIcon.classList.add('ki-duotone');
    checkIcon.classList.add('ki-check');
    checkIcon.classList.add('fs-2x');

    // Append check icon
    button1.appendChild(checkIcon);

    // Highlight target
    const classes = ['text-success', 'fw-boldest'];
    target1.classList.add(...classes);

    // Highlight button
    button1.classList.add('btn-success');

    // Hide copy icon
    copyIcon.classList.add('d-none');

    // Revert button label after 3 seconds
    setTimeout(function () {
        // Remove check icon
        copyIcon.classList.remove('d-none');

        // Revert icon
        button1.removeChild(checkIcon);

        // Remove target highlight
        target1.classList.remove(...classes);

        // Remove button highlight
        button1.classList.remove('btn-success');
    }, 3000)
});

////
const target = document.getElementById('accountAdressSuccess');
const button = target.nextElementSibling;

clipboard = new ClipboardJS(button, {
    target: target,
    text: function () {
        return target.innerHTML;
    }
});

clipboard.on('success', function (e) {
    var checkIcon = button.querySelector('.ki-check');
    var copyIcon = button.querySelector('.ki-copy');
    console.log("check");
    // Exit check icon when already showing
    if (checkIcon) {
        return;
    }

    // Create check icon
    checkIcon = document.createElement('i');
    checkIcon.classList.add('ki-duotone');
    checkIcon.classList.add('ki-check');
    checkIcon.classList.add('fs-2x');

    // Append check icon
    button.appendChild(checkIcon);

    // Highlight target
    const classes = ['text-success', 'fw-boldest'];
    target.classList.add(...classes);

    // Highlight button
    button.classList.add('btn-success');

    // Hide copy icon
    copyIcon.classList.add('d-none');

    // Revert button label after 3 seconds
    setTimeout(function () {
        // Remove check icon
        copyIcon.classList.remove('d-none');

        // Revert icon
        button.removeChild(checkIcon);

        // Remove target highlight
        target.classList.remove(...classes);

        // Remove button highlight
        button.classList.remove('btn-success');
    }, 3000)
});

/////////////////////////////////////STEPPER NEW BENE////////
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
    let step1Data = {};

    // Recorrer los inputs del paso 1 que no están ocultos
    $(".current :input:visible").each(function() {
        // Excluir elementos ocultos
        if ($(this).is(":visible")) {
            const name = $(this).attr('name');
            
            // Verificar si el atributo name está definido
            if (name !== undefined) {
                if ($(this).is(":radio")) {
                    if ($(this).is(":checked") && $(this).val() !== "Others") {
                        step1Data[name] = $(this).val();
                    } else if ($(this).is("textarea") && $(this).css("display") !== "none") {
                        step1Data[name] = $(this).val();
                    }
                } else {
                    step1Data[name] = $(this).val();
                }

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
            const name = $(this).attr('name');

            // Verificar si el atributo name está definido
            if (name !== undefined) {
                if ($(this).is("textarea")) {
                    // Marcar que se encontró un textarea
                    foundTextarea = true;
                    step2Data[name] = $(this).val();
                } else {
                    if ($(this).is(":radio")) {
                        if ($(this).is(":checked")) {
                            step2Data[name] = $(this).val();
                        }
                    } else {
                        step2Data[name] = $(this).val();
                    }
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
    // Ir al paso 1 del Stepper
    buttons = 1;
    // Abrir el modal
    $('#kt_create_beneficiaries').modal('show');
}

const modalCreate = document.getElementById('create');
modalCreate.addEventListener('click', (e) => abrirModalBeneficiaries(e));

//First option format for select2
// Format options
var optionFormat1 = function(item) {
    if ( !item.id ) {
        return item.text;
    }

    var span = document.createElement('span');
    var imgUrl = item.element.getAttribute('data-kt-select2-country');
    var template = '';

    template += '<img src="' + imgUrl + '" class="rounded-circle h-20px me-2" alt="image"/>';
    template += item.text;

    span.innerHTML = template;

    return $(span);
}

function initSelect2(){
    // Init Select2 --- más información: https://select2.org/
    $('#currencyRecibe').select2({
        templateSelection: optionFormat1,
        templateResult: optionFormat1
    });

    // Init Select2 --- más información: https://select2.org/
    $('#currencySend').select2({
        templateSelection: optionFormat1,
        templateResult: optionFormat1
    });
}

initSelect2();


/////Opption format for select2
// Format options country
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
})