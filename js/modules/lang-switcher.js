/**!
	Lang Switcher
	Language selector usually included inside the site header

	@contributors: Geoffrey Crofte (Alsacréations), Hassan Akaou (Comexposium), Yann Roseau (Kaliop)
	@date-created: 2015-04-01
	@last-update: 2020-07-23
 */

(function ($) {
  $(".js-lang-switcher")
    .each(function () {
      function updateLangSwitcher(switcher) {
        $('link[rel="alternate"][hreflang]').each(function () {
          const lang = $(this).attr("hreflang");
          const url = $(this).attr("href");
          const link = switcher.find(`a[lang="${lang}"]`);
          if (link) {
            link.map(function(){ return this.href = url})
          }
        });
      }

      let $_this = $(this);

      let target = document.querySelector("title");
      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          setTimeout(function () {
            updateLangSwitcher($_this);
          }, 500);
        });
      });

      let config = {
        childList: true,
      };

      // button creation
      $_this
        .find("ul")
        .before(
          '<button class="ls-trigger js-toggle-trigger" type="button" title="' +
            $_this.data("title") +
            '">' +
            $_this.find(".is-active").text() +
            "</button>"
        );

      // accessibility (tab nav)
      $_this.find("a:last").on("blur", function () {
        $_this.find(".js-toggle-trigger").trigger("click");
      });

      // Allows lang switcher to be displayed above "Back to top" if opened
      // It happens in mobile where lang-switcher is in footer
      // When lang switcher is closed, we still want it to be displayed under "Back to top"
      $_this.find(".js-toggle-trigger").on("click.ls", function () {
        var $lsToggle = $(this);
        // Adding higher z-index to footer > .inside than to its sibling .is-stuck.sf-ttt
        // It seems .is-open isn't there yet when the test is made so z-index is set in the 'else' statement
        let z = $(".is-stuck.sf-ttt").css("zIndex");
        if ($_this.hasClass("is-open")) {
          $(".site-footer .inside").css({
            zIndex: "auto",
          });
        } else {
          $(".site-footer .inside").css({
            zIndex: z + 1,
          });
        }
        return false;
      });

      // update lang switcher url when title change for comexposium connect 2
      observer.observe(target, config);

      updateLangSwitcher($_this);
    })
    .toggleSlide();
})(jQuery);
