$('document').ready(function () {
    $('.screen').fadeOut(1000);
    searchbyname("")
    $("body").css("overflow", "visible");
})
$('#icon').click(function () {
    if ($('#allnav').css('left') == '-265px') {
        $("#allnav").animate({ left: 0 }, 500)
        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100);
        }
    }
    else {
        closes()
    }
})
function closes() {
    $("#allnav").animate({ left: -265 }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({ top: 500 }, 500);
}
async function imagemeals(category) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    var response = await res.json();
    console.log(response.meals);
    display_images(response.meals)
}
function display_images(responsee) {
    $('.screens').fadeIn(300).fadeOut(300);

    box = ""
    for (let i = 0; i < responsee.length; i++) {
        box += `  <div class="col-md-3 mt-4">
        <div onclick="details('${responsee[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
            <img class="w-100" src="${responsee[i].strMealThumb}" alt="mealimages">
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${responsee[i].strMeal}</h3>
            </div>
        </div>
</div>`

    }
    document.getElementById('meals').innerHTML = box;
}

async function details(id) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var response = await res.json();
    console.log(response.meals[0]);


    displaydetails(response.meals[0])
}
function displaydetails(meal) {
    $('.screens').fadeIn(300).fadeOut(300);
    document.getElementById('inpu').innerHTML = ""
    let gradiantstrTags = ``;
    let mealstrTags = meal.strTags;
    console.log(mealstrTags)
    if (mealstrTags == null) {
        gradiantstrTags = ``
    }
    else {
        let arrstrTags = mealstrTags.split(",");
        console.log(arrstrTags);
        for (let i = 0; i < arrstrTags.length; i++) {
            gradiantstrTags += `<li class="alert alert-danger m-2 p-1">${arrstrTags[i]}</li>`
        }
    }

    let strgradint = ``;

    for (let i = 1; i <= 20; i++) {
        if (`${meal[`strIngredient${i}`]}` != "") {
            strgradint += ` <li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    box = ""

    box += `  <div class="col-md-4 mt-5">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}"alt="mealimage">
        <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8 my-5">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex flex-wrap">
       ${strgradint}
    </ul>
    <h3> Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${gradiantstrTags}
    </ul>
    <a class=" btn btn-success" href='${meal.strSource}' target =" _blank" >Source</a>
    <a class=" btn btn-danger" href='${meal.strYoutube}' target =" _blank" >Youtube</a>


 </div>`

    document.getElementById('meals').innerHTML = box;
}

async function getcategory() {
    var ress = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var finalresponse = await ress.json();
    console.log(finalresponse)
    displaycategory(finalresponse.categories);
}

function displaycategory(data) {
    closes();
    $('.screens').fadeIn(300).fadeOut(300);
    document.getElementById('inpu').innerHTML = "";
    box = ""
    for (let i = 0; i < data.length; i++) {
        box += `  <div class="col-md-3 mt-5" mb-4>
        <div onclick="detailcat('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
            <div class="layer position-absolute d-flex flex-column align-items-center text-center text-black p-2 overflow-hidden">
                <h3>${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription}</p>
            </div>
        </div>
</div>`

    }
    document.getElementById('meals').innerHTML = box;

}
async function detailcat(ing) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    var response = await res.json();
    console.log(response.meals);
    display_images(response.meals)
}
async function getarea() {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var finalres = await res.json();
    displayarea(finalres.meals);
}
function displayarea(data) {
    closes()
    $('.screens').fadeIn(300).fadeOut(300);

    box = ""
    for (let i = 0; i < data.length; i++) {
        box += `  <div class="col-md-3 mt-4">
                    <div onclick="getareameal('${data[i].strArea}')" class="rounded-2 text-center house ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                   </div>
                  </div>`
    }
    document.getElementById('meals').innerHTML = box;
    document.getElementById('inpu').innerHTML = "";

}
async function getareameal(a) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`)
    var finres = await res.json();
    display_images(finres.meals);
}
async function getgradiant() {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var finalres = await res.json();
    console.log(finalres);
    displaygradiant(finalres.meals)
}
function displaygradiant(data) {
    closes()
    $('.screens').fadeIn(300).fadeOut(300);
    let length = data.length - (data.length - 20);
    console.log(length);
    box = ""
    for (let i = 0; i < length; i++) {
        let x = `${data[i].strDescription}`;
        let y = x.slice(0, 200);
        box += `  <div class="col-md-3 mt-5 mb-4 point">
        <div onclick="detailcat('${data[i].strIngredient}')" class="rounded-2 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${data[i].strIngredient}</h3>
     <p>${y}.</p>
</div>
        </div>
</div>`
    }
    document.getElementById('meals').innerHTML = box;
    document.getElementById('inpu').innerHTML = "";

}
async function searchbyname(x) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    var finalres = await res.json();
    console.log(finalres);
    display_images(finalres.meals)

}
function search() {
    closes()

    $('.screens').fadeIn(300).fadeOut(300);
    document.getElementById('inpu').innerHTML = `<div class="col-lg-6 py-3 ps-5">
  <input  onkeyup="searchbyname(this.value)" maxlength="20" class="form-control bg-transparent text-white py-2" type="text" placeholder="Search By Name">
    </div>

    <div class="col-lg-6 py-3 ps-5">
    <input  onkeyup="searchbyletter(this.value)" maxlength="1" class="form-control bg-transparent text-white py-2" type="text" placeholder="Search By First Letter">
    </div>
   `
    document.getElementById('meals').innerHTML = "";
}
async function searchbyletter(y) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${y}`)
    var finalres = await res.json();
    console.log(finalres);
    display_images(finalres.meals)
}
function contact() {
    closes();
    box = `<div class="container w-75 text-center d-flex flex-column justify-content-center align-items-center vh-100">
    <div class="row g-4">
    <div class=" col-md-6 ">
    <input onkeyup="validatename()" class="form-control" placeholder="Enter Your Name" type="text" id="inputname">
    <div class=" ne alert alert-danger mt-2 fs-4">Special characters and numbers not allowed</div>
    </div>
    <div class=" col-md-6">
    <input onkeyup="validateemail()" class="form-control" placeholder="Enter Your Email" type="email" id="inputemail">
    <div class=" em alert alert-danger mt-2 fs-4">Email not valid *exemple@yyy.zzz</div>
    </div>
    <div class=" col-md-6">
    <input onkeyup="validatphone()" class="form-control" placeholder="Enter Your Phone" type="text" id="inputphone">
    <div class=" ph alert alert-danger mt-2 fs-4">Enter valid Phone Number</div>
    </div>
    <div class=" col-md-6">
    <input onkeyup="validateage()" class="form-control" placeholder="Enter Your Age" type="number" id="inputage">
    <div class=" ag alert alert-danger mt-2 fs-4">Enter valid age</div>
    </div>
    <div class=" col-md-6">
    <input onkeyup="validatepass()" class="form-control" placeholder="Enter Your Password" type="password" id="inputpass">
    <div class=" pas alert alert-danger mt-2 fs-4">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
    </div>
    <div class=" col-md-6">
    <input onkeyup="checkrepass(this.value)" class="form-control" placeholder="Enter Your Repassword" type="password">
    <div class=" repas alert alert-danger mt-2 fs-4">Enter valid Repassword</div>
    </div>
    </div> 
    <button disabled class=" btn-outline-danger btn mt-4">Submit</button>
    </div>`
    document.getElementById('meals').innerHTML = box;
    document.getElementById('inpu').innerHTML = '';

}
function validatename() {
    if (checkname() == false) {
        $('.ne').removeClass('d-none');
        $('.ne').addClass('d-block');
    }
    else {
        $('.ne').removeClass('d-block');
        $('.ne').addClass('d-none');
    }
}
function checkname() {
    var rexname = /^[a-zA-Z]+$/;
    return rexname.test(document.getElementById('inputname').value);
}
function validateemail() {
    if (checkemail() == false) {
        $('.em').removeClass('d-none');
        $('.em').addClass('d-block');
    }
    else {
        $('.em').removeClass('d-block');
        $('.em').addClass('d-none');
    }

}
function checkemail() {
    var rexemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return rexemail.test(document.getElementById('inputemail').value);
}
function checkphone() {
    var rexphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return rexphone.test(document.getElementById('inputphone').value);
}
function validatphone() {
    if (checkphone() == false) {
        $('.ph').removeClass('d-none');
        $('.ph').addClass('d-block');
    }
    else {
        $('.ph').removeClass('d-block');
        $('.ph').addClass('d-none');
    }

}
function checkage() {
    var rexage = /^([1-9][0-9]{0,1}|100)$/;
    return rexage.test(document.getElementById('inputage').value);
}
function validateage() {
    if (checkage() == false) {
        $('.ag').removeClass('d-none');
        $('.ag').addClass('d-block');
    }
    else {
        $('.ag').removeClass('d-block');
        $('.ag').addClass('d-none');
    }

}
function checkpass() {
    var rexpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    return rexpass.test(document.getElementById('inputpass').value);
}
function validatepass() {
    if (checkpass() == false) {
        $('.pas').removeClass('d-none');
        $('.pas').addClass('d-block');
    }
    else {
        $('.pas').removeClass('d-block');
        $('.pas').addClass('d-none');
    }

}
function checkrepass(repass) {
    if (document.getElementById('inputpass').value != repass) {
        $('.repas').removeClass('d-none');
        $('.repas').addClass('d-block');
    }
    else {
        $('.repas').removeClass('d-block');
        $('.repas').addClass('d-none');
    }
}