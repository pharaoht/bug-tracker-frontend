import React, { useContext, useEffect } from 'react'
import styles from './issues.module.css';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Widget from '@/components/Widget/Widget';
import TeamIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UrgentIcon from '@mui/icons-material/Error';
import { issuesApi } from '@/api/Issues/issues.api';
import useHttp from '@/hooks/useHttp';
import IssueContext from '@/context/IssueContainerContext';
import UserContext from '@/context/UserContext';

const breadCrumbProps = { title: 'Issues', location: 'Home', }

const Issues = () => {

    const issueContext = useContext(IssueContext);
    
    const userContext = useContext(UserContext);

    const { isLoading, sendRequest, error } = useHttp();

    const { getRecentIssues, getIssuesByStatus, getIssuesByPriority, getIssuesByUser } = issuesApi;

    useEffect(() => {
      Promise.all([
        getRecentIssues('', issueContext?.setTeamIssues || (()=>{}), sendRequest),
        getIssuesByPriority('high', issueContext?.setHighPriorityIssues || (()=>{}), sendRequest),
        getIssuesByStatus('in_progress', issueContext?.setInProgressIssues || (()=>{}), sendRequest),
      ])
    }, []);
    return (
        <section className={styles.container}>
            <Breadcrumb
              openModule={()=> null}
              title={breadCrumbProps.title}
              location={breadCrumbProps.location}
            />
            <ul className={styles.boxInfo}>
                <Widget
                  loadingState={isLoading}
                  value={String(issueContext?.teamIssues.length) || '0'}
                  title='Team Issues'
                  color='blue'
                  icon={<TeamIcon fontSize="large" />}
                />
                <Widget
                  loadingState={isLoading}
                  value={String(issueContext?.issueAssign.length) || '0'}
                  title='Issues Assigned'
                  color='yellow'
                  icon={<AssignmentIcon fontSize="large"/>}
                />
                <Widget
                  loadingState={isLoading}
                  value={String(issueContext?.highPriorityIssues.length) || '0'}
                  title='High Priority'
                  color='orange'
                  icon={<UrgentIcon fontSize="large"/>}
                />
                <Widget
                  loadingState={isLoading}
                  value={String(issueContext?.inProgressIssues.length) || '0'}
                  title='In-Progress'
                  color='green'
                  icon={<ArrowForwardIcon fontSize="large"/>}
                />
            </ul>
        </section>
    )
}

export default Issues;