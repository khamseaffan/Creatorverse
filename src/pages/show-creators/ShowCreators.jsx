import React from 'react';
import Card from '../../components/card/Card.jsx';
import styles from './ShowCreators.module.css'; // Import the CSS module

export default function ShowCreators(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div id="best" className={styles.titleContainer}>
          <h2 className={styles.title}>Top Creators</h2>
        </div>

        <div className={styles.grid}>
          {props.creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  );
}
