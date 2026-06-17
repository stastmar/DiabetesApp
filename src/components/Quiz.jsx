import React, { useState } from 'react';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';

// Quiz: shows exactly 10 questions per attempt. Each correct answer = 10 points.
// When finished, calls onComplete(score) once. Restart starts a fresh quiz at question 1.
export default function Quiz({ onComplete }) {
  const TOTAL = 10;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  // ensure we have at least TOTAL questions; if not, repeat from list
  const q = questions[index % questions.length];

  const handleAnswer = (i) => {
    if (finished) return;
    const correct = i === q.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    // if we reached TOTAL questions, finish
    if (newAnswers.length >= TOTAL) {
      const score = newAnswers.filter(Boolean).length * 10;
      setFinished(true);
      if (typeof onComplete === 'function') onComplete(score);
      return;
    }

    setIndex((idx) => idx + 1);
  };

  const restart = () => {
    // start a fresh quiz at first question
    setIndex(0);
    setAnswers([]);
    setFinished(false);
  };

  return (
    <div className="home">
      <div className="card">
        <h3>Kvízy</h3>
        <div style={{display:'flex',gap:8}}>
          {Array.from({length: TOTAL}).map((_,i)=> (
            <div key={i} style={{width:20,height:8,background:answers[i]===undefined? '#9ca3af' : answers[i]? '#22c55e' : '#ef4444'}} />
          ))}
        </div>
      </div>

      {!finished ? (
        <>
          <QuestionCard q={q} onAnswer={handleAnswer} />
          <div className="card">
            <h4>Skóre: {answers.filter(Boolean).length * 10} bodů</h4>
            <div style={{fontSize:12,opacity:0.8}}>Otázka {answers.length + 1}/{TOTAL}</div>
          </div>
        </>
      ) : (
        <div className="card">
          <h2>Hotovo 🎉</h2>
          <p>Správně: {answers.filter(Boolean).length}/{TOTAL}</p>
          <h3>Skóre: {answers.filter(Boolean).length * 10} bodů</h3>
          <div style={{display:'flex',gap:8}}>
            <button onClick={restart}>Zkusit znovu</button>
          </div>
        </div>
      )}
    </div>
  )
}
