import React, { useState } from 'react';
import { supabase } from '../../client.js';
import { useNavigate } from 'react-router-dom';
import styles from './AddCreator.module.css'; // Import the CSS module

export default function AddCreator({ setCreators }) {
  const [insertError, setInsertError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: ''
  });
  const navigate = useNavigate();

  const handleFormSubmit = async (element) => {
    element.preventDefault();

    const { data, error } = await supabase.from('creators').insert([formData]).select();

    if (error) {
      alert('Error inserting data');
      setInsertError('Error inserting data');
    } else {
      setInsertError(null);
      setCreators((prevCreators) => [...prevCreators, formData]);
      navigate('/show-creators');
    }
  };

  const handleInputChange = (element) => {
    const { name, value } = element.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className='flex justify-center'>
          <h1 id='add' className={styles.title}>Add a Creator</h1>
        </div>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.spaceY12}>
            <div className={styles.sectionTitleContainer}>
              <h2 className={styles.sectionTitle}>Creator Info</h2>
              <p className={styles.sectionDescription}>Please provide the new creator's information.</p>

              <div className={styles.inputGroup}>
                <div className="sm:col-span-full">
                  <label htmlFor="name" className={styles.inputLabel}>Name</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      onChange={handleInputChange}
                      value={formData.name}
                      className={styles.inputField}
                      placeholder="e.g.: Ed Sheeran"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className={styles.inputLabel}>Description</label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className={styles.textareaField}
                      placeholder="Write or paste a few sentences about them."
                    />
                  </div>
                  <p className={styles.sectionDescription}>Write or paste a few sentences about them.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-full">
            <label htmlFor="url" className={styles.inputLabel}>Main Social Media URL</label>
            <div className="mt-2">
              <input
                type="text"
                name="url"
                id="url"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.url}
                className={styles.inputField}
                placeholder="e.g.: Youtube Channel, Instagram Page, etc."
              />
            </div>
          </div>

          <br />
          
          <div className="sm:col-span-full">
            <label htmlFor="imageURL" className={styles.inputLabel}>Creator's Image URL</label>
            <div className="mt-2">
              <input
                type="text"
                name="imageURL"
                id="imageURL"
                autoComplete="off"
                className={styles.inputField}
                value={formData.imageURL}
                onChange={handleInputChange}
                placeholder="e.g.: Google Images Image Address"
              />
            </div>
          </div>

          <div className={styles.submitButtonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Submit to Creatorverse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
