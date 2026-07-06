const fs = require('fs');
const path = require('path');

const extraData = {
  "Algeria": { currency: "Algerian Dinar (DZD)", firstPresident: "Ahmed Ben Bella", independenceYear: "1962", history: "Gained independence from France after a long and bloody war. It is rich in Roman history and natural gas." },
  "Angola": { currency: "Angolan Kwanza (AOA)", firstPresident: "Agostinho Neto", independenceYear: "1975", history: "Gained independence from Portugal, followed by a 27-year civil war. It has since become a major oil producer." },
  "Benin": { currency: "West African CFA franc (XOF)", firstPresident: "Hubert Maga", independenceYear: "1960", history: "Formerly Dahomey, it gained independence from France. It was a major center of the Atlantic slave trade and is the birthplace of Voodoo." },
  "Botswana": { currency: "Botswana Pula (BWP)", firstPresident: "Seretse Khama", independenceYear: "1966", history: "Formerly the British protectorate of Bechuanaland. It is known for its stable democracy and diamond wealth." },
  "Burkina Faso": { currency: "West African CFA franc (XOF)", firstPresident: "Maurice Yaméogo", independenceYear: "1960", history: "Formerly Upper Volta, gained independence from France. Thomas Sankara famously renamed it Burkina Faso in 1984." },
  "Burundi": { currency: "Burundian Franc (BIF)", firstPresident: "Michel Micombero", independenceYear: "1962", history: "Gained independence from Belgium as a monarchy, overthrown in 1966. Its history has been marked by ethnic tensions." },
  "Cabo Verde": { currency: "Cape Verdean Escudo (CVE)", firstPresident: "Aristides Pereira", independenceYear: "1975", history: "Gained independence from Portugal. It is known for its stable democracy and Creole culture." },
  "Cameroon": { currency: "Central African CFA franc (XAF)", firstPresident: "Ahmadou Ahidjo", independenceYear: "1960", history: "Formed by the merging of French and British Cameroons. It is known as 'Africa in miniature'." },
  "Central African Republic": { currency: "Central African CFA franc (XAF)", firstPresident: "David Dacko", independenceYear: "1960", history: "Gained independence from France. It has experienced significant political instability." },
  "Chad": { currency: "Central African CFA franc (XAF)", firstPresident: "François Tombalbaye", independenceYear: "1960", history: "Gained independence from France. It has suffered from civil wars and conflicts with Libya." },
  "Comoros": { currency: "Comorian Franc (KMF)", firstPresident: "Ahmed Abdallah", independenceYear: "1975", history: "Gained independence from France, though Mayotte voted to remain French. It has seen numerous coups." },
  "DR Congo": { currency: "Congolese Franc (CDF)", firstPresident: "Joseph Kasa-Vubu", independenceYear: "1960", history: "Gained independence from Belgium. It has faced massive conflicts despite immense mineral wealth." },
  "Republic of the Congo": { currency: "Central African CFA franc (XAF)", firstPresident: "Fulbert Youlou", independenceYear: "1960", history: "Gained independence from France. It had a long period of Marxist-Leninist rule." },
  "Djibouti": { currency: "Djiboutian Franc (DJF)", firstPresident: "Hassan Gouled Aptidon", independenceYear: "1977", history: "Gained independence from France. It hosts several international military bases due to its strategic location." },
  "Egypt": { currency: "Egyptian Pound (EGP)", firstPresident: "Muhammad Naguib", independenceYear: "1922", history: "One of the world's oldest continuous civilizations. Modern Egypt became a republic in 1953." },
  "Equatorial Guinea": { currency: "Central African CFA franc (XAF)", firstPresident: "Francisco Macías Nguema", independenceYear: "1968", history: "Gained independence from Spain. It is now a major oil producer." },
  "Eritrea": { currency: "Eritrean Nakfa (ERN)", firstPresident: "Isaias Afwerki", independenceYear: "1993", history: "Gained independence from Ethiopia after a 30-year war." },
  "Eswatini": { currency: "Swazi Lilangeni (SZL)", firstPresident: "King Sobhuza II", independenceYear: "1968", history: "Gained independence from Britain. It is Africa's last absolute monarchy." },
  "Ethiopia": { currency: "Ethiopian Birr (ETB)", firstPresident: "Mengistu Haile Mariam", independenceYear: "Never Colonized", history: "One of the oldest nations in the world and never fully colonized. The monarchy ended in 1974." },
  "Gabon": { currency: "Central African CFA franc (XAF)", firstPresident: "Léon M'ba", independenceYear: "1960", history: "Gained independence from France. It is known for its dense rainforests and oil wealth." },
  "Gambia": { currency: "Gambian Dalasi (GMD)", firstPresident: "Dawda Jawara", independenceYear: "1965", history: "Gained independence from Britain. It is the smallest country on mainland Africa." },
  "Ghana": { currency: "Ghanaian Cedi (GHS)", firstPresident: "Kwame Nkrumah", independenceYear: "1957", history: "The first sub-Saharan nation to gain independence from Britain." },
  "Guinea": { currency: "Guinean Franc (GNF)", firstPresident: "Ahmed Sékou Touré", independenceYear: "1958", history: "Gained independence from France after rejecting the French Community." },
  "Guinea-Bissau": { currency: "West African CFA franc (XOF)", firstPresident: "Luís Cabral", independenceYear: "1973", history: "Declared independence from Portugal after a guerrilla war." },
  "Ivory Coast": { currency: "West African CFA franc (XOF)", firstPresident: "Félix Houphouët-Boigny", independenceYear: "1960", history: "Gained independence from France and became a top cocoa producer." },
  "Kenya": { currency: "Kenyan Shilling (KES)", firstPresident: "Jomo Kenyatta", independenceYear: "1963", history: "Gained independence from Britain following the Mau Mau rebellion." },
  "Lesotho": { currency: "Lesotho Loti (LSL)", firstPresident: "King Moshoeshoe II", independenceYear: "1966", history: "Gained independence from Britain. It is completely surrounded by South Africa." },
  "Liberia": { currency: "Liberian Dollar (LRD)", firstPresident: "Joseph Jenkins Roberts", independenceYear: "1847", history: "Founded by freed American slaves in 1822 and declared independence in 1847." },
  "Libya": { currency: "Libyan Dinar (LYD)", firstPresident: "King Idris", independenceYear: "1951", history: "Gained independence as a kingdom. Muammar Gaddafi ruled from 1969 to 2011." },
  "Madagascar": { currency: "Malagasy Ariary (MGA)", firstPresident: "Philibert Tsiranana", independenceYear: "1960", history: "Gained independence from France. Known for its unique flora and fauna." },
  "Malawi": { currency: "Malawian Kwacha (MWK)", firstPresident: "Hastings Banda", independenceYear: "1964", history: "Gained independence from Britain." },
  "Mali": { currency: "West African CFA franc (XOF)", firstPresident: "Modibo Keïta", independenceYear: "1960", history: "Once the center of the Mali Empire. Gained independence from France." },
  "Mauritania": { currency: "Mauritanian Ouguiya (MRU)", firstPresident: "Moktar Ould Daddah", independenceYear: "1960", history: "Gained independence from France. Bridges Arab North Africa and Sub-Saharan Africa." },
  "Mauritius": { currency: "Mauritian Rupee (MUR)", firstPresident: "Sir Seewoosagur Ramgoolam", independenceYear: "1968", history: "Gained independence from Britain. It is a highly developed island nation." },
  "Morocco": { currency: "Moroccan Dirham (MAD)", firstPresident: "King Mohammed V", independenceYear: "1956", history: "Gained independence from France and Spain. It has a rich history spanning Islamic dynasties." },
  "Mozambique": { currency: "Mozambican Metical (MZN)", firstPresident: "Samora Machel", independenceYear: "1975", history: "Gained independence from Portugal, followed by a 15-year civil war." },
  "Namibia": { currency: "Namibian Dollar (NAD)", firstPresident: "Sam Nujoma", independenceYear: "1990", history: "Gained independence from South Africa after a long struggle." },
  "Niger": { currency: "West African CFA franc (XOF)", firstPresident: "Hamani Diori", independenceYear: "1960", history: "Gained independence from France. Much of the country is in the Sahara desert." },
  "Nigeria": { currency: "Nigerian Naira (NGN)", firstPresident: "Nnamdi Azikiwe", independenceYear: "1960", history: "Gained independence from Britain. Experienced the Biafran Civil War from 1967-1970." },
  "Rwanda": { currency: "Rwandan Franc (RWF)", firstPresident: "Grégoire Kayibanda", independenceYear: "1962", history: "Gained independence from Belgium. The country experienced a tragic genocide in 1994." },
  "São Tomé and Príncipe": { currency: "São Tomé and Príncipe Dobra (STN)", firstPresident: "Manuel Pinto da Costa", independenceYear: "1975", history: "Gained independence from Portugal." },
  "Senegal": { currency: "West African CFA franc (XOF)", firstPresident: "Léopold Sédar Senghor", independenceYear: "1960", history: "Gained independence from France." },
  "Seychelles": { currency: "Seychellois Rupee (SCR)", firstPresident: "James Mancham", independenceYear: "1976", history: "Gained independence from Britain. It is famous for luxury tourism." },
  "Sierra Leone": { currency: "Sierra Leonean Leone (SLL)", firstPresident: "Milton Margai", independenceYear: "1961", history: "Gained independence from Britain. It suffered a devastating civil war in the 1990s." },
  "Somalia": { currency: "Somali Shilling (SOS)", firstPresident: "Aden Abdullah Osman Daar", independenceYear: "1960", history: "Formed by the union of British and Italian Somaliland." },
  "South Africa": { currency: "South African Rand (ZAR)", firstPresident: "Nelson Mandela", independenceYear: "1910", history: "Became a republic in 1961. The apartheid system ended in 1994 when Nelson Mandela became the first black president." },
  "South Sudan": { currency: "South Sudanese Pound (SSP)", firstPresident: "Salva Kiir Mayardit", independenceYear: "2011", history: "Gained independence from Sudan, making it the world's newest country." },
  "Sudan": { currency: "Sudanese Pound (SDG)", firstPresident: "Ismail al-Azhari", independenceYear: "1956", history: "Gained independence from joint British-Egyptian rule." },
  "Tanzania": { currency: "Tanzanian Shilling (TZS)", firstPresident: "Julius Nyerere", independenceYear: "1961", history: "Formed in 1964 by the union of Tanganyika and Zanzibar." },
  "Togo": { currency: "West African CFA franc (XOF)", firstPresident: "Sylvanus Olympio", independenceYear: "1960", history: "Gained independence from France." },
  "Tunisia": { currency: "Tunisian Dinar (TND)", firstPresident: "Habib Bourguiba", independenceYear: "1956", history: "Gained independence from France. It was the birthplace of the Arab Spring in 2011." },
  "Uganda": { currency: "Ugandan Shilling (UGX)", firstPresident: "Sir Edward Mutesa", independenceYear: "1962", history: "Gained independence from Britain. Known for the tumultuous rule of Idi Amin in the 1970s." },
  "Zambia": { currency: "Zambian Kwacha (ZMW)", firstPresident: "Kenneth Kaunda", independenceYear: "1964", history: "Formerly Northern Rhodesia, gained independence from Britain." },
  "Zimbabwe": { currency: "US Dollar / RTGS Dollar (ZWL)", firstPresident: "Canaan Banana", independenceYear: "1980", history: "Formerly Rhodesia, gained independence after a bush war." }
};

