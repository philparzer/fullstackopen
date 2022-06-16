/*
Description:
error / success message component
*/

const successStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 10,
    fontSize: 40,
    backgroundColor: 'green'
}

const errorStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 10,
    backgroundColor: 'red',
    fontSize: 40

}

const Notification = ({notificationMessage, isSuccessNotification}) => {

    return (
        <> 
            {notificationMessage === ''
                ? null
                : <div style={isSuccessNotification ? successStyle : errorStyle}>{notificationMessage}</div>
            }
        </>
    );
}

export default Notification;