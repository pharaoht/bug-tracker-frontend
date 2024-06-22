import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './viewIssue.module.css';
import ButtonBtn from '@/components/Inputs/Button/Button';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import UserContext from '@/context/UserContext';
import TextAreaInput from '@/components/Inputs/TextArea/TextArea';
import SelectDropDownInput from '@/components/Inputs/DropDown/SelectDropDown';
import useHttp from '@/hooks/useHttp';
import { issuesApi } from '@/api/Issues/issues.api';
import DeleteIcon from '@mui/icons-material/Delete';
import { issueImagesApi } from '@/api/Images/images.api';
import Image from 'next/image';
import { commentApi } from '@/api/Comments/comments.api';
import CommentBoard from '@/components/Comment/CommentBoard';

interface ViewIssuePropTypes {
  selectedIssueData: {
    id: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    createdAt: string,
    team: string,
    teamId: string,
    userId: string,
    imageUrl: string,
    createdBy: string
  };
  toggleViewIssueForm: (isOpen: boolean) => void;
}

interface formStateType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  userId: string;
  teamId: string
}

const status = [
  { displayName: 'Open', value: 'open'},
  { displayName: 'In Progress', value: 'in_progress'},
  { displayName: 'Under Review', value: 'under_review'},
  { displayName: 'Completed', value: 'completed'},
  { displayName: 'Closed', value:'closed'},
]

const priorities = [
  { displayName: 'Low', value: 'low'},
  { displayName: 'Medium', value: 'medium'},
  { displayName: 'High', value: 'high'},
]


