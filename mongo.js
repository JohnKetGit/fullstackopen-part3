const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://JohnKet:${password}@phonebook.pxfozqr.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

let person = new Person({name: "", number: ""})

if (process.argv.length === 5) {
    person.name = process.argv[3]
    person.number = process.argv[4]

    person.save().then(result => {
        console.log(`Added ${person.name} ${person.number} to phonebook.`)
        mongoose.connection.close()
    })
} else {
    let getAll = "Phonebook:"

    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            getAll += `\n${person.name} ${person.number}`
        })
        console.log(getAll)
        mongoose.connection.close()
    })
}
