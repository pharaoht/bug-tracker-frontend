import React, { useState } from 'react';
import styles from './table.module.css';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';

interface TablePropTypes {
    data: any[];
    loadingState:boolean;
    setSelectedIssueData: (...args: any) => void;
    toggleViewIssueForm: (...args: any) => void;
}

const thLabels = [
    { id:'a', label: 'Created by'},
    { id:'b', label: 'Title'},
    { id:'c', label: 'Date Added'},
    { id:'f', label: 'Status'},
    { id:'d', label: 'Priority'},

]

const Table = ({ data, loadingState, setSelectedIssueData, toggleViewIssueForm }: TablePropTypes) => {

    const tableData = data || [];

    const [ activeThColumn, setActiveThColumn ] = useState<number>(2);
    const [ flip, setFlip ] = useState<boolean>(false);

    const thOnClickHandler = ( columnindex: number ) => {

        if(columnindex == activeThColumn){
            return setFlip(!flip)
        }
        setActiveThColumn(columnindex)
        setFlip(false);


        //add api calls
    }

    const renderTableRow = () => tableData.map((itm, idx) => 

        {
            const cssStatusName = itm.status.includes(' ') ? itm.status.replace(/ /, '_') : itm.status

            return (
                <tr key={itm.id} 
                    onClick={
                        () => {
                            setSelectedIssueData(itm);
                            toggleViewIssueForm(true);
                        }
                    }>
                    <td>
                        <Image src={itm.imageUrl} alt={'user_image'} height={25} width={25}/>
                        <p>{itm.createdBy}</p>
                    </td>
                    <td>{itm.title}</td>
                    <td>{itm.createdAt}</td>
                    <td><span className={`${styles.highLight} ${styles[cssStatusName]}`}>{itm.status}</span></td>
                    <td><span className={`${styles.highLight} ${styles[itm.priority]}`}>{itm.priority}</span></td>
                </tr>
            )
        }
    )

    const renderTh = () => thLabels.map((itm, idx) =>
        {
            return (
                <th key={itm.id} 
                    className={styles.padTop}
                    onClick={() => thOnClickHandler(idx)}
                >
                    <button className={styles.noButton}>
                        {itm.label}
                        { activeThColumn === idx &&
                            <i className={styles.thIcon}>
                                {
                                    flip ?
                                    <ExpandLessIcon fontSize='small'/>
                                    :
                                    <ExpandMoreIcon fontSize='small'/>
                                }
                                
                            </i>
                        }
                    </button>
                </th>
            )
        }
    )
    
    return (
            <div className={styles.tableData}>
                <div className={styles.order}>
                    <div className={styles.head}>
                        <h3>Recent Tickets</h3>
                        <i className={styles.bx} >v</i>
                        <i className={styles.bx}>x</i>
                    </div>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                { renderTh() }
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.length > 0 ? 
                                renderTableRow() 
                            : 
                                ( loadingState ? <tr><td><CircularProgress/></td></tr> : <tr><td><span>No Issues</span></td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Table