const ViewIssue = ( { selectedIssueData, toggleViewIssueForm }: ViewIssuePropTypes ) => {

    const issueData = selectedIssueData;

    const [ formState, setFormState ] = useState<formStateType>({
        id: issueData.id,
        title: issueData.title,
        description: issueData.description,
        status: issueData.status.toLowerCase().replace(/ /,'_'),
        priority: issueData.priority.toLowerCase(),
        userId: issueData.userId,
        teamId:issueData.teamId,
    });

    const [ isDirty, setIsDirty ] = useState<boolean>(false);

    const [ comments, setComments ] = useState<any[]>([]);

    const [ images, setImages ] = useState<any[]>([]);

    const { isLoading: updateIssueLoading, sendRequest: updateIssueRequest, error: updateIssueError } = useHttp();

    const { isLoading: deleteLoading, sendRequest: deleteRequest, error: deleteError } = useHttp();

    const { isLoading: imagesLoading, sendRequest: imagesRequest, error: imagesError } = useHttp();

    const { isLoading: commentLoading, sendRequest: commentRequest, error: commentError } = useHttp();

    const { putUpdateIssue, deleteArchiveIssue } = issuesApi;

    const { getImagesByIssueId } = issueImagesApi;

    const { getCommentsByIssueId } = commentApi;

    const userProfileContext = useContext(UserContext);

    const userProfile = userProfileContext?.userInfo && userProfileContext?.userInfo[0] || {}

    const token = userProfileContext?.token || '';

    const { id, name } = userProfile || {};

    const isLoggedIn = Object.keys(userProfile).length > 0 ? true : false

    const isDisabled = id == issueData.userId ? false : true;

    const formStateKeys = Object.keys(formState);

    const onChangeFormHandler = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setFormState( prevState => ({
        ...prevState,
        [inputName]: inputValue
        }));

        if(!isDirty){
            setIsDirty(true);
        }

    }

    const validateFormHandler = () => {};

    const onSubmitFormHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        const id = formState.id;

        const responseCallback = ( res: { data: string }) => {

            if(res.data == 'success'){

                alert('success');

                setIsDirty(false);
            }
        }

        await putUpdateIssue(token, id, formState, updateIssueRequest, responseCallback )
    }

    const onDeleteHandler = async ( event: React.MouseEvent<HTMLButtonElement> ) => {
        
        event.preventDefault();

        const isConfirmed = window.confirm('Are you sure you want to delete?');

        if (!isConfirmed) return;
        
        const id = formState.id;

        const responseCallback = ( res: { data: string }) => {

            if(res.data == 'success'){
                alert('Deleted Successfully')
            }

            onCloseFormHandler();
        }


        await deleteArchiveIssue(token, id, deleteRequest, responseCallback );

  }

    const onCloseFormHandler = () => {

        if(isDirty){

            const isConfirm = window.confirm('You have unsaved changes, are you sure you want to leave without saving?');

            if(!isConfirm) return;
        }

        toggleViewIssueForm(false);
    }


    const renderIssueImages = () => images.map((itm, idx) => (
        <div key={itm.url}>
            {
                imagesLoading ? 'Loading' : <Image key={itm.url} src={itm.url} height={150} width={200} alt='image_issue'/>
            }
        </div>
    ))

  useEffect(() => {

      if(formState.id){
          Promise.all([
            getImagesByIssueId(formState.id, setImages, imagesRequest),
            getCommentsByIssueId(formState.id, setComments, commentRequest)
          ])
      }

  }, [formState.id]);


  return (
    <form className={styles.form}>
        <div className={styles.headTitle}>
            <div className={styles.left}>
                <h1>{formState.title}</h1>
            </div>
            <div>
                <ButtonBtn 
                    type='button'
                    onClickHandler={onCloseFormHandler}
                    buttonText='X'
                    buttonStyleColor='orange'
                />
            </div>
        </div>
      <TextInput
            onChangeHandler={(event) => onChangeFormHandler(event)}
            inputNameAttribute={formStateKeys[1]}
            inputValueAttribute={formState.title}
            labelTitle='Title'
            isRequired={true}
            placeholder='Whats the issue? *Required'
            isDisabled={isDisabled}
      />
      <TextAreaInput
            onChangeHandler={onChangeFormHandler}
            inputNameAttribute={formStateKeys[2]}
            inputValueAttribute={formState.description}
            placeholder=''
            isDisabled={isDisabled}
            isRequired={true}
            labelTitle='Description'
      />
        <div className={styles.detailsContainer}>

            <div className={styles.detailsChld}>
                <SelectDropDownInput 
                    dropDownArray={status}
                    inputNameAttribute={formStateKeys[3]}
                    inputValueAttribute={formState.status}
                    labelTitle='Status'
                    onChangeHandler={onChangeFormHandler}
                    isDisabled={isDisabled}
                    margin={true}
                />
                <SelectDropDownInput 
                    dropDownArray={priorities}
                    inputNameAttribute={formStateKeys[4]}
                    inputValueAttribute={formState.priority}
                    labelTitle='Priority'
                    onChangeHandler={onChangeFormHandler}
                    isDisabled={isDisabled}
                    margin={true}
                />

            { images.length > 0 && renderIssueImages() }
            
            </div>
            <div className={styles.detailsChildTwo}>
                <CommentBoard
                    commentData={comments}
                    isLoading={commentLoading}
                    isLoggedIn={isLoggedIn}
                    userId={id}
                    issueId={formState.id}
                    token={token}
                    setComments={setComments}
                    commentRequest={commentRequest}
                />
            </div>
        </div>
      <div className={styles.btnContainer}>
        <ButtonBtn 
            type='button'
            loadingState={deleteLoading}
            onClickHandler={onDeleteHandler}
            buttonText='Delete'
            buttonStyleColor='red'
            buttonIcon={<DeleteIcon fontSize="small" />}
            isDisabled={isDisabled}
        />
        <ButtonBtn 
          type='button'
          loadingState={updateIssueLoading}
          onClickHandler={onSubmitFormHandler}
          buttonText='Update'
          buttonStyleColor='green'
          isDisabled={isDisabled || !isDirty && true}
        />
      </div>
    </form>
  )
}

export default ViewIssue;

