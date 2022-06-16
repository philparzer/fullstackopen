import { useState, useEffect } from 'react'
import './index.css'

import phoneNumberService from "./services/phone-numbers";

import InputField from './components/input-field';
import SubmitBtn from './components/submit-btn';
import Results from './components/results';
import Notification from './components/notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSuccessNotification, setIsSuccessNotification] = useState(true)

  const updateNewName = (event) => {
    setNewName(event.target.value);
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const filterPhoneBook = (event) => {
    setFilterValue(event.target.value);
    let newFilteredList = persons.filter(person => 
      person.name.toLowerCase().includes(filterValue.toLowerCase()) 
      || person.number.toLowerCase().includes(filterValue.toLowerCase())
    )
    setFilteredList(newFilteredList);
  }


  const addName = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      alert('name and phone number are required');
      return;
    }

    let numLookup = persons.filter(person => person.number === newNumber);
    if (numLookup.length !== 0) {
      alert(`The database already contains an entry for this number`);
      return;
    }

    let lookup = persons.filter(person => person.name === newName);
    if (lookup.length !== 0) {
      if (!window.confirm(`${lookup[0].name} has already been added to the database, do you want to overwrite the number?`)) {return}
      phoneNumberService.changeNumber(lookup[0].id, {...lookup[0]}, newNumber)
      .then(() => getAll());
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    phoneNumberService.addNumber(newPerson)
    .then(res => {
      setPersons(persons.concat(res));
      setNotificationMessage(`${newPerson.name} has been successfully added`);
      setIsSuccessNotification(true)
    });
  }

  const getAll = () => {
    phoneNumberService.getAll()
    .then(res => {
      setPersons(res);
    });
  }

  const deleteEntry = (id) => {
    if (window.confirm(`Do you really want to delete ${persons.find(person => person.id === id).name}'s entry?`)) {
      phoneNumberService.deleteEntry(id)
      .then(() => getAll())
      .catch(error => {
        console.log(error);
        setNotificationMessage('This entry has already been deleted. Updating...');
        setIsSuccessNotification(false);
        getAll();
      })
    }
  }

  useEffect(() => {
    getAll();
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} isSuccessNotification={isSuccessNotification}/>
      <InputField onChange={filterPhoneBook} value={filterValue} text={"filter phonebook"} />
      <h3>Add a new number</h3>
      <form>
        <InputField onChange={updateNewName} value={newName} text={"name"}/>
        <InputField onChange={updateNewNumber} value={newNumber} text={"number"}/>
        <SubmitBtn onClick={addName}/>
      </form>
      <h3>Numbers</h3>
      <Results filterValue={filterValue} filteredList={filteredList} persons={persons} deleteEntry={deleteEntry}></Results>
    </div>
  )
}

export default App