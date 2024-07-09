import React from 'react';
import styles from './userProfile.module.css';
import Image from 'next/image';

const UserProfile = () => {
    return (
        <div className={styles.profileContainer}>
            <div>
                <div className={styles.profileHeader}>
                    <Image src={'/'} width={50} height={50}alt="User" className={styles.profileImg} />
                    <h2>Lucia Alvarez</h2>
                    <p>Team Alpha</p>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.infoSection}>
                        <p className={styles.infoLabel}>Age</p>
                        <div className={styles.infoValue}></div>
                    </div>
                    <div className={styles.infoSection}>
                        <p className={styles.infoLabel}>Education</p>
                        <div className={styles.infoValue}></div>
                    </div>
                    <div className={styles.infoSection}>
                        <p className={styles.infoLabel}>Location</p>
                        <div className={styles.infoValue}></div>
                    </div>
                </div>
            </div>
            <div className={styles.profileDetails}>
                <div className={styles.detailsCard}>
                    <h3>Bio</h3>
                    <p>...</p>
                </div>
                <div className={styles.detailsCard}>
                    <h3>Goals</h3>
                    <p>...</p>
                </div>
                <div className={styles.detailsCard}>
                    <h3>Motivations</h3>
                    <p>...</p>
                </div>
                <div className={styles.detailsCard}>
                    <h3>Concerns</h3>
                    <p>...</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
