"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { africanCountries } from "../data";
import CapitalCard from "../components/CapitalCard";
import SignUpModal from "../components/SignUpModal";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const filteredCountries = africanCountries.filter((country) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.capital.toLowerCase().includes(searchLower)
    );
  });

  return (  
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>African<span className="text-gradient">Capitals</span></div>
        <div className={styles.navSearch}>
          <input
            type="text"
            placeholder="Search country or capital..."
            className={styles.navSearchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.navActions}>
          <button 
            className={styles.joinBtn} 
            onClick={() => setShowSignUp(true)}
          >
            Join / Sign Up
          </button>
        </div>
      </nav>

      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}

      <header className={styles.header}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Capitals of <span className="text-gradient">Africa</span>
          </h1>
          <p className={styles.subtitle}>
            Discover and learn about various African countries and their capital cities with ease.
          </p>
          
          {searchTerm && (
            <p className={styles.resultsCount}>
              Found {filteredCountries.length} results
            </p>
          )}
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
            <h2>No Results</h2>
            <p>We couldn't find any country or capital matching '{searchTerm}'.</p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>
          Made with <span style={{ color: "#ef4444" }}>❤</span> for the African continent.
        </p>
      </footer>
    </main>
  );
}
