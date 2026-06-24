import React from "react";
import styles from "./CapitalCard.module.css";
import { CountryData } from "../data";

interface CapitalCardProps {
  country: CountryData;
}

export default function CapitalCard({ country }: CapitalCardProps) {
  return (
    <div className={`glass ${styles.card}`}>
      <div className={styles.flag}>{country.flag}</div>
      <div className={styles.content}>
        <h2 className={styles.countryName}>{country.name}</h2>
        <div className={styles.capitalSection}>
          <span className={styles.label}>Mji Mkuu:</span>
          <span className={`${styles.capital} text-gradient`}>{country.capital}</span>
        </div>
        <div className={styles.languageSection}>
          <span className={styles.label}>Lugha:</span>
          <span className={`${styles.language} text-gradient`}>{country.language}</span>
        </div>
        <p className={styles.description}>{country.description}</p>
      </div>
    </div>
  );
}
