import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [fontColor, setFontColor] = useState('#000000');

    const fetchQuote = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            setQuote(response.data.content);
            setAuthor(response.data.author);
            const randomColor = getRandomColor();
            const luminance = getLuminance(randomColor);
            setBackgroundColor(randomColor);
            
            setFontColor(luminance > 128 ? '#000000' : '#FFFFFF');
        } catch (error) {
            console.error('Error fetching the quote', error);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getLuminance = (hex) => {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        return luminance;
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
    }, [backgroundColor]);

    const style = { backgroundColor: backgroundColor, color: fontColor, transition: 'background-color 1s, color 1s' };

    return (
        <div id="quote-box" style={style} className="App">
            <header className="App-header">
                <h1>Random Quote</h1>
                <div id="text">
                    <p>{quote}</p>
                </div>
                <div id="text">
                    <p>{author}</p>
                </div>
                <button id="new-quote" onClick={fetchQuote}>New Quote</button>
                <a
                    id="tweet-quote"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
                    target="_top"
                    rel="noopener noreferrer"
                >
                    Tweet
                </a>
            </header>
        </div>
    );
}


export default App;
