// src/utils/auth.js

// ✅ Check if user is logged in
export function isAuthenticated() {
    return !!localStorage.getItem('token');
  }
  

  