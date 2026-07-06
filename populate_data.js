const fs = require('fs');
const path = require('path');

const extraData = {
  "Algeria": { currency: "Algerian Dinar (DZD)", history: "Algeria gained independence from France in 1962 after a long and bloody war. Ahmed Ben Bella was its first president. It is rich in Roman history and natural gas." },
  "Angola": { currency: "Angolan Kwanza (AOA)", history: "Angola gained independence from Portugal in 1975, followed by a 27-year civil war. Agostinho Neto was the first president. It has since become a major oil producer." },
  "Benin": { currency: "West African CFA franc (XOF)", history: "Formerly Dahomey, it gained independence from France in 1960. Hubert Maga was the first president. It was a major center of the Atlantic slave trade and is the birthplace of Voodoo." },
  "Botswana": { currency: "Botswana Pula (BWP)", history: "Formerly the British protectorate of Bechuanaland, it became independent in 1966 under Seretse Khama. It is known for its stable democracy and diamond wealth." },
  "Burkina Faso": { currency: "West African CFA franc (XOF)", history: "Formerly Upper Volta, it gained independence from France in 1960. Maurice Yaméogo was the first president. Thomas Sankara famously renamed it Burkina Faso in 1984." },
  "Burundi": { currency: "Burundian Franc (BIF)", history: "Gained independence from Belgium in 1962 as a monarchy, which was overthrown in 1966. Michel Micombero was the first president. Its history has been marked by ethnic tensions." },
  "Cabo Verde": { currency: "Cape Verdean Escudo (CVE)", history: "Gained independence from Portugal in 1975. Aristides Pereira was its first president. It is known for its stable democracy and Creole culture." },
  "Cameroon": { currency: "Central African CFA franc (XAF)", history: "Formed by the merging of French and British Cameroons in 1961. Ahmadou Ahidjo was the first president. It is known as 'Africa in miniature'." },
  "Central African Republic": { currency: "Central African CFA franc (XAF)", history: "Gained independence from France in 1960. David Dacko was the first president. It has experienced significant political instability." },
  "Chad": { currency: "Central African CFA franc (XAF)", history: "Gained independence from France in 1960. François Tombalbaye was its first president. It has suffered from civil wars and conflicts with Libya." },
  "Comoros": { currency: "Comorian Franc (KMF)", history: "Gained independence from France in 1975, though Mayotte voted to remain French. Ahmed Abdallah was the first president. It has seen numerous coups." },
  "DR Congo": { currency: "Congolese Franc (CDF)", history: "Gained independence from Belgium in 1960. Joseph Kasa-Vubu was the first president, and Patrice Lumumba the first PM. It has faced massive conflicts despite immense mineral wealth." },
  "Republic of the Congo": { currency: "Central African CFA franc (XAF)", history: "Gained independence from France in 1960. Fulbert Youlou was the first president. It had a long period of Marxist-Leninist rule." },
  "Djibouti": { currency: "Djiboutian Franc (DJF)", history: "Gained independence from France in 1977. Hassan Gouled Aptidon was its first president. It hosts several international military bases due to its strategic location." },
  "Egypt": { currency: "Egyptian Pound (EGP)", history: "One of the world's oldest continuous civilizations. Modern Egypt became a republic in 1953 after the overthrow of the monarchy. Muhammad Naguib was its first president." },
  "Equatorial Guinea": { currency: "Central African CFA franc (XAF)", history: "Gained independence from Spain in 1968. Francisco Macías Nguema was the first president. It is now a major oil producer." },
  "Eritrea": { currency: "Eritrean Nakfa (ERN)", history: "Gained independence from Ethiopia in 1993 after a 30-year war. Isaias Afwerki has been its first and only president since then." },
  "Eswatini": { currency: "Swazi Lilangeni (SZL)", history: "Gained independence from Britain in 1968. King Sobhuza II ruled for 82 years. It is Africa's last absolute monarchy." },
  "Ethiopia": { currency: "Ethiopian Birr (ETB)", history: "One of the oldest nations in the world and the only African country never colonized. The monarchy ended in 1974 with the overthrow of Emperor Haile Selassie." },
  "Gabon": { currency: "Central African CFA franc (XAF)", history: "Gained independence from France in 1960. Léon M'ba was the first president. It is known for its dense rainforests and oil wealth." },
  "Gambia": { currency: "Gambian Dalasi (GMD)", history: "Gained independence from Britain in 1965. Dawda Jawara was the first president. It is the smallest country on mainland Africa." },
  "Ghana": { currency: "Ghanaian Cedi (GHS)", history: "The first sub-Saharan nation to gain independence (from Britain in 1957). Kwame Nkrumah was its first president and a leading Pan-Africanist." },
  "Guinea": { currency: "Guinean Franc (GNF)", history: "Gained independence from France in 1958 after rejecting the French Community. Ahmed Sékou Touré was its first president." },
  "Guinea-Bissau": { currency: "West African CFA franc (XOF)", history: "Declared independence from Portugal in 1973 after a guerrilla war. Luís Cabral was its first president." },
  "Ivory Coast": { currency: "West African CFA franc (XOF)", history: "Gained independence from France in 1960. Félix Houphouët-Boigny was its first president and ruled for over three decades." },
  "Kenya": { currency: "Kenyan Shilling (KES)", history: "Gained independence from Britain in 1963 following the Mau Mau rebellion. Jomo Kenyatta was its first president." },
  "Lesotho": { currency: "Lesotho Loti (LSL)", history: "Gained independence from Britain in 1966. King Moshoeshoe II was the paramount chief. It is completely surrounded by South Africa." },
  "Liberia": { currency: "Liberian Dollar (LRD)", history: "Founded by freed American slaves in 1822 and declared independence in 1847. Joseph Jenkins Roberts was its first president." },
  "Libya": { currency: "Libyan Dinar (LYD)", history: "Gained independence in 1951 as a kingdom under King Idris. Muammar Gaddafi overthrew the king in 1969 and ruled until 2011." },
  "Madagascar": { currency: "Malagasy Ariary (MGA)", history: "Gained independence from France in 1960. Philibert Tsiranana was its first president. Known for its unique flora and fauna." },
  "Malawi": { currency: "Malawian Kwacha (MWK)", history: "Gained independence from Britain in 1964. Hastings Banda was its first president, ruling for three decades." },
  "Mali": { currency: "West African CFA franc (XOF)", history: "Once the center of the Mali Empire. Gained independence from France in 1960. Modibo Keïta was its first president." },
  "Mauritania": { currency: "Mauritanian Ouguiya (MRU)", history: "Gained independence from France in 1960. Moktar Ould Daddah was its first president. It bridges Arab North Africa and Sub-Saharan Africa." },
  "Mauritius": { currency: "Mauritian Rupee (MUR)", history: "Gained independence from Britain in 1968. Sir Seewoosagur Ramgoolam was the first PM. It is a highly developed island nation." },
  "Morocco": { currency: "Moroccan Dirham (MAD)", history: "Gained independence from France and Spain in 1956. King Mohammed V played a key role. It has a rich history spanning Islamic dynasties." },
  "Mozambique": { currency: "Mozambican Metical (MZN)", history: "Gained independence from Portugal in 1975, followed by a 15-year civil war. Samora Machel was its first president." },
  "Namibia": { currency: "Namibian Dollar (NAD)", history: "Gained independence from South Africa in 1990 after a long struggle. Sam Nujoma was its first president." },
  "Niger": { currency: "West African CFA franc (XOF)", history: "Gained independence from France in 1960. Hamani Diori was its first president. Much of the country is in the Sahara desert." },
  "Nigeria": { currency: "Nigerian Naira (NGN)", history: "Gained independence from Britain in 1960. Nnamdi Azikiwe was its first president. It experienced the Biafran Civil War from 1967-1970." },
  "Rwanda": { currency: "Rwandan Franc (RWF)", history: "Gained independence from Belgium in 1962. Grégoire Kayibanda was its first president. The country experienced a tragic genocide in 1994." },
  "São Tomé and Príncipe": { currency: "São Tomé and Príncipe Dobra (STN)", history: "Gained independence from Portugal in 1975. Manuel Pinto da Costa was the first president." },
  "Senegal": { currency: "West African CFA franc (XOF)", history: "Gained independence from France in 1960. Léopold Sédar Senghor, a renowned poet, was its first president." },
  "Seychelles": { currency: "Seychellois Rupee (SCR)", history: "Gained independence from Britain in 1976. James Mancham was the first president. It is famous for luxury tourism." },
  "Sierra Leone": { currency: "Sierra Leonean Leone (SLL)", history: "Gained independence from Britain in 1961. Milton Margai was the first PM. It suffered a devastating civil war in the 1990s." },
  "Somalia": { currency: "Somali Shilling (SOS)", history: "Formed in 1960 by the union of British and Italian Somaliland. Aden Abdullah Osman Daar was the first president." },
  "South Africa": { currency: "South African Rand (ZAR)", history: "Became a republic in 1961. The apartheid system ended in 1994 when Nelson Mandela became the first black president." },
  "South Sudan": { currency: "South Sudanese Pound (SSP)", history: "Gained independence from Sudan in 2011, making it the world's newest country. Salva Kiir Mayardit became its first president." },
  "Sudan": { currency: "Sudanese Pound (SDG)", history: "Gained independence from joint British-Egyptian rule in 1956. It has seen multiple civil wars and the secession of South Sudan." },
  "Tanzania": { currency: "Tanzanian Shilling (TZS)", history: "Formed in 1964 by the union of Tanganyika and Zanzibar. Julius Nyerere ('Mwalimu') was its first president and a key Pan-Africanist." },
  "Togo": { currency: "West African CFA franc (XOF)", history: "Gained independence from France in 1960. Sylvanus Olympio was the first president before being assassinated in 1963." },
  "Tunisia": { currency: "Tunisian Dinar (TND)", history: "Gained independence from France in 1956. Habib Bourguiba was the first president. It was the birthplace of the Arab Spring in 2011." },
  "Uganda": { currency: "Ugandan Shilling (UGX)", history: "Gained independence from Britain in 1962. Sir Edward Mutesa was its first president. Known for the tumultuous rule of Idi Amin in the 1970s." },
  "Zambia": { currency: "Zambian Kwacha (ZMW)", history: "Formerly Northern Rhodesia, gained independence from Britain in 1964. Kenneth Kaunda was its first president." },
  "Zimbabwe": { currency: "US Dollar / RTGS Dollar (ZWL)", history: "Formerly Rhodesia, gained independence in 1980 after a bush war. Canaan Banana was the first president, with Robert Mugabe as PM." }
};

