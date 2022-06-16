/*
Description:
search phonebook results
*/

const Results = ({filterValue, filteredList, persons, deleteEntry}) => {
    return (
        <>
            { filterValue !== "" 
                ? filteredList.map((person) =>
                    <div key={person.id}>
                        {person.name} {person.number} {' '}
                        <button onClick={() => deleteEntry(person.id)}>delete</button>
                    </div>
                    )
                : persons.map((person) => <div key={person.id}> 
                        {person.name} {person.number} {' '}
                        <button onClick={() => deleteEntry(person.id)}>delete</button>
                    </div>
                    )
            }
        </>
    );
}

export default Results;