/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Added FC to the React import.
import React, { FC, useMemo } from 'react';
import './PopUp.css';
import { useSettings, personas, SCAVENGER_HUNT_PERSONA } from '@/lib/state';

interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  const { activePersona, setPersona, isEasterEggMode } = useSettings();

  const filteredPersonas = useMemo(() => {
    return Object.keys(personas).filter(
      p => isEasterEggMode || p !== SCAVENGER_HUNT_PERSONA
    );
  }, [isEasterEggMode]);

  const currentPersona = personas[activePersona] || personas[Object.keys(personas)[0]];

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="persona-selector">
          <label>Choose your experience:</label>
          <select 
            value={activePersona} 
            onChange={(e) => setPersona(e.target.value)}
          >
            {filteredPersonas.map(p => (
              <option key={p} value={p}>{personas[p].title}</option>
            ))}
          </select>
        </div>
        
        <h2>{currentPersona.title}</h2>
        
        <div className="popup-scrollable-content">
          <p>
            {currentPersona.description}
          </p>
          <p>To get started:</p>
          <ol>
            <li>
              <span className="icon">play_circle</span>
              <div>Press the <strong>&nbsp; Play &nbsp;</strong> button to start the conversation.</div>
            </li>
            <li>
              <span className="icon">record_voice_over</span>
              <div><strong>Speak naturally &nbsp;</strong>to plan your trip. Try saying,
              "{currentPersona.initialMessage}"</div>
            </li>
            <li>
              <span className="icon">map</span>
              <div>Watch as the map <strong>&nbsp; dynamically updates &nbsp;</strong> with
              locations from your itinerary.</div>
            </li>
            <li>
              <span className="icon">keyboard</span>
              <div>Alternatively, <strong>&nbsp; type your requests &nbsp;</strong> into the message
              box.</div>
            </li>
            <li>
              <span className="icon">tune</span>
              <div>Click the <strong>&nbsp; Settings &nbsp;</strong> icon to customize the AI's
              voice and behavior.</div>
            </li>
          </ol>
        </div>
        <button onClick={onClose}>Got It, Let's Go!</button>
      </div>
    </div>
  );
};

export default PopUp;
