import React, { ChangeEvent, useState } from 'react';
import styles from './viewIssue.module.css';

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
              <button type='button' onClick={() => onCloseFormHandler()}>
                  X
              </button>
          </div>
      </div>
    </form>
  )
}

export default ViewIssue;

