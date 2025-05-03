function ExpenseList({ expenses }) {
  return (
    <div className="expense-list-container">
      <h2 className="section-title">Expense History</h2>
      
      {expenses.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="#0A2463" strokeWidth="1.5"/>
            <path d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11" stroke="#0A2463" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3 9H21" stroke="#0A2463" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p>No expenses recorded yet</p>
          <small>Add your first expense to get started</small>
        </div>
      ) : (
        <ul className="expense-items">
          {expenses.map((expense) => (
            <li key={expense._id} className="expense-item"> {/* Changed to _id */}
              <div className="expense-details">
                <div className="expense-icon">
                  {expense.description.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="expense-title">{expense.description}</h3>
                  {/* Added category display */}
                  <p className="expense-category">{expense.category}</p>
                  {/* Formatted date */}
                  <p className="expense-date">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <span className="expense-amount">-₹{expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .expense-list-container {
          width: 100%;
        }
        
        .section-title {
          color: #0A2463;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .empty-state {
          text-align: center;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px dashed #e0e0e0;
        }
        
        .empty-state p {
          color: #0A2463;
          font-size: 1.2rem;
          margin: 1rem 0 0.5rem;
          font-weight: 500;
        }
        
        .empty-state small {
          color: #6c757d;
          font-size: 0.9rem;
        }
        
        .expense-items {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .expense-item {
          background: white;
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(10, 36, 99, 0.08);
          transition: all 0.3s ease;
        }
        
        .expense-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 36, 99, 0.12);
        }
        
        .expense-details {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .expense-icon {
          width: 40px;
          height: 40px;
          background: #3E92CC;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .expense-title {
          color: #0A2463;
          font-size: 1.2rem;
          margin: 0;
          font-weight: 500;
        }

        .expense-category {
          color: #1B998B;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0.2rem 0;
        }
        
        .expense-date {
          color: #6c757d;
          font-size: 0.9rem;
          margin: 0.2rem 0 0;
        }
        
        .expense-amount {
          color: #FB3640;
          font-size: 1.2rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default ExpenseList;