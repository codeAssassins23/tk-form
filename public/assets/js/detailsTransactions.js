let optionFormat = function(item){
    if(!item.id){
        return item.text;
    }

    let span = document.createElement('span');
    let imgUrl = item.element.getAttribute('data-kt-select2-country');
    let template = '';

    //Usa una imagen predeterminada si no encuentra una
    template += '<img src="' + (imgUrl || '/assets/media/flags/countries/default-image.svg') + '" class="rounded-circle h-20px me-2" alt="image"/>';
    template += item.text;

    span.innerHTML = template;
    return $(span);
}

$('#searchCurrency').select2({
    templateSelection: optionFormat,
    templateResult: optionFormat,
});

$('#searchCurrencyFinished').select2({
    templateSelection: optionFormat,
    templateResult: optionFormat,
});
$('#searchCurrencyPendings').select2({
    templateSelection: optionFormat,
    templateResult: optionFormat,
});

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
    