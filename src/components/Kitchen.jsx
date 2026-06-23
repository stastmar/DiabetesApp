import React from 'react';
import MascotBubble from './MascotBubble';

const foods = [
  { name: 'Jablko', image:'', desc:'Jablko je zdravé a plné vlákniny.', energy:52, carbs:14, sugars:10, protein:0.3, fat:0.2, fiber:2.4, salt:0 },
  { name: 'Banán', image:'', desc:'Banán dodá energii před pohybem.', energy:89, carbs:23, sugars:12, protein:1.1, fat:0.3, fiber:2.6, salt:0 },
  { name: 'Chléb', image:'', desc:'Chléb obsahuje sacharidy, které tě nabijí energií.', energy:265, carbs:49, sugars:3, protein:9, fat:3.2, fiber:2.7, salt:1.2 },
  { name: 'Brokolice', image:'', desc:'Brokolice je plná vitamínů a vlákniny.', energy:34, carbs:7, sugars:1.7, protein:2.8, fat:0.4, fiber:2.6, salt:0.03 },
  { name: 'Mrkev', image:'', desc:'Mrkev je dobrá pro oči a tělo.', energy:41, carbs:10, sugars:4.7, protein:0.9, fat:0.2, fiber:2.8, salt:0.07 },
  { name: 'Rýže', image:'', desc:'Rýže dodá sacharidy pro výkon.', energy:130, carbs:28, sugars:0.1, protein:2.7, fat:0.3, fiber:0.4, salt:0 },
  { name: 'Těstoviny', image:'', desc:'Těstoviny jsou výživné, volte celozrnné.', energy:131, carbs:25, sugars:1.1, protein:5, fat:1.1, fiber:1.3, salt:0.01 },
  { name: 'Ovesné vločky', image:'', desc:'Skvělé pro snídani s vlákninou.', energy:379, carbs:66, sugars:1, protein:13, fat:7, fiber:10, salt:0.02 },
  { name: 'Jogurt', image:'', desc:'Jogurt obsahuje bílkoviny a probiotika.', energy:59, carbs:3.6, sugars:3.2, protein:10, fat:0.4, fiber:0, salt:0.1 },
  { name: 'Losos', image:'', desc:'Losos je bohatý na zdravé tuky.', energy:208, carbs:0, sugars:0, protein:20, fat:13, fiber:0, salt:0.1 },
  { name: 'Kuřecí maso', image:'', desc:'Skvělý zdroj bílkovin pro regeneraci.', energy:239, carbs:0, sugars:0, protein:27, fat:14, fiber:0, salt:0.12 },
  { name: 'Ořechy', image:'', desc:'Ořechy jsou energie v malém balení.', energy:607, carbs:21, sugars:4.3, protein:20, fat:54, fiber:7, salt:0.02 }
];

export default function Kitchen({ onEatOpen }) {
  return (
    <div className="home">
      <div className="card" style={{position:'relative'}}>
        <MascotBubble message={'V kuchyni najdeš potraviny. Klikni na Poradit pro radu k potravině.'} />
        <h3>Kuchyň 🍽️</h3>
        <p>Vyber jídlo a Cukřík ti poradí.</p>
      </div>

      {foods.map((f,i)=> (
        <div className="card" key={i} style={{position:'relative'}}>
          <MascotBubble message={f.desc} />
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <strong>{f.name}</strong>
              <div style={{fontSize:12,opacity:0.7}}>{f.desc}</div>
              <div style={{fontSize:12,opacity:0.7,marginTop:6}}>Energeticky: {f.energy} kcal • Sach: {f.carbs} g</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
              <button onClick={() => onEatOpen(f)}>Sníst</button>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}
