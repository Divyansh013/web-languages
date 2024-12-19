import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState('');

  const indianLanguages = {
    en: 'English',
    hi: 'Hindi',
    ta: 'Tamil',
    te: 'Telugu',
    kn: 'Kannada',
    ml: 'Malayalam',
    pa: 'Punjabi',
    as: 'Assamese',
    bn: 'Bengali',
    gu: 'Gujarati',
  };

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = speechSynthesis.getVoices();

      const uniqueVoices = Object.keys(indianLanguages).map((lang) => {
        return availableVoices.find((voice) => voice.lang.startsWith(lang));
      }).filter(Boolean); 

      setVoices(uniqueVoices);


      if (!selectedVoice && uniqueVoices.length > 0) {
        setSelectedVoice(uniqueVoices[0]);
      }
    };

    fetchVoices();
    speechSynthesis.onvoiceschanged = fetchVoices; 
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text || !selectedVoice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <select
          value={selectedVoice?.name || ''}
          onChange={(e) => setSelectedVoice(voices.find(voice => voice.name === e.target.value))}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {indianLanguages[voice.lang.slice(0, 2)] || voice.lang} ({voice.name})
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          fontSize: '16px',
        }}
      />
      <button onClick={handleSpeak} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Speak
      </button>
    </div>
  );
}

export default App;
