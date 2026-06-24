"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { africanCountries } from "../data";
import CapitalCard from "../components/CapitalCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = africanCountries.filter((country) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.capital.toLowerCase().includes(searchLower)
    );
  });

  return (  
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Miji Mikuu ya <span className="text-gradient">Afrika</span>
          </h1>
          <p className={styles.subtitle}>
            Gundua na ujifunze kuhusu nchi mbalimbali za Afrika na miji mikuu yake kwa urahisi zaidi.
          </p>
          
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Tafuta nchi au mji mkuu..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <p className={styles.resultsCount}>
                Tumepata matokeo {filteredCountries.length}
              </p>
            )}
          </div>
        </div>
      </header>

      <section className={styles.gridContainer}>
        {filteredCountries.length > 0 ? (
          <div className={styles.grid}>
            {filteredCountries.map((country) => (
              <CapitalCard key={country.id} country={country} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h2>Hakuna Matokeo</h2>
            <p>Hatukuweza kupata nchi au mji mkuu unaoendana na '{searchTerm}'.</p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>
          Imetengenezwa kwa <span style={{ color: "#ef4444" }}>❤</span> kwa ajili ya bara la Afrika.
        </p>
      </footer>
    </main>
  );
}
