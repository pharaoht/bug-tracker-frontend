import Image from 'next/image';
import styles from '../commentBoard.module.css'
import ButtonBtn from '@/components/Inputs/Button/Button';
import EditIcon from '@mui/icons-material/Edit';

interface CommentProps {
    key: number;
    commentId: string;
    commentUserId: string;
    loginUserId?: string;
    profileImageUrl: string;
    createdBy: string;
    commentDate: string;
    commentText: string;
    isUserLogIn: boolean;
    onDeleteHandler: (...args: any) => void;
    loadingState: boolean;
}

const Comment = ({ key, commentId, commentUserId, loginUserId, profileImageUrl, createdBy, isUserLogIn, commentDate, commentText,  onDeleteHandler, loadingState }: CommentProps ) => {

    const isOwner = isUserLogIn ? Number(commentUserId) === Number(loginUserId) : false

    return (
        <div 
            key={commentId} 
            className={styles.commentContainer}
        >
            { isOwner &&
                (
                    <div 
                        className={styles.deleteBtn}
                    >
                        <ButtonBtn
                            type='button'
                            isDisabled={false}
                            loadingState={loadingState}
                            onClickHandler={(event) => onDeleteHandler(event, commentId)}
                            buttonText='X'
                            buttonStyleColor='red'
                            size='small'
                        />
                        <ButtonBtn 
                            type='button'
                            isDisabled={false}
                            loadingState={false}
                            onClickHandler={(event) => {}}
                            buttonText='Edit'
                            size='small'
                            buttonStyleColor='orange'
                        />
                    </div>
                )
            }
            <div className={styles.commentHeader}>

                <div className={styles.profileImage}>
                    <Image width={25} height={25} src={profileImageUrl} alt={`${createdBy}'s profile`} />
                </div>
    
                <div className={styles.userInfo}>

                    <span className={styles.userName}> {createdBy} </span>
                    <b>
                        <span className={styles.commentDate}> {commentDate} </span>
                    </b>

                </div>
            </div>
            <div className={styles.commentText}>

                {commentText}

            </div>
        </div>
    )
};

export default Comment;