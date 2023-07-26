;(function ($) {
  function umv_bpvm_installation_counter() {
    return $.ajax({
      type: "POST",
      url: ajaxurl,
      data: {
        action: "umv_bpvm_installation_counter", // this is the name of our WP AJAX function that we'll set up next
      },
      dataType: "JSON",
    })
  }

  if (typeof umvBpvmAdminData.installation != "undefined" && umvBpvmAdminData.installation != 1) {
    $.when(umv_bpvm_installation_counter()).done(function (response_data) {
      // console.log(response_data)
    })
  }
})(jQuery)
