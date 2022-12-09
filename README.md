# ToDo list interview project

Thanks for taking the time to interview! We really appreciate it, and we hope to see the best of your work.

## Rules

Please do this interview project on your own, without the help of anyone else.
With that being said, you are more than welcome to use the internet.
Google and Stack Overflow are invaluable tools in our daily lives, and we wouldn't expect you to do your best work without them.

We'd really like to see every part of your development process, so please _record your screen while you work_.

In addition to writing the code required by the instructions, write down your answers to the questions in the instructions directly in this README file.

## Getting started

Make a fork of this repo on your own GitHub account and then clone it down to your personal computer.

You should be able to spin this app up using `yarn install` and `yarn start` (or `npm` if you prefer).
If you have trouble, please don't hesistate to reach out.

## Important Project contents

There are a few files that are important for this app:

### App.tsx

The main logic of the "frontend" of this app is in App.tsx. You should start your work there.

### ApiClient.ts

An API client that interacts with a fake database. Read the file over, but you should not need to edit it until the bonus section

## Instructions

1. The page doesn't change when you click the "Add ToDo" button. Why not?
   Fix this bug and describe the tradeoffs in your implementation. Would your solution work if a user had lots of (1,000,000+) todos?
   It's perfectly fine if the answer is no, but please discuss what would go wrong when the number of ToDos increases significantly
2. "Mark Done" doesn't appear to work at all. Why not?
   Fix this bug and make sure the page updates once the ToDo has been marked as "done".
   How could the API have been better designed to make the bug more noticable?
3. The ApiClient takes an argument `mockDelay`. Set that to `true` on line 5 of `App.tsx`.
   Add some visual indication to the UI during the initial "loading" time and any time the page is waiting for the server to respond.
   The style design doesn't need to look good, but it should indicate what the user can and cannot do.
4. Make the todo items re-orderable using drag-and-drop. You are more than welcome to use a 3rd party library for this, or you can roll vanilla.
   If you chose to use a library, why did you pick that library? If you chose to write the logic yourself, why did you choose to do that?

## Tips

- The project needs some organization. Feel free to create as many files and/or components as you need.
- Git is your friend. Commit often and use descriptive commit messages. Push your work to GitHub so you don't lose it.
- Get it working and then make it look good. Don't get lost in the perfect solution before you have a working solution.
- Include more comments than you would in normal code. This will help us understand your thought process.
- Take breaks when you need them.

## Responses

Please write your responses to the questions in the instructions here. Please indicate any tradeoffs you made.

1. My implementation is quick to implement and fixes the bug for smaller datasets, but the user experience for very large datasets would be poor. With this setup the user would have to wait a very long time see the list update if there were 1,000,000+ todos. Some considerations to address that would be to inform the user that the list is updating with the equivalent of a loading icon, or to update the UI immediately while the data is updated in the background (and of course inform the user should the data fail to update).
2. The API could be updated to throw an error if a provided id is not found in the list of toDos, since it should not be possible to submit an id that does not exist. I would also have made the ids numbers instead of strings, since they all appear to be numbers anyway.
3.
4. I sort of chose to write this myself (really I integrated a solution I found online) because I found that the libraries were either no longer being supported, not really for this use case, were visually not too appealing, or looked like they could take a bit of trouble to setup. I think if I had like a dev day to do this then the library looks much nicer as you can see I don't have great hover states or clear indicators of where the user can drag and drop. But with 3 hours for the interview assessment it seemed risky that it might be troublesome to integrate compared to the much simpler solution I found which relies on built-in HTML attributes and simple hooks.

Note: I have 2 monitors and didn't figure out a great way to share that. So to compromise I'm only using the second one to view te app as I work. But will try to drag it into the recorded view for any internet searches or console.logs or anything like that. Also I added some of my thought processes below to assist.

## Thought Processes

1. Looks like it works on refresh. Likely the page is rendering before the addition to the list is complete. So we're still getting the old list. Actually looks like we aren't getting the new list at all.
2. Initial looks indicated that toggleDone expexts an ID but was receiving label, so the `find` function was (correctly) not finding the match. Fixing this causes it to work on page refresh. This appears to be due to the same issue as with problem 1. After the update we are not querying for the toDoList again. A potential improvement on my solution would be for the jsx to update just that one entry instead of needing to query the entire toDo list again. This would be more performant in cases with a lot of toDos, but the trade-off is the UI could potentially get out of sync with the state.
3. At first I thought the loading was just on the getting of the toDos, but I see it's also on the addToDos function. This means we have a couple loading states to add. One problem with my implementation is that if the getToDos fails it will just tell the user that it is loading forever. This is pretty easily handled with some similar logic to my loading logic. Have to consider how we want to reflect the loading to the user on the addButton press. Because we could still show the rest of the list, but the markAsDone buttons likely won't work. Confirmed with a quick test that they won't work. This means either disabling these while loading, or showing loading for the whole thing. The pretty solution is to disable these mark as done buttons. But per the assessment recommendations, I'll do the faster solution for now. One thing I overlooked is that the toggleDone depends on getToDos so it actually is effected by the delay as well. The fast solution is also to apply the loading there. The better solution is to either do a button disabling and notify the user of the loading, or to show the UI update prior to the state actually changing (which has some pretty serious concerns as outlined above and should probably be avoided). Verified that the user can still type in the text input since that's the only interaction that is not blocked by waiting on the server to respond.
4. Initial thoughts are that I've not personally made a drag and drop component before. There's likely some interesting concerns like what area can you actually drop the component in, making sure contained elements like the markAsDone buttons are still clickable, etc. Given that, and the time requirements, I think a library would be best. For a library I look for something that is widely used and appears to be regularly maintained. I'll also be looking for something I feel is quick and easy to plug into this React application. React beautiful DND is no longer supported so I don't particularly want to use that. 

Draggable looks like a different use case. I don't particularly like the look of React grid layout. But React DND looks a bit more complext then necessary. If I had more time then I like the look of React DND, it has 1,267,212 weekly downloads, it looks to be somewhat maintained, and the bugs aren't major security bugs (though I wouldn't expect that given the nature of the app). I'm gonna do a quick check to see if my assumptions about complexity of drag and drop were wrong. Thinking some more it's probably easier then expected. But if I'm mistaken there then I'll try to hookup React DND.

Found some code that looks pretty quick to wire up. Normally I'd test this in a sandbox, but for the time constraints I'll just overwrite the app for now and see if it works. It's certainly less visually appealing, but it works. Going to pull the web page to my other monitor and get to replicating that.

Drag and drop works now, but I'm suspecting the elements will reset on refresh since I didn't integrate the ApiClient with my solution yet. Testing that and if it is broken then that should be a quick fix.

Should mention that I also made sure to test the edge cases such as moving an item to the bottom, top, or sides.

## Submitting

To submit your code, send us a link to your repo.
Once we confirm that we've downloaded your work, please delete the repo you created so future candidates don't accidentally find your solution.

To submit your screen recording, please reach out to schedule a time we can use https://webwormhole.io/ to transfer the large file.
