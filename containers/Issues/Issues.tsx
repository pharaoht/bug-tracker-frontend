import React from 'react'
import styles from './issues.module.css';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Widget from '@/components/Widget/Widget';
import TeamIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import UrgentIcon from '@mui/icons-material/Error';


const Issues = () => {

    const breadCrumbProps = {
      title: 'Issues',
      location: 'Home',
    }


    return (
        <section className={styles.container}>
            <Breadcrumb
              title={breadCrumbProps.title}
              location={breadCrumbProps.location}
            />
            <ul className={styles.boxInfo}>
                <Widget
                  value='1020'
                  title='Team Issues'
                  color='blue'
                  icon={<TeamIcon fontSize="large" />}
                />
                <Widget
                  value='3'
                  title='Issues Assigned'
                  color='yellow'
                  icon={<AssignmentIcon fontSize="large"/>}
                />
                <Widget
                  value='3'
                  title='Urgent Issues'
                  color='orange'
                  icon={<UrgentIcon fontSize="large"/>}
                />
                <Widget
                  value='3'
                  title='Issues In-Progress'
                  color='green'
                  icon={<ArrowForwardIcon fontSize="large"/>}
                />
            </ul>
        </section>
    )
}

export default Issues;