import styles from './notifications.module.css';


interface NotificationsPropTypes {
    notifications: any[]
}

const Notifications = ({ notifications }: NotificationsPropTypes) => {

    const renderNotifications = ( ) => (
        
        notifications.map((itm) => {
            return (
                <div key={itm.id} className={styles.notificationItem}>
                    {itm.message}
                </div>
            )
        })
    )

    return (
        <div className={styles.notificationBox}>
            {
                notifications.length > 0 ? renderNotifications() : 'No new notifications'
            }
        </div>
    )
};

export default Notifications;