const frontendDataPath = path.join(__dirname, 'src', 'data.ts');
const backendDataPath = path.join(__dirname, 'backend', 'data.js');

// Helper to replace content
function updateDataFile(filePath, isTypeScript) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Basic parsing: finding the array
  const match = content.match(/\[([\s\S]*?)\];/);
  if (!match) {
    console.error("Could not find array in", filePath);
    return;
  }
  
  // We'll just eval the array content and then map it.
  // Since it's TS/JS, we can turn it into JSON by some regex, or just use a safer approach:
  // Instead of complex parsing, I'll just regenerate the entire array block.
  
  let newArrayString = "[\n";
  const oldArrayStr = match[1];
  
  // Extract each object
  const objectMatches = oldArrayStr.match(/\{[^}]+\}/g);
  
  if (objectMatches) {
    objectMatches.forEach((objStr, index) => {
      // Very hacky parse:
      const nameMatch = objStr.match(/name:\s*"([^"]+)"/);
      if (nameMatch) {
        const name = nameMatch[1];
        const extra = extraData[name] || { currency: "Unknown", history: "History coming soon." };
        
        // Let's replace the closing brace with the new fields
        let newObjStr = objStr.replace(/\s*\}$/, `, currency: "${extra.currency}", history: "${extra.history.replace(/"/g, '\\"')}" }`);
        newArrayString += `  ${newObjStr}${index < objectMatches.length - 1 ? ',' : ''}\n`;
      }
    });
  }
  newArrayString += "]";

  content = content.replace(/\[([\s\S]*?)\]/, newArrayString);
  
  if (isTypeScript) {
    // Add history and currency to interface if not there
    if (!content.includes('currency?: string;')) {
        content = content.replace(/export interface CountryData \{/, "export interface CountryData {\n  currency?: string;\n  history?: string;");
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateDataFile(frontendDataPath, true);
updateDataFile(backendDataPath, false);
