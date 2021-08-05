import { getItem } from "./api";
import { createStory } from "./createStory";
import { formatDate } from "./utils/formatDate";
import { Story } from "./api";

export async function renderComments (storyId: number){
  const story = await getItem(storyId);
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments-container");
  const storyMarkup = createStory(story);

  if(storyMarkup) {
    commentsContainer.appendChild(storyMarkup);
  }

  const comments = await Promise.all(story.kids.slice(0,30).map(renderComment));

  comments.forEach((comment) => {
    commentsContainer.appendChild(comment);
  });

  return commentsContainer;

}

async function renderComment (commentID: number){
  const comment = await getItem(commentID);
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");

  const commentTagLine = document.createElement("p");
  commentTagLine.classList.add("meta-info");
  commentTagLine.appendChild(document.createTextNode("by "));


  //author link
  const authorLink = document.createElement("a");
  authorLink.href = "#";
  authorLink.innerText = comment.by;
  authorLink.addEventListener("click", () =>{
    document.dispatchEvent(
      new CustomEvent<{ user: string}>("user", {detail:{ user:comment.by }})
    );
  });
  commentTagLine.appendChild(authorLink);

  //date
  commentTagLine.appendChild(
    document.createTextNode(` on ${formatDate(new Date(comment.time * 1000))}`)
  );
  commentContainer.appendChild(commentTagLine);

  const commentText = document.createElement("div");
  commentText.classList.add("comment-text");
  commentText.innerHTML = comment.text;
  commentContainer.appendChild(commentText);

  return commentContainer;
}