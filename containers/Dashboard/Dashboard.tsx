import React, { useEffect, useContext, useState, useRef } from 'react';
import styles from './dashboard.module.css';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Widget from '@/components/Widget/Widget';
import Table from '@/components/Table/Table';
import TicketIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import UrgentIcon from '@mui/icons-material/Error';
import MeetingIcon from '@mui/icons-material/Event';
import useHttp from '@/hooks/useHttp';
import DashboardContext from '../../context/DashboardContext';
import { issuesApi } from '@/api/Issues/issues.api';
import ContainerModal from '@/components/Modal/Modal';
import UserContext from '@/context/UserContext';
import CreateIssue from '@/components/Forms/CreateIssue/CreateIssue';
import ViewIssue from '@/components/Forms/ViewIssue/ViewIssue';
import { ViewIssuePropTypes } from '@/types/Dashboard/dashboardType';

const breadCrumbProps = { title: 'Dashboard', location: 'Home', }

const selectedDataObj = { id: '', title: '', description: '', status: '', priority: '', createdAt: '', team: '', teamId: '', userId: '', imageUrl: '', createdBy: '' }

const Dashboard = () => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const [ viewIssueOpen, setViewIssueOpen ] = useState<boolean>(false);

    const [ selectedIssueData, setSelectedIssueData ] = useState<ViewIssuePropTypes>(selectedDataObj);

    const dashbaordContext = useContext(DashboardContext);


    const userProfileContext = useContext(UserContext);

    const { isLoading, sendRequest, error } = useHttp();

    const { getIssuesByPriority, getRecentIssues, getSortIssues } = issuesApi;

    const createNewIssueHandler = () => {

        if(userProfileContext?.isLoggedIn === false) return alert('You must be logged in')

        setIsOpen(true)

    };

    const sortFunction = async () => {

        return await getSortIssues(dashbaordContext?.paramString || '', dashbaordContext?.setIssues || (()=>{}), sendRequest)
    }

    useEffect(() => {

      if(viewIssueOpen === false && isOpen === false){

          Promise.all([
            getSortIssues(dashbaordContext?.paramString || '', dashbaordContext?.setIssues || (()=>{}), sendRequest),
            getRecentIssues(dashbaordContext?.setIssueCountTotalFun || (() => {}), sendRequest),
            getIssuesByPriority('high', dashbaordContext?.setUrgentIssuesData || (()=>{}), sendRequest),
    
        ])

      }

    }, [ isOpen, viewIssueOpen ]);

    useEffect(() => {

        sortFunction()
        getRecentIssues(dashbaordContext?.setIssueCountTotalFun || (() => {}), sendRequest)
    
    }, [dashbaordContext?.queryParams])
  
    return (
        <section className={styles.container}>

            <Breadcrumb
              openModule={createNewIssueHandler}
              title={breadCrumbProps.title}
              location={breadCrumbProps.location}
              pdfOnClick={() => {}}
            />

            <ul className={styles.boxInfo}>
                <Widget
                  loadingState={isLoading}
                  value={String(dashbaordContext?.issueCountTotal) || '0'}
                  title='Total Issues'
                  color='blue'
                  icon={<TicketIcon fontSize="large" />}
                />
                <Widget
                  loadingState={isLoading}
                  value='0'
                  title='Messages'
                  color='yellow'
                  icon={<MessageIcon fontSize="large"/>}
                />
                <Widget
                  loadingState={isLoading}
                  value={String(dashbaordContext?.urgentIssues.length) || '0'}
                  title='High Priority'
                  color='orange'
                  icon={<UrgentIcon fontSize="large"/>}
                />
                <Widget
                  loadingState={isLoading}
                  value='0'
                  title='Meetings'
                  color='green'
                  icon={<MeetingIcon fontSize="large"/>}
                />
            </ul>
            <Table 
              loadingState={isLoading}
              data={dashbaordContext?.issues || []}
              setSelectedIssueData={setSelectedIssueData}
              toggleViewIssueForm={setViewIssueOpen}
            />
            <ContainerModal isOpen={isOpen} onClose={()=>null}>
              <CreateIssue setIsOpen={setIsOpen}/>
            </ContainerModal>
            <ContainerModal isOpen={viewIssueOpen} onClose={()=>null}>
              <ViewIssue 
                selectedIssueData={selectedIssueData}
                toggleViewIssueForm={setViewIssueOpen}
              />
            </ContainerModal>
        </section>
    )
}

export default Dashboard;