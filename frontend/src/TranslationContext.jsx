// src/TranslationContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const translate = async (text) => {
    if (!translations[text]) {
      try {
        const response = await axios.post('/api/translate', {
          text,
          targetLanguage: language,
        });
        const translatedText = response.data.translatedText;
        setTranslations((prev) => ({ ...prev, [text]: translatedText }));
        return translatedText;
      } catch (error) {
        console.error('Translation error:', error.message);
        return text; // Fallback to original text if translation fails
      }
    }
    return translations[text];
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};
