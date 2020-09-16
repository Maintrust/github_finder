console.log("hello");

const http = new EasyHTTP();
const profile = document.createElement("div");
const redosDiv = document.createElement("div");
document.getElementById("search").addEventListener("keyup", fetchUser);

async function fetchUser(e) {
  const value = e.target.value;
  const info = await http.get(`https://api.github.com/users/${value}`);
  console.log(info.message);
  if (info.message === "Not Found") {
    warning.style.display = "block";
    setTimeout(() => (warning.style.display = "none"), 3000);
    return;
  }
  const repos = await http.get(`https://api.github.com/users/${value}/repos`);
  console.log(info);
  profile.innerHTML = `
<div class="border-gray-300 border rounded p-4 px-6 m-3 ml-0 mr-0 flex flex-wrap sm:flex-no-wrap">
  <div class="flex flex-wrap w-64 m-auto mb-2 sm:m-2">
    <img src="${info.avatar_url}" alt="${info.name}" class="">
    <button class="bg-blue-600 text-white rounded-full w-full mt-2 h-10 self-end">
    <a href = '${info.html_url}' target="_blank">
      View profile
    </a>
    </button>
  </div>
  <div class="m-auto">
    <div class="flex h-14 flex-wrap">
      <div class="box-info bg-blue-400 text-xs">Public Repos: ${info.public_repos}</div>
      <div class="box-info bg-gray-400 text-xs">Public Gists: ${info.public_gists}</div>
      <div class="box-info bg-green-400 text-xs">Followers: ${info.followers}</div>
      <div class="box-info bg-purple-400 text-xs">Following: ${info.following}</div>
    </div>
    <div class="border-gray-300 border rounded m-2">
      <div class="p-2 border-b">
        Company: ${info.company}
      </div>
      <div class="p-2 border-b">Website/blog: ${info.blog}</div>
      <div class="p-2 border-b">Location: ${info.location}</div>
      <div class="p-2">Member since: ${info.created_at}</div>
    </div>
  </div>
</div>`;
  let html = '<h1 class="font-extrabold text-2xl ml-8">Latest Repos</h1>';
  repos.forEach((repo, index) => {
    if (index > 3) return;
    html += `<div class="border-gray-300 border rounded p-1 px-6 m-3 ml-0 mr-0 flex flex-wrap">
  <p class="m-auto mr-2 ml-2 w-full sm:w-auto sm:flex-1">${repo.name}</p>
  <div class="flex flex-auto h-14">
    <div class="box-info bg-blue-400 text-xs">Share: ${repo.stargazers_count}</div>
    <div class="box-info bg-green-400 text-xs">Watchers: ${repo.watchers}</div>
    <div class="box-info bg-orange-400 text-xs">Forks: ${repo.forks}</div>
  </div>
</div>`;
  });
  redosDiv.innerHTML = html;
  document.getElementById("profile_content").appendChild(profile);
  document.getElementById("profile_content").appendChild(redosDiv);
}
