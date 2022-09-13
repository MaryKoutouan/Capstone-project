const bootcamp = require('./db.json');
let globalID = 7;
let reviews = []
module.exports = {

    getAllBootcamp: (req, res) => {
        res.status(200).send(bootcamp)
    },
    postBootcamp: (req, res) => {
        let {title, rating, link, description} = (req.body)
        let newBoot = {
            title,
            rating,
            link,
            description,
            id: globalID,
            reviews: reviews
        }
        bootcamp.push(newBoot)
        res.status(200).send("New Bootcamp Successfully Added!")
        globalID++
        reviews = []
    },
    putBootcamp: (req, res) => {
        let { id, type } = req.body
        let index = bootcamp.findIndex(elem => +elem.id === +id)

        if (bootcamp[index].rating === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (bootcamp[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            bootcamp[index].rating++
            res.status(200).send(bootcamp)
        } else if (type === 'minus') {
            bootcamp[index].rating--
            res.status(200).send(bootcamp)
        } else {
            res.sendStatus(400)
        }
    },
    deleteBootcamp: (req, res) => {
        const id = Number(req.params.id);
        const index = bootcamp.findIndex(elem => elem.id === id);
        bootcamp.splice(index, 1);
        res.status(200).send(bootcamp);
    },
    getReview: (req,res) => {
        let review = [];
        for (let i = 0; i < bootcamp.length; i++) {
            review.push({"id":bootcamp[i].id, "title":bootcamp[i].title, "reviews":bootcamp[i].reviews})
        }
        res.status(200).send(review)
    },
    putReview: (req, res) => {
        let { id, aboutUser, revBox } = req.body
        let index = bootcamp.findIndex(elem => +elem.id === +id)

        if(bootcamp[index].reviews) {
            bootcamp[index].reviews.push({
                "user": aboutUser,
                "message": revBox
            })
        }
        res.status(200).send(bootcamp)

    }
}



