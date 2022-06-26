import mongoose from 'mongoose';

const POHEBOOK_ENTRY_SCHEMA = mongoose.Schema({
    name: String,
    number: String
})

const PHONEBOOK_ENTRY = mongoose.model('phonebookEntry', POHEBOOK_ENTRY_SCHEMA);
const MONGO_URI = `mongodb+srv://PhilippParzer:<password>@cluster0.lukqk.mongodb.net/fullstackopen?retryWrites=true&w=majority`

const getPhoneBookEntries = () => {
    return mongoose
    .connect(MONGO_URI)
    .then(() => {
        return PHONEBOOK_ENTRY.find({})
    })
    .then((res) => {
        return res;
    })
    .catch(err => console.log(err))
}


const createNewEntry = (entryName, entryNumber) => {
    const phonebookEntry = new PHONEBOOK_ENTRY({
        name: entryName,
        number: entryNumber
    })
    
    return mongoose
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
    
                phonebookEntry.save().then((res) => {
                    console.log(`added ${phonebookEntry.name} number ${phonebookEntry.number} to phonebook`);
                    return getPhoneBookEntries()
                })
            })
        })
    .catch(err => console.log(err))
    
}

export default {
    getPhoneBookEntries,
    createNewEntry
}