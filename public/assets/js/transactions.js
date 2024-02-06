//start dataTables
"use strict";
		
// Class definition
var DataTableInProgress = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;
    // Private functions
    var initDatatable = function () {
        dt = $("#getTransactionsInProgress").DataTable({
            searchDelay: 100,
            processing: true,
            serverSide: true,
            ajax: {
                url: "http://localhost:3200/admin/getTransactions",
            },
            columns: [
                { data: 'deal' },
                { data: 'send' },
                { data: 'receive'},
                { data: 'rate'},
                { data: 'date'},
                { data: 'status'},
                { data: null },
            ],
            columnDefs:[
                {
                    targets: 2,
                    orderable: false,
                    render: function (data, type, row) {
                        // Puedes personalizar el contenido y agregar clases aquí
                        var color = row.color; // Sustituye con tu lógica para determinar el color
                        var symbol = row.symbol; // Sustituye con tu lógica para obtener el símbolo
                        var icon = row.icon; // Sustituye con tu lógica para obtener el icono
                        return '<td><div class="badge badge-light-' + color + '">' + symbol + ' ' + data + '% <i class="' + icon + '"></i></div></td>';
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
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-0" data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" data-currency-id="${row.currencyId}" class="menu-link px-3" data-kt-docs-table-filter="details_row"><i class="ki-outline ki-tablet-text-up fs-1"></i>Details</a>
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
                $('#getTransactionsInProgress_wrapper').hide();
                $('#messageInProgress').show();
            } else {
                $('#getTransactionsInProgress_wrapper').show();
                $('#messageInProgress').hide();
            }
        });
    }

    // Delete customer
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = document.querySelectorAll('[data-kt-docs-table-filter="details_row"]');
        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                const currencyId = e.currentTarget.getAttribute('data-currency-id');
                // Redirect
                window.location.href = `http://localhost:3200/admin/getHoldingAccounts/detail/${currencyId}`;
            })
        });
    }

    var handleSearchDatatableDetail = function () {
        const filterSearch = $('#searchCurrencyDetail'); // Cambiado a jQuery para trabajar con select2

        // Suscribe al evento 'select2:select' en lugar de 'change'
        filterSearch.on('select2:select', function (e) {
        const selectedValue = e.params.data.id;
        const idColumnIndex = 0; // Reemplaza con el índice real de la columna de ID
        window.location.href = `http://localhost:3200/admin/getHoldingAccounts/detail/${selectedValue}`;
        });
    };

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatableDeal = function () {
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
            const deal = filterSearch.value;
            if (dt) {
                dt.column(0)
                    .search(deal)
                    .draw();
            }
        }
    };

    // Función para inicializar el rango de fechas
    var initDateRangePicker = function () {
        var start = moment().subtract(29, "days");
        var end = moment();
        function cb(start, end) {
            $("#kt_daterangepicker_4").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            const dateFrom = start.format('DD-MM-YYYY')
            const dateTo = end.format('DD-MM-YYYY')
            if (dt) { 
                dt.column(1)
                .search(dateFrom,dateTo)
                .draw();
            }
        }
    
        $("#kt_daterangepicker_4").daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                "Today": [moment(), moment()],
                "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 Days": [moment().subtract(6, "days"), moment()],
                "Last 30 Days": [moment().subtract(29, "days"), moment()],
                "This Month": [moment().startOf("month"), moment().endOf("month")],
                "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }
        }, cb);

        cb(start, end);
    };
    
        // Public methods
    return {
        init: function () {
            initDateRangePicker();
            initDatatable();
            handleSearchDatatableDetail();
            handleSearchDatatableDeal();
        }
    }
}();

// Class definition
var DataTableFinished = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;
    // Private functions
    var initDatatable = function () {
        dt = $("#getTransactionsFinished").DataTable({
            searchDelay: 100,
            processing: true,
            serverSide: true,
            ajax: {
                url: "http://localhost:3200/admin/getTransactions",
            },
            columns: [
                { data: 'deal' },
                { data: 'send' },
                { data: 'receive'},
                { data: 'rate'},
                { data: 'date'},
                { data: 'status'},
                { data: null },
            ],
            columnDefs:[
                {
                    targets: 2,
                    orderable: false,
                    render: function (data, type, row) {
                        // Puedes personalizar el contenido y agregar clases aquí
                        var color = row.color; // Sustituye con tu lógica para determinar el color
                        var symbol = row.symbol; // Sustituye con tu lógica para obtener el símbolo
                        var icon = row.icon; // Sustituye con tu lógica para obtener el icono
                        return '<td><div class="badge badge-light-' + color + '">' + symbol + ' ' + data + '% <i class="' + icon + '"></i></div></td>';
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
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-0" data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" data-currency-id="${row.currencyId}" class="menu-link px-3" data-kt-docs-table-filter="details_row"><i class="ki-outline ki-tablet-text-up fs-1"></i>Details</a>
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

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {
                handleDeleteRows();
                KTMenu.createInstances();
        });
        dt.on('draw.dt', function () {
            if (dt.page.info().recordsTotal === 0) {
                $('#getTransactionsFinished_wrapper').hide();
                $('#messageFinished').show();
            } else {
                $('#getTransactionsFinished').show();
                $('#messageFinished').hide();
            }
        });
    }

    // Delete customer
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = document.querySelectorAll('[data-kt-docs-table-filter="details_row"]');
        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                const currencyId = e.currentTarget.getAttribute('data-currency-id');
                // Redirect
                window.location.href = `http://localhost:3200/admin/getHoldingAccounts/detail/${currencyId}`;
            })
        });
    }

    var handleSearchDatatableDetail = function () {
        const filterSearch = $('#searchCurrencyFinished'); // Cambiado a jQuery para trabajar con select2

        // Suscribe al evento 'select2:select' en lugar de 'change'
        filterSearch.on('select2:select', function (e) {
        const selectedValue = e.params.data.id;
        const idColumnIndex = 0; // Reemplaza con el índice real de la columna de ID
        window.location.href = `http://localhost:3200/admin/getHoldingAccounts/detail/${selectedValue}`;
        });
    };

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatableDeal = function () {
        const filterSearch = document.querySelector('[data-kt-docs-table-filter="searchDealFinished"]');

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
            const deal = filterSearch.value;
            if (dt) {
                dt.column(0)
                    .search(deal)
                    .draw();
            }
        }
    };


    // Función para inicializar el rango de fechas
    var initDateRangePicker = function () {
        var start = moment().subtract(29, "days");
        var end = moment();
        function cb(start, end) {
            $("#dateRangePickerFinished").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            const dateFrom = start.format('DD-MM-YYYY')
            const dateTo = end.format('DD-MM-YYYY')
            if (dt) { 
                dt.column(1)
                .search(dateFrom,dateTo)
                .draw();
            }
        }
    
        $("#dateRangePickerFinished").daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                "Today": [moment(), moment()],
                "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 Days": [moment().subtract(6, "days"), moment()],
                "Last 30 Days": [moment().subtract(29, "days"), moment()],
                "This Month": [moment().startOf("month"), moment().endOf("month")],
                "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }
        }, cb);

        cb(start, end);
    };
    
        // Public methods
    return {
        init: function () {
            initDateRangePicker();
            initDatatable();
            handleSearchDatatableDetail();
            handleSearchDatatableDeal();
        }
    }
}();

