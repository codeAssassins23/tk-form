"use strict";
		
// Class definition
var KTDatatablesServerDetails = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;
    var currencyCode = document.getElementById('currencyDetails').value;
    // Private functions
    var initDatatableDetails = function () {
        dt = $("#kt_datatable_holddingDetail").DataTable({
            searchDelay: 100,
            processing: true,
            serverSide: true,
            ajax: {
                url: `/admin/holdingAccounts/detail/${currencyCode}`,
            },
            columns: [
                { data: 'dealNumber' },
                { data: 'entryDate' },
                { data: 'valueDate'},
                { data: 'fund'},
            ],
            columnDefs:[
                {
                    targets: 3,
                    orderable: false,
                    className: 'text-center',
                    render: function (data, type, row) {
                        // Puedes personalizar el contenido y agregar clases aquí
                        var color = row.color; // Sustituye con tu lógica para determinar el color
                        var symbol = row.symbol; // Sustituye con tu lógica para obtener el símbolo
                        var icon = row.icon; // Sustituye con tu lógica para obtener el icono
                        var flags = row.flag;
                        return '<td><div class="badge badge-light-' + color + '">' + symbol + ' ' + data + ' ' + flags + '<i class="' + icon + '"></i></div></td>';
                    }
                },
            ],
        });

        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {
            KTMenu.createInstances();
        });
        
    }

    var handleSearchDatatableDetail = function () {
        const filterSearch = $('#searchCurrencyDetail'); // Cambiado a jQuery para trabajar con select2

        // Suscribe al evento 'select2:select' en lugar de 'change'
        filterSearch.on('select2:select', function (e) {
        const selectedValue = e.params.data.id;
        const idColumnIndex = 0; // Reemplaza con el índice real de la columna de ID
        window.location.href = `/admin/getHoldingAccounts/detail/${selectedValue}`;
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
                    .search(deal, currencyCode)
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
            initDatatableDetails();
            handleSearchDatatableDetail();
            handleSearchDatatableDeal();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTDatatablesServerDetails.init();
});
