jQuery(document).ready(function($) {

    $('.wprc-submit-v3').click(function(){
        var clickedButton   = $(this);
        var anonce          = clickedButton.attr('name');
        var wprcContent     = $(this).parents('.wprc-content-v3');
        var currentForm     = wprcContent.find('.wprc-form-v3');
        var messageBox      = wprcContent.find('.wprc-message-v3');
        var content_id      = wprcContent.find('input[name="wprc_content_id"]').val();
        var content_type    = wprcContent.find('input[name="wprc_content_type"]').val();
        var _reason         = wprcContent.find('.input-reason-v3').val();
        var _details        = wprcContent.find('.input-details-v3').val();
        clickedButton.prop('disabled', true);
        wprcContent.find('.loading-img').show();
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
                redirect: window.location.pathname
            },
            success:function(data, textStatus, XMLHttpRequest){
                    wprcContent.find('.loading-img').hide();
                    data = $.parseJSON(data);
                    if(data.success){
                        messageBox.html(data.message).addClass('dm-notice--lightblue').show();
                        currentForm.find('.dm-actionsForm__container').remove();
                    }
                    else{
                        clickedButton.prop('disabled', false);
                        messageBox.html(data.message).addClass('dm-notice--warning').show();
                    }
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                messageBox.html("An unexpected error has occurred.").addClass('dm-notice--warning').show();
                console.log("Moderation Alert is not saved. Error status: " + textStatus + ", error Thrown: " + errorThrown);
                clickedButton.prop("disabled", false);
            }
        });
    }).prop("disabled", false);
});
