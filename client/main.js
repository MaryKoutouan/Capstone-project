const bootcampCont = document.querySelector("#bootcamp-list")


const form = document.querySelector('form');

const errCallback = err => console.log(err.response.data)

const getAllBootcamp = () => {
    bootcampCont.innerHTML = ''
    axios.get("http://localhost:5500/api/allBootcamp")
        .then(res => {
            console.log(res.data)
            res.data.forEach(elem => {
                let bootCard = `<div class="boot-card">
                    <h2>${elem.title}</h2>
                    <h4> <a href="${elem.link}" target="_blank">${elem.link}</a></h4>
                    
                    <h4><button onclick="putBootcamp({id: ${elem.id}, type:'minus'})">-</button> Rating: ${elem.rating}/5 
                    <button onclick="putBootcamp({id: ${elem.id}, type:'plus'})">+</button></h4> 
                    <p>Description: ${elem.description}</p>
                    <button onclick="deleteBootcamp(${elem.id})">Delete</button>
                
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
    if (title.value) {

    axios.post("http://localhost:5500/api/bootcamp/", body)
        .then(() => {
            description.value = ''
            title.value = ''
            link.value = ''
            document.querySelector('#rating-one').checked = true
            alert("Bootcamp successfully added!");
            getAllBootcamp()
        })
    }
};

const putBootcamp = (body) => {
    axios.put("http://localhost:5500/api/bootcamp/", body)
    .then(getAllBootcamp())
    .catch(err => console.log(err))
}

const deleteBootcamp = (id) => {

axios.delete(`http://localhost:5500/api/bootcamp/${id}`)
        .then(() => getAllBootcamp())
        .catch(err => console.log(err))
};



getAllBootcamp()

