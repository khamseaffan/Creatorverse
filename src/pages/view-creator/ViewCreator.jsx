import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './ViewCreator.module.css'; // Import the CSS module

export default function ViewCreator({ creators }) {
  const { id } = useParams();
  const navigate = useNavigate();

  let creator = creators.filter(creator => creator.id == id);

  if (creator.length === 0) {
    navigate('/');
  } else {
    creator = creator[0];
    return (
      <div>
        <section className={styles.container}>
          <div className={styles.content}>
            <div className={styles.grid}>
              <div className={styles.textContainer}>
                <div
                  className="block rounded-lg bg-gray-300 px-6 py-12 shadow-lg backdrop-blur-[30px] md:px-12 lg:-mr-14">
                  <a href={creator.url}>
                    <h1 id="hero" className={styles.hero}>
                      {creator.name}
                    </h1>
                  </a>
                  <h2 className={styles.description}>{creator.description}</h2>
                  <Link
                    className={styles.editButton}
                    to={"/edit-creator/" + creator.id + "#edit"}
                    role="button"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0">
                <a key={creator.id} href={creator.url}>
                  <img src={creator.imageURL} className={styles.image} alt={creator.name} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
