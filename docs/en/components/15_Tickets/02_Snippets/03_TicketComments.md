# TicketComments

Outputs comments and the form of the commenting on resource.

*\*Can be used with any MODX document*
*\*Snippet is caused uncashed.*

## Parameters of the snippet's call

| Name                          | By def     			      escription                                                                     |                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| **&allowGuest**               | `0`                                                                                                | To activate commenting for unauthorized users?           |
| **&allowGuestEdit**		     `1` | To allow unauthorized users to edit their comments?                                                |                                                          |
| \**&allowGu       ls*         | `0`                                                                                                | To send the guests mail notifiactions about the answers? |
| **&autoPublish**		     `1`    | To publish automatically all the new comments without any premoderation.                           |                                                          |
| **&autoPublis      **         | To publish automatically all the new comments of the unauthorized users without any premoderation. |                                                          |
|**&depth**					      |			      Integer for indicating maximum depth of the comment branch.
|**&enableCaptcha\*     	| `1`         | To activate protection from spam for unauthorized users?
|**&fastMode**				     				       If activated - values from DB oly will be fitted in the result chunk. All the unprocessed tags MODX, such as filters, snippet output and others - will be cut.
|**&formBefore**	     | `0`						   | To place form of th  commenting before comments. No by default.
|**&gravatarIcon      	| `m`      	   | If user's profile picture is not found - to load this picture for the replacement.
|**&gravatarSize      	|       		   | Profile picture size loaded
|**&gravatar       			     p://www.gravatar.com/avatar/		   | Download location for profile pictures.
|**&maxCaptcha**				     `0`						   | Maximum number for   neration of the code wchich protects from spam.
|**&minCaptcha**						|    				   | Minimum number for gener  ion of the code wchich protects from spam.
|**&thread**							|  		      | Name of the comment branch.   esource-\[[*id]]" by default.
|**&tplCommentAuth**					|   l.Tickets.comment.one.auth			   |  omment chunck to show to authorized user.
|**&tplCommentDeleted**			   tpl.Tickets.comment.one.deleted		           | Chunk of the deleted comment.
|**&tplCommentEmailBcc**				| tpl Tickets.comment.email.bcc			           | Chunk for notification of the web-sites admins about new comment.
|**&tplCommentEmailO     \*			| tpl.Tickets.comment.   il.owner		           | Chunk for notification of the ticket's owner about new comment.
|**&tplCommentEmailReply\*   	| tpl.Tickets.comment.email.rep  		           | Chunk for notification of the user that a response to his comment has appeared.
|**&tplCommentEmailSu    iption**	| tpl.Tickets.comment.   il.subscription                           | Chunck for notification of subscribed user that a new comment has appeared in the theme.
|**&tplCommentFor     			| tpl.Tickets.comment.form      | Chunck for form of the new comment to add.
|**&tplCommentFormGuest    	| tpl.Tickets.comment.form    st		           | Chunck for form of the new coment to add for quests.
|**&tplCommentGuest**				| tpl.Tickets.comment.one.guest			           | Comment chunck for quests to show.
|**&tplComments**					| tpl.Tickets.comment.wrapper			   | Chunck wrapper for all the comments of the page.
|**&tplLoginToComment**				| tpl.Tickets.comment.login				   | Chunck with the requirement to authorize.

## Examples

* Stanmodxdard snippet call

```modx
[[!TicketComments?]]

```

* Snippet call with the comments for unauthorized.

```modx
[[!TicketComments? &allowGuest=`1`]]
```
