import React from 'react';

const badgeMap = {
  nutrition: '🍎 Expert na výživu',
  movement: '🚶 Mistr pohybu',
  research: '🧠 Biologický badatel',
  water: '💧 Strážce pitného režimu',
  veg: '🥦 Milovník zeleniny',
  score100: '⭐ 100 bodů',
  quizWinner: '🏆 Vítěz kvízu'
}

export default function FriendLeaderboard({ friends }) {
  return (
    <div className="card">
      <h3>Žebříček přátel</h3>
      <table>
        <tbody>
          {friends.map((f, i) => (
            <tr key={i}>
              <td style={{width:120}}>{f.name}</td>
              <td style={{width:60}}>{f.points} b.</td>
              <td>{(f.badges||[]).map(b=>badgeMap[b]||b).join(' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
