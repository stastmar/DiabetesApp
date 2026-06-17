import React from 'react';

export default function QuestionCard({ q, onAnswer }) {
  return (
    <div className="card">
      <h3>{q.question}</h3>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => onAnswer(i)}>{opt}</button>
        ))}
      </div>
    </div>
  )
}
