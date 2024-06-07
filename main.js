let mainInput = document.getElementById("mainInput");
let getBtn = document.getElementById("get-btn");
let reposData = document.getElementById("show-data");

getBtn.onclick = function () {
  getRepos();
};
mainInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getRepos();
  }
});

async function getRepos() {
  if (mainInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    reposData.innerHTML = "";
    const response = await fetch(
      `https://api.github.com/users/${mainInput.value}/repos`
    );
    const data = await response.json();
    // console.log(data);
    showData(data);
  }
}
function showData(data) {
  data.forEach((repo) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "main-box";

    let infoDiv = document.createElement("div");
    infoDiv.className = "info";

    let repoName = createElement("h3", repo.name, "repo-name");
    infoDiv.appendChild(repoName);

    if (repo.description) {
      let description = createElement("p", repo.description, "description");
      infoDiv.appendChild(description);
    }

    let starsSpan = createElement(
      "span",
      `Stars: ${repo.stargazers_count}`,
      "stars"
    );
    infoDiv.appendChild(starsSpan);

    mainDiv.appendChild(infoDiv);

    let links = document.createElement("div");
    links.className = "links";

    let codeUrl = createElement("a", "Code", "code");
    codeUrl.href = `${repo.html_url}`;
    codeUrl.setAttribute("target", "_blank");
    links.appendChild(codeUrl);
    if (repo.homepage) {
      let visitUrl = createElement("a", "Visit", "visit");
      visitUrl.href = `${repo.homepage}`;
      visitUrl.setAttribute("target", "_blank");
      links.appendChild(visitUrl);
    }

    mainDiv.appendChild(links);

    reposData.appendChild(mainDiv);
  });
}
function createElement(tag = "", textNode, className) {
  let el = document.createElement(tag);
  el.className = className;
  elText = document.createTextNode(textNode);
  el.appendChild(elText);
  return el;
}
