jQuery(document).ready(function () {
    const tooltipOpener = jQuery(".ds-tooltip__wrapper");
    const activeClass = "ds-tooltip--shown";
    let isTouch = false;

    jQuery(tooltipOpener).on('touchstart', function (e) {
        isTouch = true;
    });

    jQuery(tooltipOpener).on('touchend', function (e) {
        isTouch = true;
    });

    jQuery(tooltipOpener).on('mouseover', function (e) {
        if (!isTouch) {
            jQuery(this).find('.ds-tooltip').addClass(activeClass);
        }
    });

    jQuery(tooltipOpener).on('mouseout', function (e) {
        jQuery(this).find('.ds-tooltip').removeClass(activeClass);
    });
});
