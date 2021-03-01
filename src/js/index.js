/*Слайдер должен быть реализован со стрелакми, при нажатии на которые случается переход на новый блок элементов.
Слайдер бесконечный, не имеет границ, т.е. можно нажимать влево и вправо сколько угодно раз, и каждый раз контент в блоках будет новый. В нашем случае, каждый новый слайд будет содержать псевдослучайный набор питомцев, т.е. формироваться из исходных объектов в случайном порядке, с двумя условиями. Во-первых, в самом блоке слайда карточки с птомцами повторяться не будут. Во-вторых, в следующем блоке, дублирующихся карточек с карточками текущего блока, не будет. Например в сладйдере из 3 элементов, следующий выезжающий слайд будет содержать 3 новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде.
При 1280px <= width в блоке слайда 3 питомца.
При 768px <= width < 1280px в блоке слайда 2 питомца.
При width < 768px в блоке слайда 1 питомец


Pagination
Пагинация представляет из себя переключение страниц (таблиц или слайдов), путем перерисовки одних данных на другие, эффекты при этом могут быть разные: slide, fade. При этом всегда есть первая сраница и последняя.
Самое важное: при неизменных размерах области пагинации, возвращаясь на страницу под определнным номером, контент на ней всегда будет одинаков.
При загрузке Our Pets должен быть сформирован массив из 48 элементов псевдо-случайным образом. Каждый из 8 приведенных на макете питомцев должен встречаться ровно 6 раз. При этом каждые 8, каждые 6, и каждые 3, питомца не должны повторяться. Т.е. на одной странице пагинации не может быть одноврменно два одинаковых питомца.
При загрузке Our Pets всегда должна быть активной первая страница.
Кнопка << всегда открывает первую страницу
Кнопка < открывает предыдущую до текущей страницы
Кнопка > открывает следующую после текущей страницы
Кнопка >> всегда открывает последнюю страницу
В кружке по центру указан номер текущей страницы
Если открыта первая страница, кнопки << и < - неактивны.
Если открыта последняя страница, кнопки > и >> - неактивны.
При 1280px <= width на странице одновременно показаны 8 питомцев, а самих страниц 6. Т.е. при нажатии >> открывается шестая страница.
При 768px <= width < 1280px на странице одновременно показаны 6 питомцев, а самих страниц 8. Т.е. при нажатии >> открывается восьмая страница.
При width < 768px на странице одновременно показаны 3 питомца, а самих страниц 16. Т.е. при нажатии >> открывается шестнадцатая страница.


*/

let popup = document.querySelector(".pets-info");
let popupButton = document.querySelector(".popup__button");

let popubBlockBg = document.querySelector(".blockBG");


/*scripts for sliders */

let sliderConteiner = document.querySelector(".slider__images");
let petsNameAndImage = {};
let isMainPage;

/*******************on page load get info about pets and create slider images************/

getInfoAboutPet()
    .then((result)=>getPetsName(result))
    .then(()=>createSlider())
    .then(()=>infinitySlider());


/*****filling the array with pairs of key: value, where key is the pet's name and the value is pet's image*/
function getPetsName(data){
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key].name;
            petsNameAndImage[element] = data[key].img 
        }
    }
}


/***********************create slider*************/ 
function createSlider(){
    for (const key in petsNameAndImage) {
        createPetInfoConteiner(key,"end");
    }
}


/******************infinity slider and pagination********************************/
function infinitySlider(){
        let rightButton = document.querySelector(".right-button");
        let leftButton = document.querySelector(".left-button");
        if(rightButton) {
            rightButton.addEventListener("click",()=>{
                let position = "end";
                let sliderItem = Array.from(document.querySelectorAll(".pets__info-conteiner"));
                let firstPetName = sliderItem[0].dataset.name;
                createPetInfoConteiner(firstPetName, position);
                sliderItem[0].remove();
            });
            leftButton.addEventListener("click",()=>{
                let position = "begin";
                let sliderItem = Array.from(document.querySelectorAll(".pets__info-conteiner"));
                let lastPetName = sliderItem[sliderItem.length -1].dataset.name;
                createPetInfoConteiner(lastPetName, position);
                sliderItem[sliderItem.length -1].remove();
            });
        }
}


