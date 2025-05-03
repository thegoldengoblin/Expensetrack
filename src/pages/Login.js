import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // ✅ Save token in localStorage (assuming your backend sends token)
      localStorage.setItem('token', res.data.token);

      alert(res.data.message || 'Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    
<>

    <div className="login-container">
    <div className="money-pattern"></div>
      <div className="login-box">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading} // Disable while loading
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account? </span>
          <a href="/signup">Create one</a>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 20px;
         
        }

        .login-box {
          width: 100%;
          max-width: 380px;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(10, 36, 99, 0.1);
          text-align: center;
          z-index: 1;
        }

        .login-header {
          margin-bottom: 32px;
        }

        .login-header h2 {
          color: #0A2463;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .login-header p {
          color: #6c757d;
          font-size: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
          /* Money Pattern Background */
       .money-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg fill='%233e92cc' viewBox='-96 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z'/%3E%3C/svg%3E");
    background-size: 50px 50px;
    opacity: 0.08;
    animation: patternMove 120s linear infinite;
    z-index: 0;
  }

  @keyframes patternMove {
    0% { background-position: 0 0; }
    100% { background-position: 1000px 1000px; }
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

        .login-button {
          width: 100%;
          padding: 14px;
          background-color: #0A2463;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .login-button:hover {
          background-color: #3E92CC;
          transform: translateY(-2px);
        }

        .login-footer {
          margin-top: 24px;
          font-size: 14px;
          color: #6c757d;
        }

        .login-footer a {
          color: #FB3640;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .login-footer a:hover {
          color: #0A2463;
        }
      `}</style>
    </div>
    </>
  );
}

export default Login;
