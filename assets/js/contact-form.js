jQuery(document).ready(function () {
  jQuery("#formLoader").hide(); // 👈 ensures it's hidden on page load

  jQuery.validator.addMethod(
    "regex",
    function (value, element) {
      return this.optional(element) || /^\+?[0-9]{7,15}$/.test(value);
    },
    "Please enter a valid phone number."
  );

  jQuery("#submit").on("click", document, function () {
    if (jQuery("#captcha_val").val() != jQuery("#captcha_text").val()) {
      $("#captcha_text")
        .parent("div")
        .append('<span class="error">Captch is not match</span>');
    } else {
      jQuery("#contactpage").validate({
        submitHandler: function (e) {
          submitSignupFormNow(jQuery("#contactpage"));
        },
        rules: {
          fname: {
            required: true,
          },
          lname: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
            regex: true,
          },
        },
        messages: {
          phone: {
            required: "Phone number is required.",
            regex: "Phone number range is 7-15",
          },
        },
        errorElement: "span",
        errorPlacement: function (e, t) {
          e.appendTo(t.parent());
        },
      });
      submitSignupFormNow = function (e) {
        var t = e.serialize();
        var n = "backend/contact.php";

        // 👇 Show loader before sending the request
        jQuery("#formLoader").fadeIn();

        jQuery.ajax({
          url: n,
          type: "POST",
          data: t,
          dataType: "json",
          success: function (response) {
            // 👇 Hide loader on success
            jQuery("#formLoader").fadeOut();

            if (response.status === "Success") {
              jQuery("#contactpage")[0].reset();

              Swal.fire({
                icon: "success",
                title: "Success!",
                text: response.msg,
                confirmButtonColor: "#28a745",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: response.msg,
                confirmButtonColor: "#dc3545",
              });
            }
          },
          error: function (xhr, status, error) {
            // 👇 Hide loader on failure too
            jQuery("#formLoader").fadeOut();

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong. Please try again later.",
              confirmButtonColor: "#dc3545",
            });
            console.error("AJAX error:", status, error);
          },
        });

        return false;
      };
    }
  });
});
