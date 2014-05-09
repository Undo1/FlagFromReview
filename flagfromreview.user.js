// ==UserScript==
// @name FlagFromReview
// @version 1.0.1
// @author Undo
// @description To close meta things
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/*
// @include http://*superuser.com/*
// @include http://*serverfault.com/*
// @include http://*stackexchange.com/*
// @include http://discuss.area51.com/*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
	$(document).ajaxComplete(function() {
		setTimeout(function() 
			{
				$('.reviewable-post-stats.module :first tr:last').after($('<tr><td class="label-key"><a class="flagfromreview" href="javascript:void(0)" title="Flag">flag as NAA</a></td><td class="label-value"></td></tr>'));
				$('.flagfromreview').bind('click', function()
				{
					var postId=$(this).closest('div.reviewable-post').attr("class").split(" ")[1].split("-")[2];
					$(this).html("<strong>working...</strong");
					$.post('/flags/posts/'+postId+'/add/AnswerNotAnAnswer',
						{'otherText':'','fkey':StackExchange.options.user.fkey},
						function(data){
							console.log(data);
							if (data.Success == true)
							{
								$(".flagfromreview").html("success");
							}
							else
							{
								$('.flagfromreview').html("uh-oh");
							}
						}
					);

				});
			},
			3000
		);

		// $('.ot10').bind("click",function(){

		// 	var postid=$(this).closest('div.question,div[id^=answer]').data('questionid')||$(this).closest('div.question,div[id^=answer]').data('answerid');
		// 	$(this).html("<strong>working...</strong>");
			// $.post('/flags/questions/'+postid+'/close/add',
			// 	{'closeReasonId':'OffTopic','duplicateOfQuestionId':'','closeAsOffTopicReasonId':'10','offTopicOtherText':'This question appears to be off-topic because it is about','offTopicOtherCommentId':'','originalOffTopicOtherText':'This question appears to be off-topic because it is about','fkey':StackExchange.options.user.fkey},
			// 	function(data){
			// 		console.log(data);
			// 		if (data.Success == true)
			// 		{
			// 			$(".ot10").html("success");
			// 			$(".close-question-link").html("close (" + data.Count + ")");
			// 			$(".ot10").remove();
			// 		}
			// 	}
			// );
		// });
		return false;
	});
});