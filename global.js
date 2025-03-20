console.log("IT'S ALIVE!!!")


let pages = [
    {url: "/", title: "Home"},
    {url: "/projects/projects.html", title: "Projects"},
    {url: "/contact/contact.html", title: "Contact"},
    {url: "/cv/cv.html", title: "Cv"},
]

let nav = document.createElement("nav");
document.body.prepend(nav);

let ul = document.createElement("ul");
nav.appendChild(ul);
ul.classList.add("nav-menu")


for (let p of pages) {
    let a = document.createElement("a");
    let li = document.createElement("li");
    li.appendChild(a)
    a.href=p.url;
    a.innerText=p.title;
    ul.appendChild(li);
}

function $$ (selector, context = document){
    return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a");

let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);

currentLink.classList.add("current");

if (currentLink) {
    currentLink.classList.add("current");
}