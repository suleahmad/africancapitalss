import React from "react";
import styles from "./CapitalCard.module.css";
import { CountryData } from "../data";

interface CapitalCardProps {
  country: CountryData;
  onClick: () => void;
}

export default function CapitalCard({ country, onClick }: CapitalCardProps) {
  return (
    <div className={`glass ${styles.card}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={styles.imageContainer}>
        {/* Fetching only skyscraper/architecture images */}
        <img 
          src={`https://loremflickr.com/600/400/skyscraper,architecture/all?lock=${country.id}`} 
          alt={`Modern picture of ${country.capital}`} 
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.flagOverlay}>{country.flag}</div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.countryName}>{country.name}</h2>
        <div className={styles.capitalSection}>
          <span className={styles.label}>Capital:</span>
          <span className={`${styles.capital} text-gradient`}>{country.capital}</span>
        </div>
        <div className={styles.languageSection}>
          <span className={styles.label}>Language:</span>
          <span className={`${styles.language} text-gradient`}>{country.language}</span>
        </div>
        <p className={styles.description}>{country.description}</p>
      </div>
    </div>
  );
}
