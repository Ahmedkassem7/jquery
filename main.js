$(function () {
  const $cards = $(".gallery-card");
  const $lightbox = $(".lightbox-overlay");
  const $lightboxImg = $(".lightbox-image");
  let current = 0;

  function showImage(index) {
    const src = $cards.eq(index).find("img").attr("src");
    $lightboxImg.fadeOut(200, function () {
      $(this).attr("src", src).fadeIn(200);
    });
  }

  $cards.on("click", function () {
    current = $(this).index();
    showImage(current);
    $lightbox.fadeIn(300).css("display", "flex");
  });

  $(".lightbox-close, .lightbox-overlay").on("click", function (e) {
    if (e.target === this || $(e.target).hasClass("lightbox-close")) {
      $lightbox.fadeOut(300);
    }
  });

  $(".lightbox-nav.prev").on("click", function (e) {
    e.stopPropagation();
    current = (current - 1 + $cards.length) % $cards.length;
    showImage(current);
  });

  $(".lightbox-nav.next").on("click", function (e) {
    e.stopPropagation();
    current = (current + 1) % $cards.length;
    showImage(current);
  });

  $(document).on("keydown", function (e) {
    if (!$lightbox.is(":visible")) return;
    if (e.key === "Escape") $lightbox.fadeOut(300);
    else if (e.key === "ArrowLeft") $(".lightbox-nav.prev").click();
    else if (e.key === "ArrowRight") $(".lightbox-nav.next").click();
  });
});
