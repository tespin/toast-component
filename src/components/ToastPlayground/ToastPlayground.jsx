import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  function handleCreateToast() {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ];
    setToasts(nextToasts);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter(toast => {
      return toast.id !== id;
    })

    setToasts(nextToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="../../../assets/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
      
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreateToast();
        }}>       
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`

              return (
                  <label
                  key={option}
                  htmlFor={id}>
                  
                    <input
                      id={id}
                      type='radio'
                      name='variant'
                      value={option}
                      checked={option === variant}
                      onChange={(event) => {
                        setVariant(event.target.value)
                      }}
                    />
                    {option}
                  </label>
            )
          })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
              <Button type='submit'>Pop Toast!</Button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
