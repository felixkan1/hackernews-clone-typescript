import { Story } from "./api";
import { formatDate } from "./utils/formatDate"



export function createStory (story:Story){
  //story Wrapper
  const storyWrapper = document.createElement("li");
  storyWrapper.classList.add("post");

  //title
  const title = document.createElement("a");
  title.classList.add("link");
  title.href = story.url;
  title.innerText = story.title;
  storyWrapper.appendChild(title);

  //tagline
  const tagLine = document.createElement("p");
  tagLine.classList.add("meta-info");
  tagLine.appendChild(document.createTextNode("by "))
  
  //tagline contents:

  //author link
  const authorLink = document.createElement("a");
  authorLink.href = "#";

  authorLink.addEventListener("click",() =>{
    document.dispatchEvent(
      new CustomEvent<{ user: string}>("user", {detail: { user: story.by }})
    );
  })

  authorLink.innerText = story.by;
  tagLine.appendChild(authorLink);

  //date
  tagLine.append(document.createTextNode(` on ${formatDate(new Date(story.time * 1000))} `));

  //comment count
  const commentCount = document.createElement("a");
  commentCount.href = "#";
  commentCount.innerText = story.descendants?.toString() ?? "0";
  commentCount.addEventListener("click", () =>{
    document.dispatchEvent(
      new CustomEvent< { story: number} >("comments", {
        detail: { story: story.id },
      })
    )
  })
  tagLine.appendChild(commentCount);

  tagLine.append(document.createTextNode( "   comments"));

  storyWrapper.appendChild(tagLine);
  return storyWrapper;

}