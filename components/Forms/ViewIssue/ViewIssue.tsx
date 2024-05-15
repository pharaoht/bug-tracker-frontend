import React from 'react';
import styles from './viewIssue.module.css';

interface ViewIssuePropTypes {
  selectedIssueData: {};
  setIsOpen: (isOpen: boolean) => void;
}

const ViewIssue = ( { selectedIssueData, setIsOpen }: ViewIssuePropTypes ) => {

  console.log(selectedIssueData)
  return (
    <form>
        view issue
    </form>
  )
}

export default ViewIssue;