import React from 'react';
import styles from './CountryModal.module.css';
import { CountryData } from '../data';

interface CountryModalProps {
  country: CountryData;
  onClose: () => void;
}

export default function CountryModal({ country, onClose }: CountryModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.header}>
          <span className={styles.flag}>{country.flag}</span>
          <h2 className={styles.title}>{country.name}</h2>
        </div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Mji Mkuu (Capital):</span>
            <span className={styles.value}>{country.capital}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Uhuru (Independence):</span>
            <span className={styles.value}>{country.independenceYear || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Rais wa Kwanza:</span>
            <span className={styles.value}>{country.firstPresident || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Lugha (Language):</span>
            <span className={styles.value}>{country.language}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Pesa (Currency):</span>
            <span className={styles.value}>{country.currency || 'N/A'}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Maelezo Mafupi</h3>
          <p className={styles.text}>{country.description}</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Historia kwa Ufupi</h3>
          <p className={styles.text}>{country.history || 'Historia inakuja hivi karibuni...'}</p>
        </div>
      </div>
    </div>
  );
}
