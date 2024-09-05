// // controllers/translationController.js
// import { translateText} from '../services/translationService.js'; // Import the translation service

// // Handle translation requests
// export const translateTextController = async (req, res) => {
//   const { text, targetLanguage } = req.body;

//   if (!text || !targetLanguage) {
//     return res.status(400).json({ error: 'Missing text or targetLanguage' });
//   }

//   try {
//     const translatedText = await translateText(text, targetLanguage);
//     res.json({ translatedText });
//   } catch (error) {
//     console.error('Translation error:', error.message);
//     res.status(500).json({ error: 'Translation failed' });
//   }
// };


