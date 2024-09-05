// // services/translationService.js
// import axios from 'axios';

// const API_KEY = '8aace98b5f0b7219a73f41abd296f0014ae5b705'; // Replace with your Google Cloud API key
// const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

// export const translateText = async (text, targetLanguage) => {
//   try {
//     const response = await axios.post(TRANSLATE_URL, {
//       q: text,
//       target: targetLanguage,
//       format: 'text',
//     });
//     return response.data.data.translations[0].translatedText;
//   } catch (error) {
//     console.error('Translation error:', error.response ? error.response.data : error.message);
//     throw new Error('Translation failed');
//   }
// };


