import React, { useState } from 'react';
import styles from './SignUpModal.module.css';

interface SignUpModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SignUpModal({ onClose, onSuccess }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('https://africancapitalss.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || 'Usajili umeshindwa (Registration failed)');
      } else {
        setIsError(false);
        setMessage(data.message || 'Usajili umekamilika kikamilifu!');
        if (onSuccess) {
          onSuccess();
        }
        // Funga dirisha baada ya sekunde 2
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setIsError(true);
      setMessage('Kuna tatizo la mtandao (Network error)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>Join us to discover more about Africa.</p>
        
        {message && (
          <div className={isError ? styles.errorMessage : styles.successMessage}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Inasajili... (Signing Up...)' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
