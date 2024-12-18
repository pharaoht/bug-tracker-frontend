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
import { messagesApi } from '@/api/Messages/messages.api';

const breadCrumbProps = { title: 'Dashboard', location: 'Home', }

const selectedDataObj = { id: '', title: '', description: '', status: { value: '', display: ''}, priority: { value: '', display: ''}, createdAt: '', team: '', teamId: '', userId: '', imageUrl: '', createdBy: '' }

const Dashboard = () => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const [ viewIssueOpen, setViewIssueOpen ] = useState<boolean>(false);

    const [ messages, setMessages ] = useState<any[]>([])

    const [ selectedIssueData, setSelectedIssueData ] = useState<ViewIssuePropTypes>(selectedDataObj);

    const dashboardContext = useContext(DashboardContext);

    const lastQueryChanged = dashboardContext?.lastQueryChanged || '';

    const apiParamString = dashboardContext?.paramString || '';

    const contextSetIssues = dashboardContext?.setIssues || (()=>{});

    const contextSetPagination = dashboardContext?.setPaginationFunc || (()=>{});

    const conetextSetIssueTotalCount = dashboardContext?.setIssueCountTotalFun || (()=>{});

    const conetectSetUrgentIssues = dashboardContext?.setUrgentIssuesData || (()=>{})

    const userProfileContext = useContext(UserContext);

    const userProfile = userProfileContext?.userInfo && userProfileContext?.userInfo[0] || {};

    const token = userProfileContext?.token || '';

    const { isLoading, sendRequest, error } = useHttp();

    const { isLoading: sortLoading, sendRequest: sortRequest, error: sortError } = useHttp();

    const { isLoading: searchLoading, sendRequest: searchRequest, error: searchError } = useHttp();
    
    const { isLoading: messagesLoading, sendRequest: messageRequest, error: messageError } = useHttp();

    const { getIssuesByPriority, getRecentIssues, getSortIssues, getSearchIssues, getTotalNumOfIssues } = issuesApi;

    const { getUnReadMessages } = messagesApi;

    const createNewIssueHandler = () => {

        if(userProfileContext?.isLoggedIn === false) return alert('You must be logged in')

        setIsOpen(true)

    };

    const getMessages = async () => {

        if(userProfileContext?.isLoggedIn === false || !token) return;

        return await getUnReadMessages(userProfile.id, token, setMessages, messageRequest);
    }

    const sortFunction = async () => {

        return await getSortIssues(apiParamString, contextSetIssues, sortRequest);
    }

    const searchFunction = async () => {

        const callback = (data: any[]) => {
            
            if(data.length > 0) {
    
                contextSetIssues(data);
    
                const info = {
                    totalCount: data[0].totalCount,
                    currentPage: data[0].currentPage,
                    totalPages: data[0].totalPages,
                }
                contextSetPagination(info);
                return
            };

            contextSetIssues([])
        }
        return await getSearchIssues(apiParamString, callback, searchRequest);
        
    };

    const recentIssuesCb = (data: any[]) => {

        if(!data){
            return
        }

        const info = {
            totalCount: data[0]?.totalCount,
            currentPage: data[0]?.currentPage,
            totalPages: data[0]?.totalPages,
        }
        conetextSetIssueTotalCount(info);
        contextSetPagination(info);

    }

    useEffect(()=>{

        const controller = new AbortController();
    
        if(viewIssueOpen === false && isOpen === false){

            Promise.all([
                getTotalNumOfIssues(apiParamString, recentIssuesCb, sendRequest, controller.signal),
                getIssuesByPriority('high',conetectSetUrgentIssues , sendRequest),

            ])
        };

        return () => controller.abort()

    },[ isOpen, viewIssueOpen, ]);

    useEffect(() => {

        const controller = new AbortController();
    
        if(viewIssueOpen === false && isOpen === false){
            if(lastQueryChanged === 'searchTerm') searchFunction();
            else {

                Promise.all([
                    getSortIssues(apiParamString, contextSetIssues, sortRequest, controller.signal),
                    getTotalNumOfIssues(apiParamString, recentIssuesCb, sendRequest, controller.signal )
                ])
            }
        }

        return () => controller.abort()

    }, [ dashboardContext?.queryParams, isOpen, viewIssueOpen ]);


    useEffect(()=>{
        getMessages()
    }, [userProfileContext])


    return (
        <section className={styles.container}>

            <Breadcrumb
              openModule={createNewIssueHandler}
              title={breadCrumbProps.title}
              location={breadCrumbProps.location}
              pdfOnClick={() => {}}
              searchLoading={searchLoading}
              greenBtnTitle='Create Issue'
              searchPlaceHolder='Search issues'
            />

            <ul className={styles.boxInfo}>
                <Widget
                  loadingState={isLoading}
                  value={String(dashboardContext?.issueCountTotal ?? '0') }
                  title='Total Issues'
                  color='blue'
                  icon={<TicketIcon fontSize="large" />}
                />
                <Widget
                  loadingState={messagesLoading}
                  value={String(messages?.length ?? '0') }
                  title={messages.length == 1 ? 'Message' : 'Messages'}    
                  color='yellow'
                  icon={<MessageIcon fontSize="large"/>}
                />
                <Widget
                  loadingState={isLoading}
                  value={String(dashboardContext?.urgentIssues?.length ?? '0') }
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
              sortApiLoadingState={sortLoading}
              searchApiLoadingState={searchLoading}
              data={dashboardContext?.issues || []}
              sortError={sortError}
              searchError={searchError}
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