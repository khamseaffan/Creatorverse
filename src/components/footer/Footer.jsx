import React from 'react';
import styles from './Footer.module.css'; // Import the CSS module

export default function Footer() {
    return(
        <div className={styles.footer}>
            <p className={styles.text}>
                Made by 
                <a href='https://github.com/khamseaffan' className={styles.link}>
                    Affan Khamse
                </a> 
                 NYU
            </p>
        </div>
    )
}
