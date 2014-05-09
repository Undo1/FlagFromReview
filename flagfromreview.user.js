// ==UserScript==
// @name OT10 fast!
// @version 1.0.1
// @author Undo (with help from @ManishEarth)
// @description To close meta things
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://meta.stackexchange.com/*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
	$('document').ready(function(){
	    var htm=$('.post-menu').html()||"";
	    if(htm!=-1&&$('[id^=close-question] span').length!=0){
	        return;
	    }
		$('.question .post-menu').append($('<span class="lsep">|</span><a class="ot10" href="javascript:void(0)" title="Flag obsolete comments">ot10</a>'));
		$('.ot10').bind("click",function(){

			var postid=$(this).closest('div.question,div[id^=answer]').data('questionid')||$(this).closest('div.question,div[id^=answer]').data('answerid');
			$(this).html("<strong>working...</strong>");
			$.post('/flags/questions/'+postid+'/close/add',
				{'closeReasonId':'OffTopic','duplicateOfQuestionId':'','closeAsOffTopicReasonId':'10','offTopicOtherText':'This question appears to be off-topic because it is about','offTopicOtherCommentId':'','originalOffTopicOtherText':'This question appears to be off-topic because it is about','fkey':StackExchange.options.user.fkey},
				function(data){
					console.log(data);
					if (data.Success == true)
					{
						$(".ot10").html("success");
						$(".close-question-link").html("close (" + data.Count + ")");
						$(".ot10").remove();
					}
				}
			);
		});
		return false;
	});
});