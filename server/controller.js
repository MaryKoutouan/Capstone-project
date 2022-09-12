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
        let { id, type } = req.body
        console.log(id, type)
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
    }
}



