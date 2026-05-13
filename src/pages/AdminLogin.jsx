import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import Button from "../components/common/Button";
import Container from "../components/common/Container";

export default function AdminLogin({ navigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (login(username, password)) {
        navigate("admin");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <style>{`
        .admin-login {
          margin-top: 72px;
          min-height: calc(100vh - 72px);
          background: linear-gradient(135deg, var(--green) 0%, var(--charcoal) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .admin-login__card {
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 48px;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          max-width: 420px;
          width: 100%;
          animation: fadeUp 0.6s var(--ease-out) both;
        }
        .admin-login__title {
          font-family: var(--serif);
          font-size: 32px;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 8px;
          text-align: center;
        }
        .admin-login__sub {
          font-size: 13px;
          color: var(--muted);
          text-align: center;
          margin-bottom: 32px;
        }
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          font-family: var(--sans);
        }
        .form-group input {
          padding: 13px 16px;
          border: 1px solid var(--beige-dark);
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          font-family: var(--sans);
          font-size: 14px;
          color: var(--charcoal);
          outline: none;
          transition: border-color 0.25s;
        }
        .form-group input:focus {
          border-color: var(--green);
          background: var(--white);
        }
        .admin-login__error {
          background: rgba(192, 57, 43, 0.1);
          border: 1px solid #c0392b;
          color: #c0392b;
          padding: 12px 16px;
          font-size: 12px;
          border-radius: 4px;
          animation: fadeUp 0.3s ease-out both;
        }
      `}</style>

      <div className="admin-login">
        <div className="admin-login__card">
          <h1 className="admin-login__title">Admin Access</h1>
          <p className="admin-login__sub">LAREJI Store Management</p>

          <form className="admin-form" onSubmit={handleSubmit}>
            {error && <div className="admin-login__error">{error}</div>}

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 24, textAlign: "center" }}>
  Contact your administrator for access credentials
</p>
        </div>
      </div>
    </>
  );
}