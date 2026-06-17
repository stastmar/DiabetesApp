import { useState, useEffect } from "react";
import "./App.css";
import Home from './components/Home';
import Kitchen from './components/Kitchen';
import Scanner from './components/Scanner';
import Quiz from './components/Quiz';
import BottomNav from './components/BottomNav';
import Mascot from './components/Mascot';
import ProductCard from './components/ProductCard';
import { getProductsPreferFirestore, getProductByBarcodePreferFirestore } from './firebase';

/* -----------------------------------------------PROGRESS BAR-------------------------------------------------- */
function ProgressBar({ answers, total }) {
    return (
        <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
            {Array.from({ length: total }).map((_, i) => {
                let color = "#9ca3af";

                if (answers[i] === true) color = "#22c55e";
                if (answers[i] === false) color = "#ef4444";

                return (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: "6px",
                            background: color,
                            borderRadius: "4px",
                        }}
                    />
                );
            })}
        </div>
    );
}

/* ------------------------------------------------MAIN APP----------------------------------------------------- */
export default function App() {
    const [page, setPage] = useState("home");

    /* HOME DATA */
    const [latest, setLatest] = useState(6.2);
    const [glucoseData, setGlucoseData] = useState([
        5.2, 5.8, 6.1, 5.5, 6.4, 7.0, 6.2,
    ]);

    const min = 4.0;
    const max = 8.0;

    /* FRIENDS (leaderboard) */
    const [friends, setFriends] = useState([
        { name: "Anna", points: 80, badges: ['nutrition'] },
        { name: "Tomáš", points: 45, badges: ['movement'] },
        { name: "Lukáš", points: 102, badges: ['score100','quizWinner'] },
    ]);

    /* MODAL */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null); // 'measurement' | 'eat' | null
    const [modalPayload, setModalPayload] = useState(null);
    const [modalValue, setModalValue] = useState("");

    /* SCANNER */
    const [barcode, setBarcode] = useState("");
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(()=>{
      (async ()=>{
        const items = await getProductsPreferFirestore();
        setAllProducts(items || []);
      })();
    },[]);

    /* INSULIN */
    const insulinQuestions = [
        { food: "🍞 Chleba", glucose: 9.8, correct: 3 },
        { food: "🍎 Jablko", glucose: 7.2, correct: 1 },
        { food: "🥤 Cola", glucose: 12.0, correct: 4 },
        { food: "🍌 Banán", glucose: 10.0, correct: 3 },
        { food: "🍝 Těstoviny", glucose: 11.2, correct: 4 },
    ];

    const [insulinIndex, setInsulinIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const [insulinScore, setInsulinScore] = useState(0);

    /* ----------------------------------------------LOGIC--------------------------------------------- */

    const eatFood = (impact) => {
        const newValue = latest + impact;
        setLatest(newValue);
        setGlucoseData([...glucoseData, newValue]);
    };

    const saveMeasurement = () => {
        const value = parseFloat(modalValue);
        if (isNaN(value)) return;

        setLatest(value);
        setGlucoseData([...glucoseData, value]);

        setModalValue("");
        setIsModalOpen(false);
        setModalMode(null);
        setModalPayload(null);
    };

    const openMeasurementModal = () => {
        setModalValue("");
        setModalPayload(null);
        setModalMode('measurement');
        setIsModalOpen(true);
    };

    const openEatModal = (food) => {
        setModalPayload(food);
        setModalMode('eat');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
        setModalPayload(null);
        setModalValue("");
    };

    const confirmEat = () => {
        if (!modalPayload) return;
        eatFood(modalPayload.impact);
        closeModal();
    };

    const scanProduct = () => {
        const code = (barcode || "").trim();
        if (!code) {
            setProduct({ error: "Zadejte čárový kód" });
            return;
        }

        // try exact match first, then try without leading zeros
        let found = products[code];
        if (!found) {
            const noLeadingZeros = code.replace(/^0+/, "");
            found = products[noLeadingZeros];
        }

        setProduct(found || { error: "Produkt nenalezen" });
    };

    const answerInsulin = (dose) => {
        const q = insulinQuestions[insulinIndex];
        const correct = dose === q.correct;

        const newAnswers = [...answers, correct];
        setAnswers(newAnswers);

        setInsulinScore((s) => s + (correct ? 10 : -5));

        if (insulinIndex + 1 >= insulinQuestions.length) {
            setResult(newAnswers);
        } else {
            setInsulinIndex(insulinIndex + 1);
        }
    };

    /* -----------------------------------------UI--------------------------------------------------- */

    return (
        <div className="app">

            {page === 'home' && (
              <Home latest={latest} glucoseData={glucoseData} openMeasurement={openMeasurementModal} activity={{steps:4500,minutes:32,calories:210}} friends={friends} />
            )}

            {page === 'kitchen' && <Kitchen onEatOpen={openEatModal} />}

            {page === 'scanner' && <Scanner />}

            {page === 'quiz' && <Quiz />}

            <BottomNav page={page} setPage={setPage} />

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        {modalMode === 'measurement' && (
                            <>
                                <h3>Přidat měření</h3>
                                <input
                                    value={modalValue}
                                    onChange={(e) => setModalValue(e.target.value)}
                                    placeholder="hodnota (mmol/L)"
                                />
                                <div className="modal-actions">
                                    <button onClick={closeModal}>Zrušit</button>
                                    <button onClick={saveMeasurement}>Uložit</button>
                                </div>
                            </>
                        )}

                        {modalMode === 'eat' && modalPayload && (
                            <>
                                <h3>Sníst: {modalPayload.name}</h3>
                                <p>Dopad na glukózu: {modalPayload.energy ? modalPayload.energy + ' kcal' : ''}</p>
                                <div style={{marginTop:8}}>
                                  <button onClick={closeModal}>Zrušit</button>
                                  <button onClick={() => { eatFood(modalPayload.energy ? modalPayload.energy/100 : 0.5); closeModal(); }}>Sníst</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}