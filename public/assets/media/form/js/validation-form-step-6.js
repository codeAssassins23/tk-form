
/* eslint-disable prettier/prettier */
var maxFileDigitalSignature = 0;

// Init validartion 1
let validatorStep6 = FormValidation.formValidation(form, {
  fields: {
    nameAuthorizationMonex: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    titlePositionAuthorizationMonex: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateAuthorizationMonex: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    digitalSignature: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    acceptTerms: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
  },
  plugins: {
    trigger: new FormValidation.plugins.Trigger(),
    bootstrap: new FormValidation.plugins.Bootstrap5({
      rowSelector: '.fv-row',
      eleInvalidClass: '',
      eleValidClass: '',
    }),
  },
});

// Function to validate Step 1
const validateStep6 = async () => {
  return new Promise((resolve) => {
    validatorStep6.validate().then((status) => {
      // Verificar si hay archivos subidos en el Dropzone
      var digitalSignature = document.getElementById('digitalSignature').value;
      // Marcar el campo oculto según si hay archivos subidos o no
      if (digitalSignature !== '') {
        document.getElementById('digitalSignature').value = 'true';
      } else {
        document.getElementById('digitalSignature').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      // Resolver con el estado de validación del formulario
      resolve(status === 'Valid' && digitalSignature === 'true');
    });
  });
};

let stepp_6_prev = document.getElementById('stepp_6_prev');

stepp_6_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(5);
});

let stepp_6 = document.getElementById('stepp_6');

