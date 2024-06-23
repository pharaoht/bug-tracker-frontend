import { CircularProgress } from '@mui/material';
import ButtonBtn from '../Inputs/Button/Button';
import styles from './notifications.module.css';


interface NotificationsPropTypes {
    notifications: any[];
    isError: string;
    isLoading: boolean;
    updateHandler: (...args: any) => void;
    deleteHandler: (...args: any) => void;
}

const Notifications = ({ notifications, isError, isLoading, updateHandler, deleteHandler }: NotificationsPropTypes) => {

    const renderNotifications = ( ) => {
        
        return notifications?.map((itm) => {
            return (
                <div key={itm.id} className={styles.notificationItem}>
                    <span className={styles.close}>
                        
                        <ButtonBtn 
                            type='button'
                            isDisabled={itm.isRead == false ? false : true}
                            onClickHandler={()=>updateHandler(itm.id)}
                            buttonText={itm.isRead == false ? 'mark read' : 'read'}
                            buttonStyleColor='orange'
                            size='small'
                        />
                        
                        <ButtonBtn 
                            type='button'
                            isDisabled={false}
                            onClickHandler={()=>deleteHandler(itm.id)}
                            buttonText='X'
                            buttonStyleColor='red'
                            size='small'
                        />
                    </span>
                    <span className={`${styles.time} ${itm.isRead == true ? styles.isRead : styles.isOpen }`}>{itm.createdAt}</span>
                    <p className={ itm.isRead == true ? styles.isRead : styles.isOpen }>
                        {itm.message}
                    </p>
                </div>
            )
        })
    }
  
    return (
        <div className={styles.notificationBox}>
            <h4>Notifications</h4>
            <div className={styles.notificationChild}>
                { isError && isError }
                { isLoading && <CircularProgress size='35px'/> }
            </div>
            { notifications.length > 0 && !isError && !isLoading && renderNotifications() }
            { notifications.length == 0 && !isError && !isLoading && 'No new notifications'}
        </div>
    )
};

export default Notifications;