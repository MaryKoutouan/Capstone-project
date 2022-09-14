const reviewBoot = document.querySelector("#bootcamp-name")
const reviewlist = document.querySelector("#reviews-list")
const form1 = document.querySelector('form');

const getReviewTitle = () => {
    reviewBoot.innerHTML = ''
    reviewlist.innerHTML = ''
    axios.get("http://localhost:5500/api/review")
        .then(res => {
            console.log(res.data)
            res.data.forEach(elem => {
                let bootCard = `
                <option value=${elem.id}>${elem.title}</option>
                `
                let reviewCard = `<div class="review-card">
                <h3>${elem.title}</h3>
                
                ${elem.reviews.map(function (review) { 
                    return (
                        `<div class="reviewbox">
                        <h5 style="color: blue">User: ${review.user} </h5>
                        <h4>Message: ${review.message}</h4>
                        </div>
                    `)
                })}
                </div>
            `
                reviewBoot.innerHTML += bootCard
                reviewlist.innerHTML += reviewCard
            })
            
        }).catch(err => console.log(err))
};

const putReview = () => {

    let aboutUser = document.querySelector('#about-box')
    let id = document.querySelector('#bootcamp-name')
    let revBox = document.querySelector('#review-box')
    let body = {
        aboutUser: aboutUser.value,
        id: id.value,
        revBox: revBox.value
    }

    axios.put("http://localhost:5500/api/review/", body)
        .then(() => {
            aboutUser.value = ''
            revBox.value = ''
            getReviewTitle()
        })
    
}

form1.addEventListener('submit', putReview)

getReviewTitle()
