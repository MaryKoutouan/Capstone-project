const bootcamp = require('./db.json');
let globalID = 8;
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
            id: globalID
        }
        bootcamp.push(newBoot)
        res.status(200).send("New Bootcamp Successfully Added!")
        globalID++


    },
    putBootcamp: (req, res) => {
        let { title, rating, link, description, id } = (req.body)
        
        let index = bootcamp.findIndex(elem => +elem.id === +id)

        if (bootcamp[index]) {
            bootcamp[index].link = link
            bootcamp[index].description = description
            bootcamp[index].title = title
            bootcamp[index].rating = rating
        }

        res.status(200).send(bootcamp)
    },
    deleteBootcamp: (req, res) => {
        const id = Number(req.params.id);
        const index = bootcamp.findIndex(elem => elem.id === id);
        bootcamp.splice(index, 1);
        res.status(200).send(bootcamp);
    }
}

