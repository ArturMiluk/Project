$(document).ready(function () {
  $(".popup-with-form").magnificPopup({
    type: "inline",
    preloader: false,
    callbacks: {
      open: function () {
        $("body").css("overflow", "hidden");
      },
      close: function () {
        $("body").css("overflow", "");
      },
    },
  });
});
