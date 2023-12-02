console.log("script loaded");
const loadAllBtn = document.getElementById("btnAll");
const loadMusicBtn = document.getElementById("btnMusic");
const loadComedyBtn = document.getElementById("btnComedy");
const loadDrawingBtn = document.getElementById("btnDrawing");
const sortButton = document.getElementById("btnSort");
let fetchedData = [];

const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data.data;
      displayData();
    });
};

const loadMusicData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1001")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data.data;
      displayData();
    });
};

const loadComedyData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1003")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data.data;
      displayData();
    });
};
const loadDrawingData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1005")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data.data;
      displayData();
    });
};

function getVal(val) {
  multiplier = val.substr(-1).toLowerCase();
  if (multiplier == "k") return parseFloat(val) * 1000;
  else if (multiplier == "m") return parseFloat(val) * 1000000;
}

loadAllBtn.addEventListener("click", loadAllData);
loadMusicBtn.addEventListener("click", loadMusicData);
loadComedyBtn.addEventListener("click", loadComedyData);
loadDrawingBtn.addEventListener("click", loadDrawingData);
sortButton.addEventListener("click", () => {
  fetchedData.sort((a, b) => {
    return getVal(b.others.views) - getVal(a.others.views);
  });
  displayData();
});

function displayData() {
  const contentArea = document.getElementById("contentArea");

  if (fetchedData.length === 0) {
    contentArea.innerHTML = '<div class="cls"><img src="Icon (1).png" alt=""></br><p role="alert">Oops!Sorry, There is no content</p></div>';
  } else {
    let contentHTML = "";
    fetchedData.forEach((video) => {
      const duration = convertToHMS(video.others.posted_date);
      const verified = isVerified(video.isVerified);
      contentHTML += `<div role="listitem">
                         <p>${video.title}</p>
<img src=${video.thumbnail} class="img-responsive"  />
                         <p>Duration: ${duration}</p>
                         <p>Views: ${video.others.views}</p>
                         <p>${verified}</p>
                        </div>`;
    });
    contentArea.innerHTML = contentHTML;
  }
}

function convertToHMS(sec) {
  if (isNaN(sec)) {
    console.warn("Invalid duration:", sec);
    return "Unknown duration";
  }

  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec - hrs * 3600) / 60);
  let seconds = sec - hrs * 3600 - min * 60;
  seconds = Math.round(seconds * 100) / 100;

  return hrs + "hrs " + min + "min ago";
}

function isVerified(verified) {
  const verifiedIndicator = verified ? "✔️" : "❌";
  return `<span role="img" aria-label={verified ? "Verified" : "Not verified"}>
      ${verifiedIndicator}
    </span>`;
}

loadAllData();
function displayBlogData() {
  document.getElementById("demo").innerHTML = "Blog";
} 
document.getElementById("demo2").addEventListener('click', displayBlogData);
displayBlogData();