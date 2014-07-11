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
		if ($('.flagfromreview').length > 0)
		{
			return;
		}
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
		$('.reviewable-post-stats.module :first tr:last').after($('<tr><td class="label-key"><a class="downvotefromreview" href="javascript:void(0)" title="Downvote">downvote</a></td><td class="label-value"></td></tr>'));
		$('.downvotefromreview').bind('click', function()
		{
			var postId=$(this).closest('div.reviewable-post').attr("class").split(" ")[1].split("-")[2];
			$(this).html("<strong>working...</strong");
			$.post('/posts/' + postId + '/vote/3',
				{'fkey':StackExchange.options.user.fkey},
				function(data){
					console.log(data);
					if (data.Success == true)
					{
						$(".downvotefromreview").html("success");
						$(".reviewable-post .vote-count-post").html(data.NewScore);
					}
					else
					{
						$('.downvotefromreview').html("uh-oh");
					}
				}
			);

		});

		return false;
	});
});
