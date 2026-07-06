import React, { useState } from 'react';
import styles from './SignUpModal.module.css';

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('https://africancapitalss.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || 'Kuingia kumeshindwa (Login failed)');
      } else {
        setIsError(false);
        setMessage(data.message || 'Umefanikiwa kuingia kikamilifu!');
        if (onSuccess) onSuccess();
        
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
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Welcome back to African Capitals.</p>
        
        {message && (
          <div className={isError ? styles.errorMessage : styles.successMessage}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
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
            {isLoading ? 'Inaingia... (Logging In...)' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
