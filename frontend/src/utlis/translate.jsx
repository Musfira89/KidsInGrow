import axios from 'axios';

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post('http://localhost:8080/api/translate', {
      text,
      targetLang
    });
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text in case of error
  }
};
