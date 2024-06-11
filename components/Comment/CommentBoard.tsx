import Image from 'next/image';
import ButtonBtn from '../Inputs/Button/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextInput from '../Inputs/TextInput/TextInput';
import styles from './commentBoard.module.css';
import { EditLocationRounded } from '@mui/icons-material';

interface CommentData {
    id: number,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    imageUrl: string,
    teamName: string,
    text: string, 
}

interface CommentBoardProps {
    commentData: CommentData[];
    isLoading:boolean;
}

const CommentBoard = ( { commentData, isLoading }: CommentBoardProps) => {

    const renderComments = () => (

        <div className={styles.texts}>
            {
                commentData.map((itm, idx) => (
                    <div key={itm.id} className={styles.commentContainer}>

                        <div className={styles.commentHeader}>
                            <div className={styles.profileImage}>
                                <Image width={25} height={25} src={itm.imageUrl} alt={`${itm.createdBy}'s profile`} />
                            </div>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>{itm.createdBy}</span>
                                <b><span className={styles.commentDate}>{itm.createdAt}</span></b>
                            </div>
                        </div>
                        <div className={styles.commentText}>
                            {itm.text}
                        </div>
                    </div>
                ))
            }
        </div>
    )

    return (
        <div className={styles.container}>
            <label 
                className={styles.labelText}
            >
                Comments 
            </label>
            <div className={styles.commentBoard}>
                { isLoading &&   
                    <div className={styles.spanCenter}>
                       <CircularProgress/>
                    </div> 
                }

                { !isLoading && ( commentData.length > 0 ? renderComments() 
                    : <div className={styles.spanCenter}>No comments</div> 
                
                    ) 
                }
        
                <div className={styles.inputSection}>
                    <div style={{width:'100%'}}>
                        <TextInput
                            inputNameAttribute='message'
                            inputValueAttribute=''
                            placeholder='Start typing'
                            onChangeHandler={()=>{}}
                            isRequired={false}
                            labelTitle=''
                            margin={true}
                        />
                    </div>
                    <ButtonBtn
                        type='button'
                        isDisabled={true}
                        onClickHandler={()=>{}}
                        buttonText='Add'
                        buttonStyleColor='blue'
                    />
                </div>
            </div>
        </div>
    )
};


export default CommentBoard;