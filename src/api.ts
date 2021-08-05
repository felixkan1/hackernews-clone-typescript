const TOP_POSTS_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const NEW_POSTS_URL = "https://hacker-news.firebaseio.com/v0/newstories.json";
const USER_URL_BASE = "https://hacker-news.firebaseio.com/v0/user/";
const STORY_URL_BASE = "https://hacker-news.firebaseio.com/v0/item/";

function getStoryUrl(story:number):string{
    return `${STORY_URL_BASE}${story}.json`;
}

function getUserUrl(username:string):string{
  return `${USER_URL_BASE}${username}.json`;
}

export interface Story{
  by:string;
  descendants:number;
  id:number;
  kids:number[];
  score:number;
  time:number;
  title:string;
  type:"job"|"story"|"comment"|"poll"|"pollopt";
  url:string;
  text:string;
}

export interface User{
  about:string;
  created:number;
  delay:number;
  id:string;
  karma:number;
  submitted:string[];
}

let itemCache:{[itemID:number]:Story} = {};

export async function getItem (id:number):Promise<Story> {
  if(itemCache[id]) return itemCache[id];

  const item = await (await fetch(getStoryUrl(id))).json();
  itemCache[id] = item;
  return itemCache[id];
}

export async function getStories (which:"top"|"new"){
  let type = which === "top" ? TOP_POSTS_URL : NEW_POSTS_URL;
  let storyIDs:number[] = await (await(fetch(type))).json();

  //take first 30 stories and get its corresponding stories
  return Promise.all(storyIDs.slice(0.30).map(getItem));
}

export async function getComments (storyId: number){
  const story = await getItem(storyId);

  const comments = story.kids.slice(0,30).map(getItem);
  return Promise.all(comments);

}

let userCache:{[username:string]:User} = {};

export async function getUser(username: string){
  if(userCache[username]) return userCache[username];

  const user = await (await fetch(getUserUrl(username))).json()
  userCache[username] = user;

  return user;
}




