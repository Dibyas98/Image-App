let foemEle = document.querySelector("form"),
    inputEle = document.querySelector("input"),
    btnEle = document.querySelector("button"),
    all_photo = document.querySelector(".all-photo"),
    show_More = document.querySelector(".show_more"),
    cont = document.querySelector('.cont');

// console.log(foemEle,inputEle,btnEle);

let accessKey = "Qj269qI1zMp5sGrb6Fhxo4P67eUIuY7xvYQV3mibvZc",
    page = 1;

foemEle.addEventListener("submit", function (event) {
    event.preventDefault();
    all_photo.innerHTML='';
    show_More.style.display='none';
    // console.log(inputEle.value);
    let circle = document.createElement('div')
    cont.appendChild(circle)

    circle.classList.add("loader");
    setTimeout(() => {
        imges();
        circle.remove()
    }, 3000);

});

async function imges() {
    let search = inputEle.value;
    
    try {
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);


        if (page === 1) {
            all_photo.innerHTML = "";
        }

        const res = data.results;
        console.log(res);

        res.map((result) => {
            const single = document.createElement("div");
            single.classList.add("single");
            single.innerHTML = `
              <img src='${result.urls.small}' alt="">
          <a href="${result.links.html} target="_blank">${result.alt_description}</a>
          `;
            all_photo.appendChild(single);



        });
        page++;
        if (page > 1) {
            show_More.style.display = 'block'
        }
    }
    catch (error) {
        all_photo.innerText=''
        let err=document.createElement('div')
        all_photo.append(err)
        err.classList.add('error-message')
    }




}

show_More.addEventListener('click', function () {
    // console.log(page);
    let circle = document.createElement('div')

    circle.classList.add("loader");
    cont.appendChild(circle)
    setTimeout(() => {
        imges();
        circle.remove();
    }, 3000);

})