const frontendDataPath = path.join(__dirname, 'src', 'data.ts');
const backendDataPath = path.join(__dirname, 'backend', 'data.js');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // First, we extract only the original objects (cleaning out my last injected fields)
  // Or simpler: just match the array, replace it. Since it's getting complex to modify the string, let's just generate the whole array literal from scratch using our hardcoded names.
}

const originalData = [
  { id: "1", name: "Algeria", capital: "Algiers", flag: "🇩🇿", language: "Arabic / Berber", description: "The largest country in Africa, located in the north." },
  { id: "2", name: "Angola", capital: "Luanda", flag: "🇦🇴", language: "Portuguese", description: "Known for its oil and mineral wealth in southern Africa." },
  { id: "3", name: "Benin", capital: "Porto-Novo", flag: "🇧🇯", language: "French", description: "A small West African nation, the birthplace of Voodoo." },
  { id: "4", name: "Botswana", capital: "Gaborone", flag: "🇧🇼", language: "English / Tswana", description: "One of the most peaceful and stable countries in Africa." },
  { id: "5", name: "Burkina Faso", capital: "Ouagadougou", flag: "🇧🇫", language: "French", description: "Means 'Land of the Honest Men'." },
  { id: "6", name: "Burundi", capital: "Gitega", flag: "🇧🇮", language: "Kirundi / French", description: "A small mountainous nation in East Africa." },
  { id: "7", name: "Cabo Verde", capital: "Praia", flag: "🇨🇻", language: "Portuguese", description: "An archipelago located in the Atlantic Ocean." },
  { id: "8", name: "Cameroon", capital: "Yaoundé", flag: "🇨🇲", language: "French / English", description: "Known as 'Africa in miniature' for its geological diversity." },
  { id: "9", name: "Central African Republic", capital: "Bangui", flag: "🇨🇫", language: "Sango / French", description: "A landlocked nation in Central Africa." },
  { id: "10", name: "Chad", capital: "N'Djamena", flag: "🇹🇩", language: "Arabic / French", description: "Named after Lake Chad, a large landlocked country." },
  { id: "11", name: "Comoros", capital: "Moroni", flag: "🇰🇲", language: "Comorian / Arabic / French", description: "A volcanic archipelago in the Indian Ocean." },
  { id: "12", name: "DR Congo", capital: "Kinshasa", flag: "🇨🇩", language: "French / Lingala / Swahili", description: "A vast country with immense natural resources." },
  { id: "13", name: "Republic of the Congo", capital: "Brazzaville", flag: "🇨🇬", language: "French / Lingala / Kikongo", description: "Located on the western side of the Congo River." },
  { id: "14", name: "Djibouti", capital: "Djibouti", flag: "🇩🇯", language: "French / Arabic", description: "Strategically located in the Horn of Africa." },
  { id: "15", name: "Egypt", capital: "Cairo", flag: "🇪🇬", language: "Arabic", description: "Home to the ancient pyramids and the Nile River." },
  { id: "16", name: "Equatorial Guinea", capital: "Malabo", flag: "🇬🇶", language: "Spanish / French / Portuguese", description: "The only African country with Spanish as an official language." },
  { id: "17", name: "Eritrea", capital: "Asmara", flag: "🇪🇷", language: "Tigrinya / Arabic / English", description: "Located in the Horn of Africa along the Red Sea." },
  { id: "18", name: "Eswatini", capital: "Mbabane", flag: "🇸🇿", language: "Swati / English", description: "One of the few remaining absolute monarchies." },
  { id: "19", name: "Ethiopia", capital: "Addis Ababa", flag: "🇪🇹", language: "Amharic", description: "The only African country that was never colonized." },
  { id: "20", name: "Gabon", capital: "Libreville", flag: "🇬🇦", language: "French", description: "A nation with dense forests and a small population." },
  { id: "21", name: "Gambia", capital: "Banjul", flag: "🇬🇲", language: "English", description: "The smallest country on mainland Africa." },
  { id: "22", name: "Ghana", capital: "Accra", flag: "🇬🇭", language: "English", description: "The first sub-Saharan nation to gain independence." },
  { id: "23", name: "Guinea", capital: "Conakry", flag: "🇬🇳", language: "French", description: "Has immense bauxite mineral wealth." },
  { id: "24", name: "Guinea-Bissau", capital: "Bissau", flag: "🇬🇼", language: "Portuguese", description: "A small West African country known for its national parks." },
  { id: "25", name: "Ivory Coast", capital: "Yamoussoukro", flag: "🇨🇮", language: "French", description: "The world's leading producer of cocoa." },
  { id: "26", name: "Kenya", capital: "Nairobi", flag: "🇰🇪", language: "Swahili / English", description: "A major economic and cultural hub in East Africa." },
  { id: "27", name: "Lesotho", capital: "Maseru", flag: "🇱🇸", language: "Sesotho / English", description: "A country completely surrounded by South Africa." },
  { id: "28", name: "Liberia", capital: "Monrovia", flag: "🇱🇷", language: "English", description: "Founded by freed African-American citizens." },
  { id: "29", name: "Libya", capital: "Tripoli", flag: "🇱🇾", language: "Arabic", description: "A North African nation largely covered by desert." },
  { id: "30", name: "Madagascar", capital: "Antananarivo", flag: "🇲🇬", language: "Malagasy / French", description: "The world's fourth-largest island with unique biodiversity." },
  { id: "31", name: "Malawi", capital: "Lilongwe", flag: "🇲🇼", language: "Chichewa / English", description: "Known as the 'Warm Heart of Africa'." },
  { id: "32", name: "Mali", capital: "Bamako", flag: "🇲🇱", language: "French / Bambara", description: "Once the center of a great West African empire." },
  { id: "33", name: "Mauritania", capital: "Nouakchott", flag: "🇲🇷", language: "Arabic", description: "Bridges the Maghreb and the Sahel regions." },
  { id: "34", name: "Mauritius", capital: "Port Louis", flag: "🇲🇺", language: "English / French / Creole", description: "A beautiful island nation in the Indian Ocean." },
  { id: "35", name: "Morocco", capital: "Rabat", flag: "🇲🇦", language: "Arabic / Berber", description: "A North African country with a rich mix of cultures." },
  { id: "36", name: "Mozambique", capital: "Maputo", flag: "🇲🇿", language: "Portuguese", description: "Has a long and beautiful coastline along the Indian Ocean." },
  { id: "37", name: "Namibia", capital: "Windhoek", flag: "🇳🇦", language: "English", description: "Famous for the Namib Desert meeting the ocean." },
  { id: "38", name: "Niger", capital: "Niamey", flag: "🇳🇪", language: "French", description: "Most of the country is covered by the Sahara Desert." },
  { id: "39", name: "Nigeria", capital: "Abuja", flag: "🇳🇬", language: "English", description: "The most populous country in Africa." },
  { id: "40", name: "Rwanda", capital: "Kigali", flag: "🇷🇼", language: "Kinyarwanda / French / English", description: "Known as the 'Land of a Thousand Hills'." },
  { id: "41", name: "São Tomé and Príncipe", capital: "São Tomé", flag: "🇸🇹", language: "Portuguese", description: "A small island nation in Central Africa." },
  { id: "42", name: "Senegal", capital: "Dakar", flag: "🇸🇳", language: "French / Wolof", description: "The gateway to West Africa." },
  { id: "43", name: "Seychelles", capital: "Victoria", flag: "🇸🇨", language: "Creole / English / French", description: "An archipelago of paradise islands in the Indian Ocean." },
  { id: "44", name: "Sierra Leone", capital: "Freetown", flag: "🇸🇱", language: "English / Krio", description: "Famous for its white beaches and stunning scenery." },
  { id: "45", name: "Somalia", capital: "Mogadishu", flag: "🇸🇴", language: "Somali / Arabic", description: "Has the longest coastline in mainland Africa." },
  { id: "46", name: "South Africa", capital: "Pretoria", flag: "🇿🇦", language: "11 Official Languages", description: "Known as the 'Rainbow Nation'." },
  { id: "47", name: "South Sudan", capital: "Juba", flag: "🇸🇸", language: "English", description: "The world's newest nation, gained independence in 2011." },
  { id: "48", name: "Sudan", capital: "Khartoum", flag: "🇸🇩", language: "Arabic / English", description: "Where the White Nile and Blue Nile meet." },
  { id: "49", name: "Tanzania", capital: "Dodoma", flag: "🇹🇿", language: "Swahili / English", description: "Home to Mount Kilimanjaro and the Serengeti." },
  { id: "50", name: "Togo", capital: "Lomé", flag: "🇹🇬", language: "French", description: "A small but elongated country in West Africa." },
  { id: "51", name: "Tunisia", capital: "Tunis", flag: "🇹🇳", language: "Arabic", description: "A North African country bordering the Mediterranean Sea." },
  { id: "52", name: "Uganda", capital: "Kampala", flag: "🇺🇬", language: "English / Swahili", description: "Winston Churchill called it the 'Pearl of Africa'." },
  { id: "53", name: "Zambia", capital: "Lusaka", flag: "🇿🇲", language: "English", description: "Famous for the spectacular Victoria Falls." },
  { id: "54", name: "Zimbabwe", capital: "Harare", flag: "🇿🇼", language: "English / Shona", description: "Also shares Victoria Falls and the Great Zimbabwe ruins." }
];

const newArray = originalData.map(c => {
  const extra = extraData[c.name] || { currency: "Unknown", history: "N/A", firstPresident: "N/A", independenceYear: "N/A" };
  return { ...c, ...extra };
});

const tsInterface = `export interface CountryData {
  id: string;
  name: string;
  capital: string;
  flag: string;
  language: string;
  description: string;
  currency?: string;
  history?: string;
  firstPresident?: string;
  independenceYear?: string;
}

export const africanCountries: CountryData[] = ${JSON.stringify(newArray, null, 2)};
`;

const jsExport = `const africanCountries = ${JSON.stringify(newArray, null, 2)};

module.exports = africanCountries;
`;

fs.writeFileSync(frontendDataPath, tsInterface, 'utf8');
fs.writeFileSync(backendDataPath, jsExport, 'utf8');
console.log('Successfully updated data with firstPresident and independenceYear');
