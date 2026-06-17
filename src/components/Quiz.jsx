import React, { useState } from 'react';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const q = questions[index];

  const onAnswer = (i) => {
    const correct = i === q.answer;
    setAnswers(a=>[...a, correct]);
    setIndex(idx=>Math.min(questions.length-1, idx+1));
  };

  return (
    <div className="home">
      <div className="card">
        <h3>Kvízy</h3>
        <div style={{display:'flex',gap:8}}>
          {questions.slice(0,10).map((__,i)=> (
            <div key={i} style={{width:20,height:8,background:answers[i]===undefined? '#9ca3af' : answers[i]? '#22c55e' : '#ef4444'}} />
          ))}
        </div>
      </div>

      <QuestionCard q={q} onAnswer={(i)=>onAnswer(i)} />

      <div className="card">
        <h4>Skóre: {answers.filter(Boolean).length * 10} bodů</h4>
      </div>
    </div>
  )
}
