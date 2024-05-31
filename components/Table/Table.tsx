import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './table.module.css';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import { Pagination } from '@mui/material';
import Paginator from '../Paginator/Paginator';
import { issuesApi } from '@/api/Issues/issues.api';
import useHttp from '@/hooks/useHttp';
import DashboardContext from '@/context/DashboardContext';

interface TablePropTypes {
    data: any[];
    loadingState:boolean;
    setSelectedIssueData: (...args: any) => void;
    toggleViewIssueForm: (...args: any) => void;
}

const thLabels = [
    { id:'user_id', label: 'Created by' },
    { id:'title', label: 'Title'},
    { id:'createdAt', label: 'Date Added'},
    { id:'status', label: 'Status'},
    { id:'priority', label: 'Priority'},
];

let count = 0;

const Table = ({ data, loadingState, setSelectedIssueData, toggleViewIssueForm }: TablePropTypes) => {

    const tableData = data || [];

    const [ activeThColumn, setActiveThColumn ] = useState<number>(2);
    const [ isAsc, setIsAsc ] = useState<boolean>(false);

    const hasMounted = useRef(false); 

    const { getSortIssues } = issuesApi;

    const { isLoading, sendRequest, error } = useHttp()

    const dashbaordContext = useContext(DashboardContext);

    const thOnClickHandler = ( columnindex: number ): void => {
    
        hasMounted.current = true;
        if(columnindex == activeThColumn){
            setIsAsc(!isAsc)
            return undefined;
        }

        setActiveThColumn(columnindex);

        setIsAsc(true);

        return undefined
    
    }

    const sortFunction = async () => {

        const direction = isAsc ? 'ASC' : 'DESC';

        const paramsString = `columnType=${thLabels[activeThColumn].id}&sortDirection=${direction}&limit=10&offset=0`;

        return await getSortIssues(paramsString, dashbaordContext?.setIssues || (()=>{}), sendRequest)
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
                                    isAsc ?
                                    <ExpandMoreIcon fontSize='small'/>
                                    :
                                    <ExpandLessIcon fontSize='small'/>
                                }
                                
                            </i>
                        }
                    </button>
                </th>
            )
        }
    )

    useEffect(() => {

        if (hasMounted.current) {
            sortFunction();
        } 

    }, [ activeThColumn, isAsc ])
    
    return (
            <div className={styles.tableData}>
                <div className={styles.order}>
                    <div className={styles.head}>
                        <h3>Recent Tickets <span style={{fontSize:'10px'}}><em>(10 per page)</em></span></h3>
                        <Paginator />
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
                                ( loadingState || isLoading   ? <tr><td><CircularProgress/></td></tr> : <tr><td><span>No Issues</span></td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Table