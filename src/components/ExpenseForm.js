import { useState } from 'react';

function ExpenseForm({ setExpenses }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      alert('Please fill all fields!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          category
        })
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses(prev => [...prev, {
          ...newExpense,
          date: new Date(newExpense.date).toLocaleDateString()
        }]);
        setDescription('');
        setAmount('');
        setCategory('');
      }
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('Failed to add expense');
    }
  };

  return (
    <div className="expense-form-container">
      <h2 className="form-title">Track New Expense</h2>
      
      <form onSubmit={handleAddExpense} className="expense-form">
        <div className="input-group">
          <label className="input-label">What did you spend on?</label>
          <input 
            type="text"
            placeholder="Dinner, Groceries, Uber..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Amount Spent</label>
          <input 
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Added Category Dropdown */}
        <div className="input-group">
          <label className="input-label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          <span>Add Expense</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </form>
      <style jsx>{`
        .expense-form-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        .form-title {
          color: #0A2463;
          font-size: 1.8rem;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
          letter-spacing: -0.5px;
        }

        .expense-form {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .input-label {
          font-size: 1.2rem;
          color: #0A2463;
          font-weight: 500;
          margin-left: 0.5rem;
        }

        .form-input {
          font-size: 1.2rem;
          padding: 1.1rem 1.5rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .form-input:focus {
          border-color: #3E92CC;
          outline: none;
          box-shadow: 0 0 0 4px rgba(62, 146, 204, 0.2);
          background: white;
        }

        .form-input::placeholder {
          color: #adb5bd;
          opacity: 0.8;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          font-size: 1.3rem;
          padding: 1.2rem;
          background-color: #3E92CC;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          font-weight: 500;
        }

        .submit-button:hover {
          background-color: #2e82bc;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(62, 146, 204, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default ExpenseForm;