let input = document.querySelector(".news-input"); // changed from .text
let btn = document.querySelector(".search-button"); // changed from .search-btn

// const API = "7021b6b5520944c4b0d0cd2c063008c1"; // Replace with your actual key
// const url = "https://newsapi.org/v2/everything?q="; // Example base URL

btn.addEventListener("click", () => {
    let query = input.value;
    console.log(query);
    fetchnews(query);
});

window.addEventListener("load", () => {
    fetchnews("India");
});

function reload() {
    window.location.reload();
}

async function fetchnews(query) {
    try {
        let res = await axios.get(`https://samachar-backend-bje6.onrender.com/api/news?q=${query}`);
        console.log(res.data.articles);
        let articles = res.data.articles;
        bind(articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bind(articles) {
    let maincard = document.querySelector(".cards-container"); // updated class
    let template = document.querySelector("#template-news-card"); // updated ID
    maincard.innerHTML = "";
    for (let article of articles) {
        if (!article.urlToImage) continue;
        const clone = template.content.cloneNode(true);
        cardclone(clone, article);
        maincard.append(clone);
    }
}

function cardclone(clone, article) {
    let img = clone.querySelector("#news-img"); // corrected
    let h3 = clone.querySelector("#news-title");
    let p = clone.querySelector("#news-desc");
    let h6 = clone.querySelector("#news-source");

    img.setAttribute("src", article.urlToImage);
    h3.innerHTML = article.title;
    p.innerHTML = article.description;

    const time = new Date(article.publishedAt).toLocaleString("en-us", { timeZone: "Asia/Jakarta" });
    h6.innerHTML = `${article.source.name} · ${time}`;

    clone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function onNavItemClick(id) { // corrected function name
    fetchnews(id);
}
