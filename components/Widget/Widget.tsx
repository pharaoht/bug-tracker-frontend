import React from 'react'
import styles from './widget.module.css';

interface WidgetProps {
    value: string;
    title: string;
    color:string;
    icon: React.ReactNode;
}

const Widget = ({ title, value, color, icon}: WidgetProps ) => {

    const cssName = color;

    return (
        <li className={styles.container}>
            <i className={`${styles.bx} ${styles[cssName]}`} >
                {icon}
            </i>
            <span className={styles.text}>
                <h3>{value}</h3>
                <p>{title}</p>
            </span>
        </li>
    )
}

export default Widget;