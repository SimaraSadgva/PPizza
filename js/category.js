const url = window.location.search.split("=").at("-1")
const DATA =[]
let cards = document.querySelector('.cards')
fetch(`https://papajson.vercel.app/${url}`)
.then(res => res.json())
.then(meh => {
    DATA.push(...meh)
    show()
})

// .catch(err => {
//     alert("Axtarisiniz uzre netice tapilmadi!")
// })


function show() {
    let kod = '';
    DATA.forEach(card => {
        kod += `
        <a href="/pages/details.htm?category=${card.category}&id=${card.id}" class="lg:flex justify-center items-center">
            <div class="w-[310px] h-[350px]  m-3 shadow-md">
                <img src="${card.img}" alt="" class="object-cover object-center w-full h-[200px] ">
                <div class="justify-between p-2 space-y-4">
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <h2 class="text-xl font-bold ">${card.title}</h2>
                        <button type="button" class="bg-green-600 whitespace-nowrap h-[40px] text-white uppercase font-bold p-2 rounded-md">bunu seç</button>
                      </div>
                        <p class="dark:text-gray-800">${card.composition}</p>
                    </div>
                </div>
            </div>
        </a>`;
    });
    cards.innerHTML = kod;
  }

 function getPage() {
    window.location.href = '../index.htm';
}
 