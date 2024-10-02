const url = window.location.search.split("&")

const categor = url[0].split("=").at(-1)
console.log(categor);

const id = url[1].split("=").at(-1)

const MEHSUL = []
const content = document.getElementById("content")
const say = document.getElementById('say')
const desktopmehsuleal = document.getElementById('desktopmehsuleal')


fetch(`https://papajson.vercel.app/${categor}/${id}`)
.then(ser => ser.json())
.then(data => {
    MEHSUL.push(data)
    handleCard()
})



function handleCard(){
    MEHSUL.map( item => {
        content.innerHTML +=`
           <section class="py-6 dark:bg-gray-100 dark:text-gray-900">
        <div class="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
            <div class="py-6 md:py-0 md:px-6">
                <h1 class="text-4xl font-bold">${item.title}</h1>
                <p class="flex items-center pt-4">
                        <i class="fa-solid fa-plate-wheat text-green-800"> Category: </i>
                        <span class="text-center pl-2 uppercase font-bold text-green-900">${item.category}</span>
                </p>
                <div class="space-y-4">
                    <p class="flex items-center">
                        <h1 class="fa-solid fa-plate-wheat  text-red-800"> Composition :</h1>
                        <span>${item.composition}</span>
                    </p>
                    
                    <p class="flex items-center">
                        <i class="fa-solid fa-money-bill-1-wave  text-red-800"> Price: </i>
                        <span>${item.price}</span>
                    </p>
                    <div class="flex rounded my-2">
                        <a class="bg-green-500 w-[50%] text-center text-white py-1" href="">Ənənəvi</a>
                        <a class="bg-gray-200 w-[50%] text-center text-green-700 py-1" href="">Nazik</a>
                    </div>
                    <div class="py-1 font-semibold w-full">
                        <select class="bg-[#AD0F14] outline-none px-1 text-[15px] text-white w-full h-[30px]">
                            <option value="5.5">Mini pizza, 15 sm - 5.5 M </option>
                            <option value="11">Kiçik, 23 sm - 11 M</option>
                            <option value="17">Orta, 30 sm - 17 M</option>
                            <option value="21">Böyük, 35 sm - 21 M</option>
                        </select>
                    </div>
                    <div class="sebet-mehsulelave flex items-start lg:w-[80%] w-[90%] justify-start py-4">
                        <div class="flex items-start w-full justify-start flex-row">
                            <button onclick="hesabla(-1)" id="btnInc" class="w-[29px] h-[29px] bg-gray-400 text-black text-[14px] font-bold">➖</button>
                             <span id="countDiv" class="bg-gray-200 flex items-center justify-center w-[49px] h-[29px] text-black text-[19px] font-bold">1</span>
                            <button onclick="hesabla(1)" class="w-[29px] h-[29px] bg-green-500 text-white text-[14px] font-bold">➕</button>
                        </div>
                     <p id="qiymetntc" class=" text-[19px] font-bold" data-price="${item.price}">Qiymət : ${item.price} ₼</p>
                    </div>
                    <div>
                             <button onclick="addbbasket('${item.img}', '${item.title}', ${item.price}, '${item.id}')" class="bg-green-500 p-2 text-white">SƏBƏTƏ ƏLAVƏ ET</button>
                        </div>
                </div>

            </div>
            <form novalidate="" class="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                <img src="${item.img}" alt="">
                <button onclick="goBack()" type="button" class=" text-red-800 self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600"><i class="fa-solid fa-circle-left text-4xl text-green-400"></i></button>
            </form>
        </div>
    </section>
        `
    })

}

function goBack() {
    window.location.href = '../index.htm';
}


let basket = [];

function openBasket() {
    document.getElementById("sidebar").style.display = "flex"; 
}

function closeBasket() {
    document.getElementById("sidebar").style.display = "none"; 
}

//const bbasket = JSON.parse(localStorage.getItem("meshullarelavesi")) || []
const bbasket =JSON.parse(localStorage.getItem("basket")) || []

function addbbasket(img, title, price, id) {
    const countDiv = document.querySelector("#countDiv");
    const obj = {
        id,
        img,
        title,
        price,
        count: +countDiv.innerHTML, 
        opsi: price * +countDiv.innerHTML 
    };

 
    const element = bbasket.find(item => item.id == id);

    if (!element) {
      
        bbasket.push(obj);
    } else {
       
        element.count += +countDiv.innerHTML;
        element.opsi = element.price * element.count; 
    }
    saydes.innerHTML = "Səbətinizdə məhsulların sayı: " + bbasket.reduce((total, item) => total + item.count, 0);

    const tamcem = bbasket.reduce((total, item) => total + item.opsi, 0);
    umummebcem.innerHTML = "Ümumi məbləğ: " + tamcem.toFixed(2) + '₼';

    sebeteYaz();

    const parse=JSON.stringify(bbasket)

localStorage.setItem("Basket:",parse)
}

function sebeteYaz() {
    const meshullarelavesi = document.getElementById("meshullarelavesi");
     meshullarelavesi.innerHTML = "";

     const parse = JSON.stringify(bbasket);
    localStorage.setItem("basket", parse);

    bbasket.map(item => {

            meshullarelavesi.innerHTML += `
               <div class="border-[1px] flex">
                    <img onclick="deletebbasket('${item.id}')" class="w-[40%]" src="${item.img}" alt="">
                    <div>
                       <p>Say: ${item.count} </p>
                        <p>Ad: ${item.title} </p>
                        <p>Qiymət: ${item.opsi.toFixed(2)} ₼</p>
                    </div>
                </div>
            `;
        })

        }



function opensebet() {
    const desktopsebet=document.getElementById('desktopsebet')
    if (desktopsebet.style.display === 'none' || desktopsebet.style.display === '') {

        desktopsebet.style.display = 'block'
    } else {
        desktopsebet.style.display === 'none'
    }
}
function desclosd() {
    const desktopsebet=document.getElementById('desktopsebet')
    if (desktopsebet.style.display === 'block') {

        desktopsebet.style.display = 'none'
    } 
}

function hesabla(arg) {
    const countDiv = document.querySelector("#countDiv"); 
    const qiymetntc = document.getElementById('qiymetntc'); 
    const umumhesabim = parseFloat(qiymetntc.getAttribute('data-price')); 

    let deyer = arg + parseInt(countDiv.innerHTML); 

    
    if (deyer < 1) {
        deyer = 1;
        document.getElementById("btnDec")
    } else {
        document.getElementById("btnDec")
    }

   
    countDiv.innerHTML = deyer;


    const totalPrice = (umumhesabim * deyer).toFixed(2);


    qiymetntc.innerHTML = `Qiymət : ${totalPrice} ₼`;
}


function getPage() {
    window.location.href = '../index.htm';
}


// const parse = JSON.stringify(bbasket)

// localStorage.setItem("meshullarelavesi" , "")