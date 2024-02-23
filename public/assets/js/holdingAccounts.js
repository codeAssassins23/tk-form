"use strict";
		
// Class definition
var KTDatatablesServerSide = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $("#kt_datatable_getHolddingAccounts").DataTable({
            searchDelay: 100,
            processing: true,
            serverSide: true,
            ajax: {
                url: "/admin/getHolddingAccountTest",
            },
            columns: [
                { data: 'currencyCode' },
                { data: 'balance' },
                { data: 'history'},
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
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-2">
                                    <a href="/admin/payments" class="menu-link px-3"><i class="ki-outline ki-send fs-1"></i> Send</a>
                                </div>
                                <!--end::Menu item-->
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="/admin/rechargue" class="menu-link px-3"><i class="ki-outline ki-wallet fs-1"></i>Recharge</a>
                                </div>
                                <!--end::Menu item-->
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" class="menu-link px-3"><i class="ki-outline ki-arrows-loop fs-1"></i>Transfer</a>
                                </div>
                                <!--end::Menu item-->
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" class="menu-link px-3"><i class="ki-outline ki-dollar fs-1"></i>Buy/sell</a>
                                </div>
                                <!--end::Menu item-->
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
    }

    var handleSearchDatatable = function () {
        const filterSearch = $('#searchCurrency'); // Cambiado a jQuery para trabajar con select2

        // Suscribe al evento 'select2:select' en lugar de 'change'
        filterSearch.on('select2:select', function (e) {
        const idToSearch = e.params.data.id; // Usar id en lugar de value para select2
        const idColumnIndex = 0; // Reemplaza con el índice real de la columna de ID

        if (dt) { // Asegúrate de que dt esté definido
            dt.column(idColumnIndex)
            .search(idToSearch)
            .draw();
        }
        });
    };

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
                window.location.href = `/admin/getHoldingAccounts/detail/${currencyId}`;
            })
        });
    }

     // Public methods
    return {
        init: function () {
            initDatatable();
            handleSearchDatatable();
            handleDeleteRows();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTDatatablesServerSide.init();
});
