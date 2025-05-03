import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseGraph from '../components/ExpenseGraph';
import { isAuthenticated } from '../utils/auth';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/expenses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) handleLogout();
          throw new Error('Failed to fetch expenses');
        }
        
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        console.error('Error:', err);
        alert(err.message);
      }
    };

    if (!isAuthenticated()) {
      alert('Please login first');
      navigate('/login');
    } else {
      fetchExpenses();
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="app-title">Expense Tracker</h1>
          <button className="logout-button" onClick={handleLogout}>
            <span>Sign Out</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="dashboard-grid">
          {/* Form Section */}
          <section className="form-section">
            <div className="card form-card">
              <h2 className="section-title">Add New Expense</h2>
              <ExpenseForm setExpenses={setExpenses} />
            </div>
          </section>

          {/* List Section */}
          <section className="list-section">
            <div className="card list-card">
              <h2 className="section-title">Recent Transactions</h2>
              <ExpenseList expenses={expenses} />
            </div>
          </section>

          {/* Graph Section */}
          <section className="graph-section">
            <div className="card graph-card">
              <h2 className="section-title">Spending Overview</h2>
              <ExpenseGraph expenses={expenses} />
            </div>
          </section>
        </div>
      </main>

      {/* Keep all your existing styles here */}
      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .dashboard-header {
          background: white;
          box-shadow: 0 2px 10px rgba(10, 36, 99, 0.05);
          padding: 2rem 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .app-title {
          color: #0A2463;
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          color: #FB3640;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .logout-button:hover {
          background: rgba(251, 54, 64, 0.08);
          transform: translateX(2px);
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
          }
          .form-section {
            grid-row: 1;
            grid-column: 1;
          }
          .list-section {
            grid-row: 2;
            grid-column: 1;
          }
          .graph-section {
            grid-row: 1 / span 2;
            grid-column: 2;
          }
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 20px rgba(10, 36, 99, 0.08);
          height: 100%;
        }

        .form-card {
          border-top: 5px solid #3E92CC;
        }

        .list-card {
          border-top: 5px solid #FB3640;
        }

        .graph-card {
          border-top: 5px solid #0A2463;
        }

        .section-title {
          color: #0A2463;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
        }

        .section-title::before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: currentColor;
          margin-right: 14px;
        }

        :global(.expense-form) {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        :global(.form-input) {
          font-size: 1.1rem !important;
          padding: 1rem !important;
          border-radius: 10px !important;
        }

        :global(.form-label) {
          font-size: 1.1rem !important;
          margin-bottom: 0.75rem !important;
        }

        :global(.submit-button) {
          font-size: 1.2rem !important;
          padding: 1.1rem !important;
          background-color: #3E92CC !important;
          border-radius: 10px !important;
          margin-top: 1rem !important;
        }

        :global(.submit-button:hover) {
          background-color: #2e82bc !important;
          transform: translateY(-3px) !important;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;