jQuery.js_botchat = function( settings ) {
    settings = jQuery.extend(true, {
        debug:true,
        INT_INPUT_LENGTH:0,
        DONE_TEXT:"Please scroll down and click the ‘Continue’ arrow",
    }, settings || {});

    let $ = jQuery;
    //onLoad
    onLoad();
    function onLoad() {
        generateChatDom();
        jQuery(".message-input").on('keyup', function (e) { if (e.key === 'Enter' || e.keyCode === 13) { sendMessage(e); } });
        jQuery(".message-send").on('click', function (e) { sendMessage(); });
        jQuery(".w3-button.next_button").on('click', function (e) {  jQuery("#cm-NextButton").click();  });
    };
    function generateChatDom(){
        jQuery(".cm-response-container").each( function(i){
            let qtext_container = jQuery(this).find(".cm-text-label")
                .attr("data-msgindx",i);
            let input_container = jQuery(this).find("input[type='text']")
                .attr("data-msgindx",i)
            let qtext_text      = qtext_container.text();
            let activate        = (i==0) ? "activate":"";
            let last        = ((parseInt(jQuery(".cm-response-container").length) - 1) == i) ? "last":"";
            let thisquestion = `<div class='message question w3-panel w3-animate-left w3-padding w3-left w3-round-xlarge   ${activate} init' data-msgindx='${i}'><span class='content ${activate}'>${qtext_text}</span>
                                 <div class='typing-indicator' data-msgindx='${i}'><span class='dot one'></span><span class='dot two'></span><span class='dot three'></span></div></div>
                                <div class='message answer w3-panel w3-animate-right w3-padding w3-right  w3-text-white w3-round-xlarge ${last}'  data-msgindx='${i}'></div>`;
            jQuery(".message-container").append(jQuery(thisquestion));
        });
        let thisquestion = `<div class='message question last w3-panel w3-animate-left w3-padding w3-left w3-round-xlarge init' data-msgindx='${(jQuery(".cm-response-container").length)}'><span class='content'>${settings.DONE_TEXT}</span>
                        <div class='typing-indicator' data-msgindx='${(jQuery(".cm-response-container").length)}'><span class='dot one'></span><span class='dot two'></span><span class='dot three'></span></div></div>`;
        jQuery(".message-container").append(jQuery(thisquestion));
    }
    function sendMessage(e){
        // Do something
        let inputBox = jQuery(".message-input");
        let sendButton = jQuery(".message-send");
        let thiscode = parseInt(jQuery(".message.question.activate:last").attr("data-msgindx"));
        let thismessage = inputBox.val();
         if ( settings.INT_INPUT_LENGTH>0) {
             if  (thismessage.trim().length < settings.INT_INPUT_LENGTH){ return; }
         } else {
             if  (thismessage.trim().length==0){ return; }
         }
        jQuery(`.message.answer[data-msgindx='${thiscode}']`).text(thismessage);
        jQuery(`.cm-response-container [type='text'][data-msgindx='${thiscode}']`).val(thismessage);
        jQuery(`.message.answer[data-msgindx='${thiscode}']`).addClass("activate");
        thiscode++;
        jQuery(`.typing-indicator[data-msgindx='${thiscode}']`).addClass("activate");
        jQuery(`.message.question[data-msgindx='${thiscode}']`).addClass("activate");
        inputBox.attr("disabled","")
        sendButton.attr("disabled","")
        inputBox.val('');
        if ((jQuery('.message-container').prop("scrollHeight")-500) > 500) { jQuery('.message-container').addClass("reached")}
        //scroll to bottom
        jQuery('.message-container').animate({
            scrollTop: 99999
        }, 50);
        setTimeout(function() {
            jQuery(`.typing-indicator[data-msgindx='${thiscode}']`).removeClass("activate");
            jQuery(`.message.question[data-msgindx='${thiscode}'] .content`).removeClass("init")
            jQuery(`.message.question[data-msgindx='${thiscode}'] .content`).addClass("activate")

            if ( !(jQuery(`.message.answer:last`).hasClass("activate") && jQuery(`.message.answer:last`).hasClass("last")) ){
                inputBox.removeAttr("disabled")
                sendButton.removeAttr("disabled")
                inputBox.focus()
            } else {
                jQuery(".w3-container.next_button").addClass("w3-show")
            }
        }, 1500);
    }


}