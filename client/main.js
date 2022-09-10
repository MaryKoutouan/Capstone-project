const bootcampCont = document.querySelector("#bootcamp-list")

const form = document.querySelector('form');

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
                    <button onclick="deleteBootcamp(${elem['bootcamp_id']})">Delete</button>
                    <button onclick="putBootcamp: ">Edit</button>
                    </div>
                `

                bootcampCont.innerHTML += bootCard
            })
            
        }).catch(errCallback)
};

form.addEventListener('submit', submitHandler)

function submitHandler(e) {
    e.preventDefault()

    let description = document.querySelector('#info-input')
    let rating = document.querySelector('input[name="rating"]:checked').value
    let link = document.querySelector('#link-input')
    let title = document.querySelector('#title-input')
    let body = {
        description: description.value, 
        link: link.value,
        title: title.value,
        rating: +rating
    }

    axios.post("http://localhost:5500/api/bootcamp/", body)
        .then(() => {
            description.value = ''
            title.value = ''
            link.value = ''
            document.querySelector('#rating-one').checked = true
            getAllBootcamp()
        })
};

const putBootcamp = (body) => {
    bootcampCont.innerHTML = ``
    axios.put("http://localhost:5500/api/bootcamp/", body)
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            bootcampCont.innerHTML = res.data[i]
        }
        
    }).catch(errCallback)
};


const deleteBootcamp = (body) => {

    axios.delete("http://localhost:5500/api/bootcamp/", body)
        .then(() => getAllBootcamp())
        .catch(err => console.log(err))
    // (res => {
        
    //     // for (let i = 0; i < res.data.length; i++) {
    //     //     bootCard(res.data[i])
    //     // }
       
    // }).catch(errCallback)
};

getAllBootcamp()

