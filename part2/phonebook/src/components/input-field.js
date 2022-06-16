/*
Description:
controlled input component
*/

const InputField = ({onChange, value, text}) => {
    return (
        <>
            <div>
                {text}: <input onChange={onChange} value={value}/>
            </div>
        </>
    );
}

export default InputField;