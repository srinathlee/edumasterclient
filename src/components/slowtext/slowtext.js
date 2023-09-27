import React, { useState, useEffect } from 'react';
import './index.css'

const SlowTextRender = ({text}) => {
  const [renderedText, setRenderedText] = useState('');

  useEffect(() => {
    const renderTextSlowly = async () => {
      for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 10));
        setRenderedText(prevText => prevText + text[i]);
      }
    };

    renderTextSlowly();
  }, [text]);

  return (
    <div>
      <p className='answer-container'>{renderedText}</p>
    </div>
  );
};

export default SlowTextRender;
