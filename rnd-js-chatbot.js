jQuery.js_botchat = function( settings ) {
    settings = jQuery.extend(true, {
        debug:true,
    }, settings || {});

    let $ = jQuery;
    //onLoad
    onLoad();
    function onLoad() {

        jQuery(".cm-response-container").each( function(i){
            let qtext_container = jQuery(this).find(".cm-text-label")
                .attr("data-msgindx",i);
            let input_container = jQuery(this).find("input[type='text']")
                .attr("data-msgindx",i)
            let qtext_text      = qtext_container.text();
            let activate        = (i==0) ? "activate":"";
            let B_isLast        = ((parseInt(jQuery(".cm-response-container").length) - 1) == i) ? "last":"";
            let thisquestion = `<div class='message question w3-panel w3-padding w3-light-gray w3-left w3-round-xlarge w3-leftbar w3-border-dark-gray ${activate} init' data-msgindx='${i}'><span class='content ${activate}'>${qtext_text}</span>
                                 <div class='typing-indicator' data-msgindx='${i}'><span class='dot one'></span><span class='dot two'></span><span class='dot three'></span></div></div>
                                <div class='message answer w3-panel  w3-padding w3-right w3-blue w3-text-white w3-round-xlarge w3-rightbar w3-border-indigo ${B_isLast}'  data-msgindx='${i}'></div>`;
             jQuery(".message-container").append(jQuery(thisquestion));
        })

        jQuery(".message-input").on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                // Do something
                let thiscode = parseInt(jQuery(".message.question.activate:last").attr("data-msgindx"));
                let thismessage = jQuery(this).val();
                jQuery(`.message.answer[data-msgindx='${thiscode}']`).text(thismessage);
                jQuery(`.message.answer[data-msgindx='${thiscode}']`).addClass("activate");
                thiscode++;
                jQuery(`.typing-indicator[data-msgindx='${thiscode}']`).addClass("activate");
                jQuery(`.message.question[data-msgindx='${thiscode}']`).addClass("activate");
                jQuery(this).val('');
                //scroll to bottom
                jQuery('.message-container').animate({
                    scrollTop: 99999
                }, 50);
                setTimeout(function() {
                    jQuery(`.typing-indicator[data-msgindx='${thiscode}']`).removeClass("activate");
                    jQuery(`.message.question[data-msgindx='${thiscode}'] .content`).removeClass("init")
                    jQuery(`.message.question[data-msgindx='${thiscode}'] .content`).addClass("activate")

                }, 1500);

            }
        });

    };


}