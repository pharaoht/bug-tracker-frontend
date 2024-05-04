import React from 'react';
import styles from './moduleWrapper.module.css';

interface ModuleWrapperProps {
    children: React.ReactNode
}

const ModuleWrapper = ({ children }:ModuleWrapperProps) => (
    <div className={styles.container}>{children}</div>
)

export default ModuleWrapper