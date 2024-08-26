import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Import the CSS module

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Creatorverse
        </Link>
        <nav className={styles.nav}>
          <Link to="/show-creators" className={styles.navLink}>Show Creators</Link>
          <Link to="/add-creator" className={styles.navLink}>Add Creator</Link>
        </nav>
      </div>
    </header>
  );
}
