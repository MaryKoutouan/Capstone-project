const bootcampCont = document.querySelector("#bootcamp-list")

const form = document.querySelector('form');

const newBootcampBtn = document.getElementById("getNewBootcampButton");

const errCallback = err => console.log(err.response.data)

const getAllBootcamp = () => {
    bootcampCont.innerHTML = ``
    axios.get("http://localhost:5500/api/allBootcamp")
        .then(res => {
            console.log(res.data)
            res.data.forEach(elem => {
                let bootCard = `<div class="boot-card">
                    <h2>${elem.title}</h2>
                    <h4> <a href="${elem.link}">${elem.link}</a></h4>
                    <h4>Rating: ${elem.rating}/5</h4>
                    <p>Description: ${elem.description}</p>
                    </div>
                `

                bootcampCont.innerHTML += bootCard
            })
            
        }).catch(errCallback)
};


// newBootcampBtn.addEventListener('click', getAllBootcamp)

form.addEventListener('submit', submitHandler)
function submitHandler(e) {
    e.preventDefault()

    let information = document.querySelector('#information')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let pageLink = document.querySelector('#pagelink')
    let userAddBoot = document.getElementById('addboot')

    let bodyObj = {
        information: information.value,
        rating: rating.value, 
        pageLink: pageLink.value,
        userAddBoot: userAddBoot.value
    }

    postBootcamp(bodyObj)

    information.value = ''
    rating.checked = false
    pageLink.value = ''
}



const postBootcamp = (body) => {
    axios.post("http://localhost:5500/api/bootcamp/", body)
        .then(res => {
            const data = res.data;
            alert(data);
        });
};


const putBootcamp = (body) => {
    axios.put("http://localhost:5500/api/bootcamp/", body)
    .then(res => {
        bootcampCont.innerHTML = ``
        for (let i = 0; i < res.data.length; i++) {
            bootCard(res.data[i])
        }
        
    }).catch(errCallback)
};


const deleteBootcamp = (body) => {
    axios.delete("http://localhost:5500/api/bootcamp/", body).then(res => {
        
        bootcampCont.innerHTML = ``
        for (let i = 0; i < res.data.length; i++) {
            bootCard(res.data[i])
        }
       
    }).catch(errCallback)
};

getAllBootcamp()

