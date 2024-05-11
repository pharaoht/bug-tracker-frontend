import React, { useEffect, useContext } from 'react';
import styles from './dashboard.module.css';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Widget from '@/components/Widget/Widget';
import Table from '@/components/Table/Table';
import TicketIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import UrgentIcon from '@mui/icons-material/Error';
import MeetingIcon from '@mui/icons-material/Event';
import useHttp from '@/hooks/useHttp';
import { dashboardApi } from '@/api/Dashboard/dashboard.api';
import DashboardContext from '../../context/DashboardContext';

const breadCrumbProps = { title: 'Dashboard', location: 'Home', }

const Dashboard = () => {

    const dashbaordContext = useContext(DashboardContext);

    const { sendRequest } = useHttp();

    const { getTotalIssues } = dashboardApi;

    useEffect(() => {
      Promise.all([
        getTotalIssues(dashbaordContext?.setTotalIssuesData || (()=>{}), sendRequest),

      ])

    }, [])

    return (
        <section className={styles.container}>
            <Breadcrumb
              title={breadCrumbProps.title}
              location={breadCrumbProps.location}
            />

            <ul className={styles.boxInfo}>
                <Widget
                  value={String(dashbaordContext?.totalIssues.length) || '0'}
                  title='Total Issues'
                  color='blue'
                  icon={<TicketIcon fontSize="large" />}
                />
                <Widget
                  value='6'
                  title='Messages'
                  color='yellow'
                  icon={<MessageIcon fontSize="large"/>}
                />
                <Widget
                  value='3'
                  title='Urgent Issues'
                  color='orange'
                  icon={<UrgentIcon fontSize="large"/>}
                />
                <Widget
                  value='3'
                  title='Meetings'
                  color='green'
                  icon={<MeetingIcon fontSize="large"/>}
                />
            </ul>
            <Table data={dashbaordContext?.totalIssues || []}/>
        </section>
    )
}

export default Dashboard;