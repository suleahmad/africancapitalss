"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { africanCountries as localCountries, CountryData } from "../data";
import CapitalCard from "../components/CapitalCard";
import SignUpModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import CountryModal from "../components/CountryModal";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    // Fetch from live server
    fetch("https://africancapitalss.onrender.com/api/capitals")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // If the backend returns an array, use it
        if (Array.isArray(data) && data.length > 0) {
          setCountries(data);
        } else {
          // Fallback to local if data is not an array (e.g. backend not fully set up)
          setCountries(localCountries);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch from live server, using local data", err);
        setCountries(localCountries); // Fallback to local data
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((country) => {
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
          {!isRegistered ? (
            <>
              <button 
                className={styles.joinBtn} 
                onClick={() => setShowLogin(true)}
                style={{ marginRight: '10px', background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6' }}
              >
                Login
              </button>
              <button 
                className={styles.joinBtn} 
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              className={styles.joinBtn} 
              onClick={() => setIsRegistered(false)}
              style={{ background: '#ef4444' }}
            >
              Log Out
            </button>
          )}
        </div>
      </nav>

      {showSignUp && (
        <SignUpModal 
          onClose={() => setShowSignUp(false)} 
          onSuccess={() => setIsRegistered(true)}
        />
      )}

      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSuccess={() => setIsRegistered(true)}
        />
      )}

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
        {isLoading ? (
          <div className={styles.noResults}>
            <h2>Loading...</h2>
            <p>Fetching data from live server...</p>
          </div>
        ) : filteredCountries.length > 0 ? (
          <div className={styles.grid}>
            {filteredCountries.map((country) => (
              <CapitalCard 
                key={country.id} 
                country={country} 
                onClick={() => setSelectedCountry(country)}
              />
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

      {selectedCountry && (
        <CountryModal 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </main>
  );
}
