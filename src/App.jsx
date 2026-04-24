import { useState } from "react";
import "./App.css";

/* ---------------------------------------------KITCHEN------------------------------------------------ */
function Kitchen({ onEat }) {
    const foods = [
        { name: "Jablko", impact: 0.8 },
        { name: "Banán", impact: 1.5 },
        { name: "Chléb", impact: 2.0 },
        { name: "Cola", impact: 3.0 },
        { name: "Brokolice", impact: -0.5 },
    ];

    return (
        <div className="home">
            <div className="card">
                <h3>Kuchyň 🍽️</h3>
                <p>Vyber jídlo a sleduj vliv na glukózu</p>
            </div>

            {foods.map((food, i) => (
                <div className="card" key={i}>
                    <div className="last-row">
                        <div>
                            <strong>{food.name}</strong>
                            <div style={{ fontSize: "12px", opacity: 0.7 }}>
                                dopad: {food.impact > 0 ? "+" : ""}{food.impact}
                            </div>
                        </div>

                        <button onClick={() => onEat(food.impact)}>
                            Sníst
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ------------------------------------------------SCANNER----------------------------------------------------- */
function Scanner({ barcode, setBarcode, product, scanProduct }) {
    return (
        <div className="home">
            <div className="card">
                <h3>Scanner 📦</h3>

                <div className="last-row">
                    <input
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="čárový kód"
                    />

                    <button onClick={scanProduct}>
                        Hledat
                    </button>
                </div>
            </div>

            {product && (
                <div className="card">
                    {product.error ? (
                        <p style={{ color: "red" }}>{product.error}</p>
                    ) : (
                        <>
                            <h3>{product.name}</h3>
                            <p>🍬 cukry: {product.sugar} g</p>
                            <p>🍞 sacharidy: {product.carbs} g</p>
                            <p>🔥 kcal: {product.kcal}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

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

    /* FRIENDS */
    const [friends] = useState([
        { name: "Anna", value: 5.4 },
        { name: "Tomáš", value: 6.8 },
        { name: "Lukáš", value: 5.9 },
    ]);

    /* MODAL */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState("");

    /* SCANNER */
    const [barcode, setBarcode] = useState("");
    const [product, setProduct] = useState(null);

    const products = {
        "123456": { name: "Jablko", sugar: 10, carbs: 14, kcal: 52 },
        "987654": { name: "Cola", sugar: 35, carbs: 39, kcal: 140 },
        "111111": { name: "Chléb", sugar: 3, carbs: 49, kcal: 265 },
    };

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
    };

    const scanProduct = () => {
        const found = products[barcode];
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

            {page === "home" && (
                <div className="home">

                    <div className="card">
                        <h3>Poslední měření</h3>

                        <div className="last-row">
                            <div className="big-value">
                                {latest.toFixed(1)} mmol/L
                            </div>

                            <button onClick={() => setIsModalOpen(true)}>
                                + Přidat
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Vývoj glukózy</h3>

                        <div className="chart">

                            {glucoseData.map((v, i) => {
                                if (i === glucoseData.length - 1) return null;

                                const x1 = (i / (glucoseData.length - 1)) * 100;
                                const x2 = ((i + 1) / (glucoseData.length - 1)) * 100;

                                const y1 = 100 - (v / max) * 100;
                                const y2 = 100 - (glucoseData[i + 1] / max) * 100;

                                const color =
                                    v < min || v > max ||
                                    glucoseData[i + 1] < min ||
                                    glucoseData[i + 1] > max
                                        ? "#ef4444"
                                        : "#22c55e";

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            position: "absolute",
                                            left: `${x1}%`,
                                            top: `${y1}%`,
                                            width: `${x2 - x1}%`,
                                            height: "2px",
                                            background: color,
                                            transformOrigin: "left",
                                        }}
                                    />
                                );
                            })}

                            {glucoseData.map((v, i) => {
                                const x = (i / (glucoseData.length - 1)) * 100;
                                const y = 100 - (v / max) * 100;
                                const bad = v < min || v > max;

                                return (
                                    <div
                                        key={i}
                                        className="point"
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                            background: bad ? "#ef4444" : "#22c55e",
                                        }}
                                    />
                                );
                            })}

                        </div>
                    </div>

                    <div className="card">
                        <h3>Přátelé</h3>

                        <table>
                            <tbody>
                            {friends.map((f, i) => (
                                <tr key={i}>
                                    <td>{f.name}</td>
                                    <td>{f.value} mmol/L</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}

            {page === "kitchen" && <Kitchen onEat={eatFood} />}

            {page === "scanner" && (
                <Scanner
                    barcode={barcode}
                    setBarcode={setBarcode}
                    product={product}
                    scanProduct={scanProduct}
                />
            )}

            {page === "insulin" && (
                <div className="home">
                    <div className="card">
                        <h3>💉 Skóre: {insulinScore}</h3>
                        <ProgressBar answers={answers} total={insulinQuestions.length} />
                    </div>

                    {result === null ? (
                        <div className="card">
                            <h2>Kolo {insulinIndex + 1}/5</h2>

                            <p style={{ fontSize: "22px" }}>
                                {insulinQuestions[insulinIndex].food}
                            </p>

                            <h3>{insulinQuestions[insulinIndex].glucose} mmol/L</h3>

                            {[0,1,2,3,4].map((d) => (
                                <button key={d} onClick={() => answerInsulin(d)}>
                                    {d} jednotek
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="card">
                            <h2>Hotovo 🎯</h2>

                            <p>
                                Správně: {answers.filter(Boolean).length}/{answers.length}
                            </p>

                            <button
                                onClick={() => {
                                    setInsulinIndex(0);
                                    setAnswers([]);
                                    setResult(null);
                                    setInsulinScore(0);
                                }}
                            >
                                Restart
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="bottom-nav">
                <button onClick={() => setPage("home")}>Domů</button>
                <button onClick={() => setPage("kitchen")}>Kuchyň</button>
                <button onClick={() => setPage("scanner")}>Scanner</button>
                <button onClick={() => setPage("insulin")}>Inzulín</button>
            </div>

        </div>
    );
}