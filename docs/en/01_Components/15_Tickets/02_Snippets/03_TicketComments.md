Outputs comments and the form of the commenting on resource. 
*\*Can be used with any MODX document*
*\*Snippet is caused uncashed.*

## Parameters of the snippet's call

Name							| By default				   | Description
------------------------------------|---------------------------------------|------------------------------
**&allowGuest**						| 0						   | To activate commenting for unauthorized users?
**&allowGuestEdit**					| 1						   | To allow unauthorized users to edit their comments?
**&allowGuestEmails**				| 0							   | To send the guests mail notifiactions about the answers? 
**&autoPublish**					| 1						   | To publish automatically all the new comments without any premoderation.  
**&autoPublishGuest**				| 1							   | To publish automatically all the new comments of the unauthorized users without any premoderation.
**&depth**							| 0					   | Integer for indicating maximum depth of the comment branch.
**&enableCaptcha**					| 1						   | To activate protection from spam for unauthorized users?
**&fastMode**						| 1						   | If activated - values from DB only will be fitted in the result chunk. All the unprocessed tags MODX, such as filters, snippet output and others - will be cut.
**&formBefore**						| 0						   | To place form of the commenting before comments. No by default.
**&gravatarIcon**					| mm						   | If user's profile picture is not found - to load this picture for the replacement.
**&gravatarSize**					| 24						   | Profile picture size loaded 
**&gravatarUrl**					| http://www.gravatar.com/avatar/		   | Download location for profile pictures.
**&maxCaptcha**						| 10						   | Maximum number for generation of the code wchich protects from spam.
**&minCaptcha**						| 1						   | Minimum number for generation of the code wchich protects from spam.
**&thread**							|  					   | Name of the comment branch. "resource-[[*id]]" by default.
**&tplCommentAuth**					| tpl.Tickets.comment.one.auth			   | Comment chunck to show to authorized user.
**&tplCommentDeleted**				| tpl.Tickets.comment.one.deleted		           | Chunk of the deleted comment.
**&tplCommentEmailBcc**				| tpl.Tickets.comment.email.bcc			           | Chunk for notification of the web-sites admins about new comment.
**&tplCommentEmailOwner**			| tpl.Tickets.comment.email.owner		           | Chunk for notification of the ticket's owner about new comment.
**&tplCommentEmailReply**			| tpl.Tickets.comment.email.reply		           | Chunk for notification of the user that a response to his comment has appeared.
**&tplCommentEmailSubscription**	| tpl.Tickets.comment.email.subscription                           | Chunck for notification of subscribed user that a new comment has appeared in the theme.
**&tplCommentForm**					| tpl.Tickets.comment.form			   | Chunck for form of the new comment to add.
**&tplCommentFormGuest**			| tpl.Tickets.comment.form.guest		           | Chunck for form of the new comment to add for quests.
**&tplCommentGuest**				| tpl.Tickets.comment.one.guest			           | Comment chunck for quests to show.
**&tplComments**					| tpl.Tickets.comment.wrapper			   | Chunck wrapper for all the comments of the page.
**&tplLoginToComment**				| tpl.Tickets.comment.login				   | Chunck with the requirement to authorize. 

## Examples

* Standard snippet call
```
[[!TicketComments?]]
```

* Snippet call with the comments for unauthorized. 
```
[[!TicketComments? &allowGuest=`1`]]
```