stepp_6.addEventListener('click', function () {
  let isValidStep6 = validateStep6();
  isValidStep6.then(async (value)  => {
    if (value) {
      stepsData= getData();
      console.log(stepsData, "final");
      function toggleOtherInputSend() {
        // Busca si el radio seleccionado es 'Otra'
        const isOtherSelected = Array.from(radios).some(radio => radio.checked && radio.value === 'Otra');
        
        // Muestra u oculta el div basado en si 'Otra' está seleccionado
        if (isOtherSelected) {
          stepsData.typeOfBusiness = document.getElementById('typeOfBusinessOthers').value;
        }
      }

      // Selecciona todos los inputs de tipo radio con el nombre 'typeOfBusiness'
      const radiosSend = document.querySelectorAll('input[name="typeOfBusiness"]');

      // Agrega el evento 'change' a cada radio button
      radiosSend.forEach(radio => radio.addEventListener('change', toggleOtherInput));

      // Llama a toggleOtherInput al cargar para establecer el estado inicial correcto
      toggleOtherInputSend();

      var isTheApplicantCheckBoxes = document.querySelectorAll('input[name="isTheApplicant"]:checked');

      // Crea un array para almacenar los valores
      var selectedIsTheApplicant = "";

      // Itera sobre los elementos marcados y agrega sus valores al array
      isTheApplicantCheckBoxes.forEach(function(checkbox1) {
        selectedIsTheApplicant= selectedIsTheApplicant + (checkbox1.value) + ", ";
      });

      // Selecciona todos los checkboxes marcados que tienen el nombre 'currenciesNeeded'
      var checkedBoxes = document.querySelectorAll('input[name="currenciesNeeded"]:checked');
      
      // Crea un array para almacenar los valores
      var selectedCurrencies = "";

      // Itera sobre los elementos marcados y agrega sus valores al array
      checkedBoxes.forEach(function(checkbox) {
        selectedCurrencies= selectedCurrencies + (checkbox.value) + ", ";
      });

      console.log(selectedCurrencies, "selectedCurrencies");

      if(selectedCurrencies === "" || stepsData.currenciesGeneral1 !== undefined){
        selectedCurrencies = stepsData.currenciesGeneral1.join(", ") + ", " + selectedCurrencies;
      }

      let bankCodeNumber;
      if(stepsData.bankCodeNumber !== undefined){
        bankCodeNumber = stepsData.bankCodeNumber;
      } else if(stepsData.bankIBAN !== undefined){
        bankCodeNumber = stepsData.bankIBAN;
      } else {
        bankCodeNumber = "";
      }

      let arrayBankInfo = [];

      // Verifica si hay datos disponibles en stepsData para el banco
      if(stepsData.nameBank !== undefined){
        arrayBankInfo.push({
          nameBank: stepsData.nameBank,
          addressBank: stepsData.addressBank,
          accountNumber: stepsData.accountNumber,
          routingNumber: stepsData.routingNumber,
          typeOfAccount: stepsData.typeAccount, // aún no se añade este campo al backend
        });
      } else {
        arrayBankInfo.push({
          nameBank: "",
          addressBank: "",
          accountNumber: "",
          routingNumber: "",
          typeOfAccount: "",
        });
      }

      console.log(arrayBankInfo, "arrayBankInfo");

      // Suponiendo que stepsData es un objeto previamente definido con los datos necesarios.
      let arrayinfoAuthorizedUsers = [];

      // Verifica si el segundo usuario está definido
      if(stepsData.nombreApellido2 !== undefined){
        // Primer usuario
        arrayinfoAuthorizedUsers.push({
          name: stepsData.nombreApellido,
          title: stepsData.cargoEmpresa,
          phone: stepsData.telefonoCelular,
          email: stepsData.correoElectronico,
        });

        // Segundo usuario
        arrayinfoAuthorizedUsers.push({
          name: stepsData.nombreApellido2,
          title: stepsData.cargoEmpresa2,
          phone: stepsData.telefonoCelular2,
          email: stepsData.correoElectronico2,
        });
      } else {
        // Solo hay datos para un usuario
        arrayinfoAuthorizedUsers.push({
          name: stepsData.nombreApellido,
          title: stepsData.cargoEmpresa,
          phone: stepsData.telefonoCelular,
          email: stepsData.correoElectronico,
        });
      }

      console.log(arrayinfoAuthorizedUsers, "arrayinfoAuthorizedUsers");

      let arrayinfoBeneficialOwner = [];

      // Ajusta este número según el máximo esperado o dinamiza la detección del límite.
      const maxBeneficiaries = 4; // Ajusta este valor según sea necesario.

      for (let i = 1; i <= maxBeneficiaries; i++) {
        // Construye los nombres de las propiedades dinámicamente.
        let nameKey = `nameOwner${i}`;
        let occupationKey = `occupation${i}`;
        let ownershipKey = `ownership${i}`;
        let dateOfBirthKey = `dateOfBirth${i}`;
        let addressOwnerKey = `addressOwner${i}`;
        let emailOwnerKey = `emailOwner${i}`;
        console.log(stepsData[nameKey], "stepsData[nameKey]");
        // Verifica si existe el beneficiario actual basado en la disponibilidad del nombre.
        if (stepsData[nameKey] !== undefined) {
          // Crea y añade el objeto del beneficiario al arreglo.
          arrayinfoBeneficialOwner.push({
            nameOwner: stepsData[nameKey],
            occupation: stepsData[occupationKey],
            ownership: stepsData[ownershipKey],
            dateOfBirth: stepsData[dateOfBirthKey],
            addressOwner: stepsData[addressOwnerKey],
            emailOwner: stepsData[emailOwnerKey],
          });
        } else {
          // Si el nombre del beneficiario actual no está definido, rompe el bucle.
          break;
        }
      }

      // Muestra el arreglo para verificar los datos almacenados
      console.log(arrayinfoBeneficialOwner, "arrayinfoBeneficialOwner");

      let dataSend = {
        fullName : stepsData.fullName,
        email : stepsData.email,
        corporate : stepsData.corporate,
        phone : stepsData.phone,
        country :stepsData.country,
        corporateName : stepsData.corporateName,
        tradeNameOfDBA : stepsData.tradeNameOfDBA,
        state: stepsData.state,
        city: stepsData.city,
        postalCode: stepsData.postalCode,
        address: stepsData.address,
        emailInfomation: stepsData.emailInfomation,
        phoneInformation: stepsData.phoneInformation,
        website : stepsData.website,
        TaxIdentificationNumber : stepsData.TaxIdentificationNumber,
        industry: stepsData.industry,
        natureOfBusiness: stepsData.natureOfBusiness,
        DateOfIncorporation: document.getElementById('kt_datepicker_1').value,
        typeOfBusiness: typeof stepsData.typeOfBusiness !== 'undefined' ? stepsData.typeOfBusiness : stepsData.typeOfBusinessUSD,
        isTheApplicant : selectedIsTheApplicant,
        purposeOfTransactions : stepsData.purposeOfTransactions,
        bankCodeNumber : bankCodeNumber,
        estimatedTradeAmount : stepsData.estimatedTradeAmount,
        estimatedOfMonthlyTransaction : stepsData.estimatedOfMonthlyTransaction,
        currenciesNeeded : selectedCurrencies,
        preferredMethodOfFunding : stepsData.metodoPay, 
        infoBank :arrayBankInfo,
        infoAuthorizedUsers : arrayinfoAuthorizedUsers,
        ManyShouldersOwn25Percent: stepsData.sociosAcciones,
        infoBeneficialOwner:arrayinfoBeneficialOwner,
        nameAuthorizationMonex : stepsData.nameAuthorizationMonex,
        titlePositionAuthorizationMonex: stepsData.titlePositionAuthorizationMonex,
        dateAuthorizationMonex : document.getElementById('dateAuthorizationMonex').value,
        idLead : idLead,
      }
      console.log(dataSend, "dataSend");
      const response = await axios({
        method: 'post',
        url: `/registerAll/${idLead}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: dataSend,
      });
      console.log(response.data, "response");
    }

  });
});
