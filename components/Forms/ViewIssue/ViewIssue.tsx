import React, { ChangeEvent, useContext, useState } from 'react';
import styles from './viewIssue.module.css';
import ButtonBtn from '@/components/Inputs/Button/Button';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import UserContext from '@/context/UserContext';

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
  title: string;
  description: string;
  status: string;
  priority: string;
  userId: string;
  teamId: string
}

const status = [
  { displayName: 'Open', value: 'OPEN'},
  { displayName: 'In Progress', value: 'IN_PROGRESS'},
  { displayName: 'Under Review', value: 'UNDER_REVIEW'},
  { displayName: 'Completed', value: 'COMPLETED'},
  { displayName: 'Closed', value:'CLOSED'},
]

const ViewIssue = ( { selectedIssueData, toggleViewIssueForm }: ViewIssuePropTypes ) => {

  const issueData = selectedIssueData;

  const [ formState, setFormState ] = useState<formStateType>({
    title: issueData.title,
    description: issueData.description,
    status: issueData.status,
    priority: issueData.priority,
    userId: issueData.userId,
    teamId:issueData.teamId,
  });

  const [ isFormDirty, setIsFormDirty ] = useState(false);

  const userProfileContext = useContext(UserContext);

  const userProfile = userProfileContext?.userInfo[0];

  const { id, name } = userProfile || {};

  const formStateKeys = Object.keys(formState);

  const onChangeFormHandler = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {

    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormState( prevState => ({
      ...prevState,
      [inputName]: inputValue
    }));

  
  }

  const validateFormHandler = () => {};

  const onSubmitFormHandler = () => {

  }

  const onCloseFormHandler = () => toggleViewIssueForm(false);
  
  return (
    <form className={styles.form}>
      <div className={styles.headTitle}>
          <div className={styles.left}>
              <h1>Viewing </h1>
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
        inputValueAttribute={formState.title}
        inputNameAttribute={formStateKeys[0]}
        labelTitle='Title'
        isRequired={true}
        placeholder='Whats the issue? *Required'
        isDisabled={true}
      />
    </form>
  )
}

export default ViewIssue;