function createPetInfoConteiner(key,position){
    let sliderConteiner = document.querySelector(".slider__images");
    let imgUrl = petsNameAndImage[key];
    let petsInfoConteiner = document.createElement("div");
            petsInfoConteiner.classList.add("pets__info-conteiner");
            petsInfoConteiner.setAttribute("data-name", key);
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
            petTitle.innerHTML = key;
            petsInfoConteiner.append(petTitle);
        let button = document.createElement("button");
            button.classList.add("pets-image__button");
            button.setAttribute("data-name", key);
            button.innerHTML = "Learn more";
            petsInfoConteiner.append(button);
            getPetName();
}



/***********get pet name by click on slider item and call popup with info about this pet**************/
function getPetName(){
    let petsInfoConteiner = document.querySelectorAll(".pets-image__button");
    petsInfoConteiner.forEach(element =>{              
        element.addEventListener("click", (e)=>{
            let targetPet = e.target;
            let petName = targetPet.dataset.name;
            popup.style.display = "flex";
            popubBlockBg.style.display = "block";
            getInfoAboutPet().then((result)=> getPetInfo(result, petName));
            
        });
    });
}

/**********get data about pets from json file**********************/
function getInfoAboutPet(){
    return new Promise((resolve, reject)=>{
        let request = new XMLHttpRequest();
        request.open("GET", "src/assets/json/petsData.json");
        request.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
        request.onload = function(){
            if(request.status == 200){
                resolve(JSON.parse(request.response));
            }else{
                reject("Data not found");
            }
        }
        request.send();
    })
}

function getPetInfo(petData, petName){
    let petInfo;
    petData.forEach(object => {
        if(object.name === petName){
            petInfo =  object;
            console.log(petInfo)
        }
    });
    createPopup(petInfo);
}

/***********************burger menu****************/
showAndHideMenu();
function showAndHideMenu(){
    let burgerMenuButton = document.querySelector(".burger__menu");
    let menuList = document.querySelector(".menu__list");
    burgerMenuButton.addEventListener("click", ()=>{ 
            if(burgerMenuButton.classList.contains("burger--open")){
                    burgerMenuButton.style.transform = "rotate(0)"; 
                    menuList.classList.remove("menu--open")
                    burgerMenuButton.classList.remove("burger--open");
                    document.body.classList.remove("body--noscroll");
            }else{
                burgerMenuButton.style.transform = "rotate(-90deg)"; 
                menuList.classList.add("menu--open")
                burgerMenuButton.classList.add("burger--open");
                document.body.classList.add("body--noscroll");
            }
    });
    menuList.addEventListener("click", ()=>{
        menuList.classList.remove("menu--open");
        burgerMenuButton.style.transform = "rotate(0)";
        burgerMenuButton.classList.remove("burger--open");
        document.body.classList.remove("body--noscroll");
    })
}


/*****************create popup window**********************/
function createPopup(petData){
    document.querySelector(".pets-image").style.backgroundImage = `url(${petData.img})`;
    document.querySelector(".popup__pet-name").innerHTML = petData.name;
    document.querySelector(".popup__pet-breed").innerHTML = petData.breed;
    document.querySelector(".description-text").innerHTML = petData.description;
    document.querySelector(".pets-age").innerHTML = petData.age;
    document.querySelector(".inoculations").innerHTML = petData.inoculations;
    document.querySelector(".diseases").innerHTML = petData.diseases;
    document.querySelector(".parasites").innerHTML = petData.parasites;
    noScrollBody ()
}

function noScrollBody () {
    document.body.classList.add("body--noscroll");
}

/************scripts for mouseover and click effect*/
popupButton.addEventListener("click",()=>{                  //delete popup by click on button
    popup.style.display = "none";
    popubBlockBg.style.display = "none";
    document.body.classList.remove("body--noscroll");
});

popubBlockBg.addEventListener("click", ()=>{                //delete popup by click on blockBg
    popup.style.display = "none";
    popubBlockBg.style.display = "none";
    document.body.classList.remove("body--noscroll");
}) 

popupButton.addEventListener("mouseover",()=>{               //change color of button on hover
    popupButton.style.backgroundColor  = "rgb(253, 220, 196)";
});

popupButton.addEventListener("mouseout",()=>{               //change color of button on hover
    popupButton.style.backgroundColor  = "transparent";
});

popubBlockBg.addEventListener("mousemove", ()=>{            //change color of button when mouse on blockBG
    popupButton.style.backgroundColor  = "rgb(253, 220, 196)";
})

popubBlockBg.addEventListener("mouseout", ()=>{            //change color of button when mouse on blockBG
    popupButton.style.backgroundColor  = "transparent";
}) 

