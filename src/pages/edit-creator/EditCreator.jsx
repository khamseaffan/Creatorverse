import React, { useState, Fragment, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../../client.js';
import { Dialog, Transition } from '@headlessui/react';
import styles from './EditCreator.module.css'; // Import the CSS module

export default function EditCreator({ creators, setCreators }) {
  const navigate = useNavigate();
  const { id } = useParams();
  let creator = creators.filter(creator => creator.id == id);

  if (creator.length > 0) {
    creator = creator[0];
    const [formData, setFormData] = useState(creator);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const cancelButtonRef = useRef(null);

    const handleFormSubmit = async (element) => {
      element.preventDefault();

      const { data, error } = await supabase.from('creators').update({
        name: formData.name,
        description: formData.description,
        url: formData.url,
        imageURL: formData.imageURL
      }).eq('id', id).select();

      if (error) {
        alert('Error updating data');
        setError('Error updating data');
      } else {
        setError(null);
        setCreators((prevCreators) => {
          const updatedCreators = prevCreators.filter((prevCreator) => prevCreator.id !== formData.id);
          updatedCreators.push(formData);
          return updatedCreators;
        });

        navigate('/show-creators');
      }
    };

    const handleInputChange = (element) => {
      const { name, value } = element.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDeleteAttempt = () => {
      setModal(true);
    };

    const handleDelete = async () => {
      setModal(false);

      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error deleting data');
        setError('Error deleting data');
      } else {
        setError(null);
        setCreators((prevCreators) => {
          const updatedCreators = prevCreators.filter((prevCreator) => prevCreator.id !== formData.id);
          return updatedCreators;
        });

        navigate('/show-creators');
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className='flex justify-center'>
            <h1 id="edit" className={styles.title}>Edit</h1>
          </div>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className={styles.inputGroup}>
                  <div className="sm:col-span-full">
                    <label htmlFor="name" className={styles.inputLabel}>Name</label>
                    <div className="mt-2">
                      <input type="text" name="name" id="name" autoComplete="off" value={formData.name} onChange={handleInputChange} className={styles.inputField} placeholder="e.g.: Ed Sheeran" />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="description" className={styles.inputLabel}>Description</label>
                    <div className="mt-2">
                      <textarea id="description" name="description" rows="3" onChange={handleInputChange} value={formData.description} className={styles.textareaField}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="url" className={styles.inputLabel}>Main Social Media URL</label>
              <div className="mt-2">
                <input type="text" name="url" id="url" autoComplete="off" onChange={handleInputChange} value={formData.url} className={styles.inputField} placeholder="e.g.: Youtube Channel, Instagram Page, etc." />
              </div>
            </div>
            <br />
            <div className="sm:col-span-full">
              <label htmlFor="imageURL" className={styles.inputLabel}>Creator's Image URL</label>
              <div className="mt-2">
                <input type="text" name="imageURL" id="imageURL" autoComplete="off" onChange={handleInputChange} value={formData.imageURL} className={styles.inputField} placeholder="e.g.: Google Images Image Address" />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.primaryButton}>Submit Update</button>
              <button type="button" className={styles.secondaryButton} onClick={handleDelete}>Delete</button>
            </div>
          </form>
        </div>

        <Transition.Root show={modal} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
            <Transition.Child as={Fragment} 
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={`fixed inset-0 ${styles.modalOverlay}`} />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className={`relative transform overflow-hidden ${styles.modalPanel}`}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <img src='https://static.vecteezy.com/system/resources/previews/017/172/379/original/warning-message-concept-represented-by-exclamation-mark-icon-exclamation-symbol-in-triangle-png.png' className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className={styles.modalTitle}>
                            Delete Creator from Creatorverse?
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className={styles.modalText}>
                              Are you sure you want to delete this creator's record from your Creatorverse? This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => setModal(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    );
  } else {
    navigate('/add-creator');
  }
}
