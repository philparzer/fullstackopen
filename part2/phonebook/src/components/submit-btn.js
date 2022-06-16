/*
Description:
form submit btn
*/

const SubmitBtn = ({onClick}) => {
    return (
        <>
            <div>
                <button onClick={onClick} type="submit">add</button>
            </div>
        </>
    );
}

export default SubmitBtn;