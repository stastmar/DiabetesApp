import React from 'react';

export default function BottomNav({ page, setPage }) {
  return (
    <div className="bottom-nav">
      <button onClick={() => setPage('home')}>Domů</button>
      <button onClick={() => setPage('kitchen')}>Kuchyň</button>
      <button onClick={() => setPage('scanner')}>Scanner</button>
      <button onClick={() => setPage('quiz')}>Kvízy</button>
    </div>
  )
}
