/* eslint-disable prettier/prettier */
let index = 0;
$('#kt_docs_repeater_basic').repeater({
  initEmpty: false,

  defaultValues: {
    'text-input': 'foo',
  },

  show: function () {
    if (index < 1) {
      index = ++index;
      $(this).slideDown();
    }
  },

  hide: function (deleteElement) {
    index = --index;
    $(this).slideUp(deleteElement);
  },
});
