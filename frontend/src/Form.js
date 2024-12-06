import React, { useState } from "react";
import './Form.css';

const Form = () => {
    const [dateTime, setDateTime] = useState("");
    const [sum, setSum] = useState(0);
    const [category, setCategory] = useState("Product");
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await fetch("http://localhost:3001/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dateTime,
                    sum,
                    category,
                    comment
                })
            })

            if (response.ok) {
                const data = await response.json();
                console.log("Данные успешно отправлены:", data);
                alert("Расход успешно добавлен!");
            } else {
                console.error("Ошибка при отправке данных:", response.status);
                alert("Ошибка при добавлении расхода.");
            }
        } catch (error) {
            console.error("Ошибка: ", error)
            alert("Ошибка подключения к серверу\nМожет вы не включили Backend часть данной задачки?")
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label className="form-label">Дата:</label>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Сумма:</label>
                <input
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(Number(e.target.value))}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Категория:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="form-input"
                >
                    <option value="Product">Продукт</option>
                    <option value="Services">Услуги</option>
                    <option value="Consumables">Расходники</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-label">Комментарий:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-actions">
                <button type="submit" disabled={loading} className="form-button">
                    {loading ? "Отправка..." : "Добавить расход"}
                </button>
            </div>
        </form>
    )
}

export default Form;