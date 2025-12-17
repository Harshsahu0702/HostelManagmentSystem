import React from 'react';
import { MOCK_DATA } from '../data/mockData';

const Mess = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <div>
      <div className="card">
        <h4 style={{marginTop:0}}>Weekly Menu</h4>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead><tr style={{background: '#f8fafc'}}><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr></thead>
            <tbody>
              {MOCK_DATA.messMenu.map(m => (
                <tr key={m.day} style={{background: m.day === today ? '#eff6ff' : 'transparent'}}>
                  <td style={{fontWeight: 700}}>{m.day}</td><td>{m.breakfast}</td><td>{m.lunch}</td><td>{m.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mess;

