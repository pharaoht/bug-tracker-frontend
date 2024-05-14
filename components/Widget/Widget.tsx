import React from 'react'
import styles from './widget.module.css';
import CircularProgress from '@mui/material/CircularProgress';

interface WidgetProps {
    value: string;
    title: string;
    color:string;
    icon: React.ReactNode;
    loadingState?: boolean;
}

const Widget = ({ title, value, color, icon, loadingState }: WidgetProps ) => {

    const cssName = color;

    return (
        <li className={styles.container}>
            <i className={`${styles.bx} ${styles[cssName]}`} >
                {icon}
            </i>
            <span className={styles.text}>
                {
                    loadingState ?
                    (
                        <p><CircularProgress/></p>
                    )
                    :
                    (
                        <h3>{value}</h3>
                    )
                }
                <p>{title}</p>
            </span>
        </li>
    )
}

export default Widget;