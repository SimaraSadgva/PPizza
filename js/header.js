const category = []

fetch("https://papajson.vercel.app/category")
.then(res => res.json())
.then(cats => {
    category.push(...cats)
    addMenu()
}) 

const menu = document.getElementById("menu")

function addMenu(){
    category.map(item=> {
        menu.innerHTML += `
         <a href="/pages/category.htm?category=${item.slug}" class="hover:text-red-200">${item.category}</a>
        `
    })
}