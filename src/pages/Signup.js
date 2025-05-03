import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name, email, password
      });
      alert(res.data.message);
      navigate('/login');  // after signup, go to login page
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join us to start tracking your expenses</p>
        </div>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <span>Already have an account? </span>
          <a href="/">Sign in</a>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 20px;
        }

        .signup-box {
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(10, 36, 99, 0.1);
          text-align: center;
        }

        .signup-header {
          margin-bottom: 32px;
        }

        .signup-header h2 {
          color: #0A2463;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .signup-header p {
          color: #6c757d;
          font-size: 14px;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          width: 100%;
        }

        .input-group input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          border-color: #3E92CC;
          outline: none;
          box-shadow: 0 0 0 3px rgba(62, 146, 204, 0.2);
        }

        .signup-button {
          width: 100%;
          padding: 14px;
          background-color: #FB3640;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .signup-button:hover {
          background-color: #e62e38;
          transform: translateY(-2px);
        }

        .signup-footer {
          margin-top: 24px;
          font-size: 14px;
          color: #6c757d;
        }

        .signup-footer a {
          color: #0A2463;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .signup-footer a:hover {
          color: #3E92CC;
        }
      `}</style>
    </div>
  );
}

export default Signup;