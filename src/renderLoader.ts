import { getUser } from "./api";

export function renderLoader(){
  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.innerText = "Loading...";
  return loading;
}

