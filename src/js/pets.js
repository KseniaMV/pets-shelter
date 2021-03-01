/***************create pets slider******************/

let petsPageArray = [];

/*******************on page load get info about pets and create slider images************/

getInfoAboutPet()
    .then((result)=>getPetsName(result))
    .then(()=>createPageArray())
    .then(()=>shuffle())
    .then(()=>pagination());


function createPageArray(){
    for (let i = 0; i < 9; i++) {
        petsPageArray[i] =  [];
        for (const key in petsNameAndImage) {
            let pet = [key, petsNameAndImage[key]]
            petsPageArray[i].push(pet);
        } 
    }
}

function shuffle(){
    for (let i = 0; i < petsPageArray.length; i++) {
        const element = petsPageArray[i];
        for (let i = element.length - 1; i > 0; i--){
            let randomNumber = Math.floor(Math.random() * (i + 1)) //случайный индек от 0 до i
            let currentnumber = element[i];
            element[i] = element[randomNumber];
            element[randomNumber] = currentnumber;
        }
    }
};


/***************pagination******************/
function pagination(){
    let count = 1;
    let pageBack = document.querySelector(".page-back");
    let pageNext = document.querySelector(".page-next");
    let pageNumber = document.querySelector(".page-number");
    let lastPage = document.querySelector(".last-page");
    let firstPage = document.querySelector(".first-page");
    pageBack.addEventListener("click",()=>{
        if(count === 2){
            count = 1;
            lastPage.classList.remove("pagination__inactive");
            pageNext.classList.remove("pagination__inactive");
            firstPage.classList.add("pagination__inactive");
            pageBack.classList.add("pagination__inactive");
        }else{
            count --;
        }
        pageNumber.innerHTML = count;
        createPage(count);
    })
    pageNext.addEventListener("click", ()=>{
        if(count === 5){
            count = 6;
            lastPage.classList.add("pagination__inactive");
            pageNext.classList.add("pagination__inactive");
            firstPage.classList.remove("pagination__inactive");
            pageBack.classList.remove("pagination__inactive");
        }else{
            count ++;
        }
        pageNumber.innerHTML = count;
        createPage(count);
    })
    lastPage.addEventListener("click",()=>{
        pageNumber.innerHTML = 6;
        createPage(6);
        lastPage.classList.add("pagination__inactive");
        pageNext.classList.add("pagination__inactive");
        firstPage.classList.remove("pagination__inactive");
        pageBack.classList.remove("pagination__inactive");
    })
    firstPage.addEventListener("click", ()=>{
        pageNumber.innerHTML = 1;
        createPage(1);
        lastPage.classList.remove("pagination__inactive");
        pageNext.classList.remove("pagination__inactive");
        firstPage.classList.add("pagination__inactive");
        pageBack.classList.add("pagination__inactive");
    })
}

function createPage(count){
    let sliderConteiner = document.querySelector(".our-pets__slider__images");
    if(sliderConteiner.childNodes){
        let images = Array.from(document.querySelectorAll(".pets__info-conteiner"));
      for (let index = 0; index < images.length; index++) {
          const element = images[index];
          element.remove();
      }
         let currentPage = petsPageArray[count];
         for (let i = 0; i < currentPage.length; i++) {
             createPetInfoConteiner2(currentPage[i][0], currentPage[i][1],"end");
         }
    }
}

function createPetInfoConteiner2(name,image,position){
    let sliderConteiner = document.querySelector(".our-pets__slider__images");
    let imgUrl = image;
    let petsInfoConteiner = document.createElement("div");
            petsInfoConteiner.classList.add("pets__info-conteiner");
            petsInfoConteiner.setAttribute("data-name", name);
            if(position === "begin"){
                sliderConteiner.prepend(petsInfoConteiner); 
            }
            if(position === "end"){
                sliderConteiner.append(petsInfoConteiner);  
            }
        let petImage = document.createElement("img");
            petImage.classList.add("pet_image");
            petImage.setAttribute("src", imgUrl);
            petImage.setAttribute("alt", "pet");
            petsInfoConteiner.append(petImage);
        let petTitle = document.createElement("h3");
            petTitle.classList.add("pets-name");
            petTitle.innerHTML = name;
            petsInfoConteiner.append(petTitle);
        let button = document.createElement("button");
            button.classList.add("pets-image__button");
            button.setAttribute("data-name", name);
            button.innerHTML = "Learn more";
            petsInfoConteiner.append(button);
            getPetName();
}






