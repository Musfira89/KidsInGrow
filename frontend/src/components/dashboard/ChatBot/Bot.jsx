import React, { useState, useEffect } from 'react';

const Bot = () => {
  const initialMessages = [{ text: "How can I assist you?", user: false }];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Create the first script tag
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "WFNOwcoWfjpTlspGAKRfL",
        domain: "www.chatbase.co"
      }
    `;
    document.head.appendChild(script1);

    // Create the second script tag
    const script2 = document.createElement('script');
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute('chatbotId', 'WFNOwcoWfjpTlspGAKRfL');
    script2.setAttribute('domain', 'www.chatbase.co');
    script2.defer = true;
    document.head.appendChild(script2);

    // Clean up the scripts when the component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

 
  return (
    <></>
  );
};

export default Bot;
