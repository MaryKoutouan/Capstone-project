const bootcamp = require('./db.json');
let globalID = 15;
module.exports = {

    getAllBootcamp: (req, res) => {
        res.status(200).send(bootcamp)
    },
    
    getBoot: (req,res) => {
        let randomIndex = Math.floor(Math.random() * bootcamp.length);
        let randomBoot = bootcamp[randomIndex];

        res.status(200).send(randomBoot)
    },

    postBootcamp: (req, res) => {
        let { newUserBoot, name } = (req.body)
        let newBoot = {
            newUserBoot,
            name,
            id: globalID
        }
        bootcamp.push(newBoot)
        res.status(200).send("New Women Bootcamp Successfully Added!")
        globalID++


    },
    putBootcamp: (req, res) => {
        let { userAddBoot, id } = (req.body)
        
        let index = bootcamp.findIndex(elem => +elem.id === +id)

        if (bootcamp[index].userAddBoot) {
            bootcamp[index].userAddBoot = userAddBoot
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

// let users = [user1, user2, user3]

// module.exports = {
//   createUser: (req, res) => {
//     userDatabase.push(req.body)
//     res.status(200).send('User successfully added.')
//   },
//   updateUser: (req, res) => {
//     let existingUsername  = req.params.username
//     let newUsername = req.body.username
//     for (let i = 0; i < users.length; i++) {
//       if (users[i].username === existingUsername) {
//         user[i].username = newUsername
//         res.status(200).send("User updated.")
//         return
//       }
//     }
//     res.status(400).send("User not found.")
//   }
// }