// Class definition
var DataTablePendings = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;
    // Private functions
    var initDatatable = function () {
        dt = $("#getTransactionsPendings").DataTable({
            searchDelay: 100,
            processing: true,
            serverSide: true,
            ajax: {
                url: "http://localhost:3200/admin/getTransactions",
            },
            columns: [
                { data: 'deal' },
                { data: 'send' },
                { data: 'receive'},
                { data: 'rate'},
                { data: 'date'},
                { data: 'status'},
                { data: null },
            ],
            columnDefs:[
                {
                    targets: 2,
                    orderable: false,
                    render: function (data, type, row) {
                        // Puedes personalizar el contenido y agregar clases aquí
                        var color = row.color; // Sustituye con tu lógica para determinar el color
                        var symbol = row.symbol; // Sustituye con tu lógica para obtener el símbolo
                        var icon = row.icon; // Sustituye con tu lógica para obtener el icono
                        return '<td><div class="badge badge-light-' + color + '">' + symbol + ' ' + data + '% <i class="' + icon + '"></i></div></td>';
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
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-0" data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" data-currency-id="${row.currencyId}" class="menu-link px-3" data-kt-docs-table-filter="details_row"><i class="ki-outline ki-tablet-text-up fs-1"></i>Details</a>
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

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {
                handleDeleteRows();
                KTMenu.createInstances();
        });
        dt.on('draw.dt', function () {
            if (dt.page.info().recordsTotal === 0) {
                $('#getTransactionsPendings').hide();
                $('#messagePending').show();
            } else {
                $('#getTransactionsPendings').show();
                $('#messagePending').hide();
            }
        });
    }

    // Delete customer
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = document.querySelectorAll('[data-kt-docs-table-filter="details_row"]');
        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();
                const currencyId = e.currentTarget.getAttribute('data-currency-id');
                // Redirect
                window.location.href = `http://localhost:3200/admin/getHoldingAccounts/detail/${currencyId}`;
            })
        });
    }

    var handleSearchDatatableDetail = function () {
        const filterSearch = $('#searchCurrencyPendings'); // Cambiado a jQuery para trabajar con select2

        // Suscribe al evento 'select2:select' en lugar de 'change'
        filterSearch.on('select2:select', function (e) {
        const selectedValue = e.params.data.id;
        const idColumnIndex = 0; // Reemplaza con el índice real de la columna de ID
        window.location.href = `http://localhost:3200/admin/getHoldingAccounts/detail/${selectedValue}`;
        });
    };

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatableDeal = function () {
        const filterSearch = document.querySelector('[data-kt-docs-table-filter="searchDealPendings"]');

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
            const deal = filterSearch.value;
            if (dt) {
                dt.column(0)
                    .search(deal)
                    .draw();
            }
        }
    };


    // Función para inicializar el rango de fechas
    var initDateRangePicker = function () {
        var start = moment().subtract(29, "days");
        var end = moment();
        function cb(start, end) {
            $("#dateRangePickerPendings").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            const dateFrom = start.format('DD-MM-YYYY')
            const dateTo = end.format('DD-MM-YYYY')
            if (dt) { 
                dt.column(1)
                .search(dateFrom,dateTo)
                .draw();
            }
        }
    
        $("#dateRangePickerPendings").daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                "Today": [moment(), moment()],
                "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 Days": [moment().subtract(6, "days"), moment()],
                "Last 30 Days": [moment().subtract(29, "days"), moment()],
                "This Month": [moment().startOf("month"), moment().endOf("month")],
                "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }
        }, cb);

        cb(start, end);
    };
    
        // Public methods
    return {
        init: function () {
            initDateRangePicker();
            initDatatable();
            handleSearchDatatableDetail();
            handleSearchDatatableDeal();
        }
    }
}();
// On document ready
KTUtil.onDOMContentLoaded(function () {
    DataTableInProgress.init();
    DataTableFinished.init();
    DataTablePendings.init();
});

///////////////////
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