import React, { ChangeEvent, useContext, useState } from 'react';
import styles from './viewIssue.module.css';
import ButtonBtn from '@/components/Inputs/Button/Button';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import UserContext from '@/context/UserContext';
import TextAreaInput from '@/components/Inputs/TextArea/TextArea';
import SelectDropDownInput from '@/components/Inputs/DropDown/SelectDropDown';
import useHttp from '@/hooks/useHttp';
import { issuesApi } from '@/api/Issues/issues.api';

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
  id:string;
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

  console.log(issueData.status)

  const [ formState, setFormState ] = useState<formStateType>({
    id: issueData.id,
    title: issueData.title,
    description: issueData.description,
    status: issueData.status.toLowerCase().replace(/ /,'_'),
    priority: issueData.priority,
    userId: issueData.userId,
    teamId:issueData.teamId,
  });

  const [ isFormDirty, setIsFormDirty ] = useState(false);

  const { isLoading, sendRequest, error } = useHttp();

  const { putUpdateIssue } = issuesApi;

  const userProfileContext = useContext(UserContext);

  const userProfile = userProfileContext?.userInfo[0];

  const token = userProfileContext?.token || '';

  const { id, name } = userProfile || {};

  const isDisabled = id == issueData.userId ? false : true;

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

  const onSubmitFormHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();

    const id = formState.id;

    const responseCallback = ( res: { data: string }) => {

      if(res.data == 'success'){
          alert('success')
      }
    }

    const response = await putUpdateIssue(token, id, formState, sendRequest, responseCallback )
  }

  const onCloseFormHandler = () => toggleViewIssueForm(false);
  
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
      <SelectDropDownInput 
        dropDownArray={status}
        inputNameAttribute={formStateKeys[3]}
        inputValueAttribute={formState.status}
        labelTitle='Status'
        onChangeHandler={onChangeFormHandler}
        isDisabled={isDisabled}
      />
      <SelectDropDownInput 
        dropDownArray={priorities}
        inputNameAttribute={formStateKeys[4]}
        inputValueAttribute={formState.priority}
        labelTitle='Priority'
        onChangeHandler={onChangeFormHandler}
        isDisabled={isDisabled}
      />
      <ButtonBtn 
        type='button'
        loadingState={isLoading}
        onClickHandler={onSubmitFormHandler}
        buttonText='Update'
        buttonStyleColor='green'
        isDisabled={isDisabled}
      />
    </form>
  )
}

export default ViewIssue;

