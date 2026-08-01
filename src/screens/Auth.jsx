import React, { useState } from "react";
import { Mail, Lock, User, LogIn } from "lucide-react";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("demo@readai.app");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setErrorMsg("");
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Load registered accounts from localStorage
      const savedAccountsStr = localStorage.getItem("readai_registered_accounts");
      const accounts = savedAccountsStr ? JSON.parse(savedAccountsStr) : [];

      if (isLogin) {
        // SIGN IN MODE
        // Check if account exists
        const matchedAccount = accounts.find(
          acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );

        if (matchedAccount) {
          // Found registered account
          onLogin({
            name: matchedAccount.name,
            email: matchedAccount.email,
            isPremium: matchedAccount.isPremium
          });
        } else {
          // If not in registered accounts, check if it's the demo account
          if (email === "demo@readai.app" && password === "password123") {
            onLogin({
              name: "Alex Carter",
              email: "demo@readai.app",
              isPremium: false
            });
          } else {
            // Dynamic Name Extraction from Email (smart fallback)
            const emailPrefix = email.split("@")[0];
            const derivedName = emailPrefix
              .split(/[\._\-+]/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            onLogin({
              name: derivedName,
              email: email,
              isPremium: false
            });
          }
        }
      } else {
        // SIGN UP / REGISTER MODE
        if (!name.trim()) {
          setErrorMsg("Please enter your name");
          return;
        }

        // Check if email already registered
        const emailExists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          setErrorMsg("Email is already registered. Please login.");
          setIsLogin(true);
          return;
        }

        // Create new account object
        const newAccount = {
          name: name.trim(),
          email: email.toLowerCase(),
          password: password,
          isPremium: false
        };

        // Save account to registration database
        accounts.push(newAccount);
        localStorage.setItem("readai_registered_accounts", JSON.stringify(accounts));

        // Log in user
        onLogin({
          name: newAccount.name,
          email: newAccount.email,
          isPremium: false
        });
      }
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: "Google Reader",
        email: "google.reader@gmail.com",
        isPremium: true
      });
    }, 1200);
  };

  return (
    <div className="auth-screen animate-fade-in">
      <div className="auth-header">
        <div className="auth-logo">📖</div>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p>{isLogin ? "Log in to access your digital books and AI narration" : "Sign up to begin your smart reading journey"}</p>
      </div>

      {errorMsg && (
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          border: "1px solid #ef4444",
          color: "#ef4444",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "12px",
          marginBottom: "16px",
          textAlign: "center"
        }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={16} className="text-muted" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={{ paddingLeft: "42px", width: "100%" }}
                required 
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Email Address</label>
          <div style={{ position: "relative" }}>
            <Mail size={16} className="text-muted" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="email" 
              className="form-input" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ paddingLeft: "42px", width: "100%" }}
              required 
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <Lock size={16} className="text-muted" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ paddingLeft: "42px", width: "100%" }}
              required 
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ height: "46px" }}>
          {loading ? (
            <span className="spinner">Connecting...</span>
          ) : (
            <>
              <span>{isLogin ? "Sign In" : "Register & Start"}</span>
              <LogIn size={16} />
            </>
          )}
        </button>
      </form>

      <div className="divider">or continue with</div>

      <button className="google-auth-btn" onClick={handleGoogleSignIn} disabled={loading} style={{ width: "100%" }}>
        <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: "16px", height: "16px" }} />
        <span>Google Authentication</span>
      </button>

      <div className="auth-footer">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => {
          setIsLogin(!isLogin);
          setErrorMsg("");
        }}>
          {isLogin ? "Sign Up" : "Log In"}
        </span>
      </div>
    </div>
  );
}
