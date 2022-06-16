import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
    console.log("getting");
    const request = axios.get(url);
    return request.then(res => res.data)
}

const addNumber = (newNumber) => {
    console.log("adding");
    const request = axios.post(url, newNumber);
    return request.then(res => res.data);
}

const changeNumber = (id, entry, newNumber) => {
    console.log("changing")
    entry.number = newNumber;
    const request = axios.put(`${url}/${id}`, entry);
    return request.then(res => res.data);
}

const deleteEntry = (id) => {
    console.log("deleting");
    console.log(id)
    return axios.delete(`${url}/${id}`)
    .then(() => {
        console.log("deleted note")
    })
}

export default {
    getAll,
    addNumber,
    changeNumber,
    deleteEntry
}