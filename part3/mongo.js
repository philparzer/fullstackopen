import mongoose from 'mongoose';

if (process.argv.length < 3) {
    console.error('Provide password to MongoDB as parameter');
    process.exit(1);
}

const POHEBOOK_ENTRY_SCHEMA = mongoose.Schema({
    name: String,
    number: String
})

const PHONEBOOK_ENTRY = mongoose.model('phonebookEntry', POHEBOOK_ENTRY_SCHEMA);
const MONGO_URI = `mongodb+srv://PhilippParzer:${process.argv[2]}@cluster0.lukqk.mongodb.net/fullstackopen?retryWrites=true&w=majority`

const getPhoneBookEntries = () => {
    mongoose
    .connect(MONGO_URI)
    .then(() => {
        return PHONEBOOK_ENTRY.find({})
    })
    .then((res) => {
        console.log("phonebook:");
        res.forEach(entry => console.log(`${entry.name} ${entry.number}`))
        mongoose.connection.close();
        process.exit()
    })
    .catch(err => console.log(err))
}


if (process.argv.length === 3) {
    getPhoneBookEntries();
}

else if (process.argv.length < 5) {
    console.error('Provide password to MongoDB, your name, your number as parameters');
    process.exit(1);
}

else {
    const phonebookEntry = new PHONEBOOK_ENTRY({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('connected');
        PHONEBOOK_ENTRY
            .findOne({$or: [
                {name: phonebookEntry.name},
                {number: phonebookEntry.number}
            ]})
            .exec((err, entry) => {
                if (entry) {
                    console.log("already exists")
                    mongoose.connection.close();
                    return;
                }
    
                phonebookEntry.save().then(() => {
                console.log(`added ${phonebookEntry.name} number ${phonebookEntry.number} to phonebook`);
                mongoose.connection.close();
                })
            })
        })
    .catch(err => console.log(err))
}

export default {
    getPhoneBookEntries
}