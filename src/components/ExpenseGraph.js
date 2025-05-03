import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

function ExpenseGraph({ expenses }) {
  const COLORS = ['#0A2463', '#3E92CC', '#FB3640', '#1B998B', '#FF9F1C', '#A675A1', '#5F4B66', '#94C5CC'];

  // Aggregate expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.totalAmount += expense.amount;
    } else {
      acc.push({ 
        category: expense.category,
        totalAmount: expense.amount,
        count: 1 
      });
    }
    return acc;
  }, []);

  // Format data for charts
  const processData = () => {
    return categoryData.map(item => ({
      name: item.category,
      value: item.totalAmount,
      count: item.count
    }));
  };

  const chartData = processData();

  if (expenses.length === 0) {
    return (
      <div className="graph-empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z" fill="#3E92CC" fillOpacity="0.2"/>
          <path d="M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z" stroke="#0A2463" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3>Expense Analytics</h3>
        <p>Add expenses to see visual breakdowns</p>
      </div>
    );
  }

  return (
    <div className="graph-container">
      <h2 className="section-title">Expense Analytics</h2>

      {/* Pie Chart Section */}
      <div className="chart-section">
        <h3 className="chart-title">Spending by Category</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={2}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                contentStyle={{
                  background: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(10, 36, 99, 0.15)',
                  padding: '12px'
                }}
              />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-section">
        <h3 className="chart-title">Expense Breakdown</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={70}
                tick={{ fill: '#6c757d' }}
              />
              <YAxis 
                tick={{ fill: '#6c757d' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Total']}
                contentStyle={{
                  background: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(10, 36, 99, 0.15)',
                  padding: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="value" 
                name="Total Amount"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keep all your existing styles here */}
      <style jsx>{`
        .graph-container {
          width: 100%;
          padding: 1.5rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(10, 36, 99, 0.08);
        }
        
        .section-title {
          color: #0A2463;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .graph-empty-state {
          text-align: center;
          padding: 3rem;
          background: #f8f9fa;
          border-radius: 12px;
        }
        
        .graph-empty-state h3 {
          color: #0A2463;
          font-size: 1.5rem;
          margin: 1.5rem 0 0.5rem;
        }
        
        .graph-empty-state p {
          color: #6c757d;
          font-size: 1rem;
        }
        
        .chart-section {
          margin-bottom: 3rem;
        }
        
        .chart-section:last-child {
          margin-bottom: 0;
        }
        
        .chart-title {
          color: #0A2463;
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
          text-align: center;
        }
        
        .chart-wrapper {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}

export default ExpenseGraph;