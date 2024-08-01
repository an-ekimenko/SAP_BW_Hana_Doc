jQuery(document).ready(function($) {

    $('.wprc-switch').click(function(e) {
        $(this).siblings('.wprc-content').slideToggle();
        e.preventDefault();
    }).prop('disabled', false);

    $('.wprc-submit').click(function(){
        var clickedButton   = $(this);
        var anonce          = clickedButton.attr('name');
        var currentForm     = $(this).parents('.wprc-content');
        var content_id      = currentForm.find('input[name="wprc_content_id"]').val();
        var content_type    = currentForm.find('input[name="wprc_content_type"]').val();
        var _reason         = currentForm.find('.input-reason').val();
        var _details        = currentForm.find('.input-details').val();
        var _reporter_name  = currentForm.find('.input-name').val();
        var _reporter_email = currentForm.find('.input-email').val();
        clickedButton.prop('disabled', true);
        currentForm.find('.loading-img').show();
        $.ajax({
            type: 'POST',
            url: wprcajaxhandler.ajaxurl,
            data: {
                action:         'wprc_add_report',
                _ajax_nonce:    anonce,
                id:             content_id,
                type:           content_type,
                reason:         _reason,
                details:        _details,
                reporter_name:  _reporter_name,
                reporter_email: _reporter_email,
                redirect: window.location.pathname
            },
            success:function(data, textStatus, XMLHttpRequest){
                    currentForm.find('.loading-img').hide();
                    data = jQuery.parseJSON(data);
                    if(data.success){
                        currentForm.find('.wprc-message').html(data.message).addClass('success');
                        currentForm.find('.wprc-form').remove();
                    }
                    else{
                        clickedButton.prop('disabled', false);
                        currentForm.find('.wprc-message').html(data.message).addClass('error');
                    }
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                currentForm.find('.wprc-message').html("An unexpected error has occurred.").addClass('error');
                console.log("Moderation Alert is not saved. Error status: " + textStatus + ", error Thrown: " + errorThrown);
                clickedButton.prop("disabled", false);
            }
        });
    }).prop("disabled", false);
});