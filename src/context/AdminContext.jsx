import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Check if admin is logged in
    const stored = localStorage.getItem("lareji_admin");
    if (stored) {
      const data = JSON.parse(stored);
      setAdminUser(data);
      setIsAdmin(true);
    }
  }, []);

  const login = (username, password) => {
    // Simple hardcoded auth (replace with backend later)
    const ADMIN_CREDENTIALS = {
      username: "admin",
      password: "lareji2024", // Change this!
    };

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminData = { username, loginTime: new Date() };
      localStorage.setItem("lareji_admin", JSON.stringify(adminData));
      setAdminUser(adminData);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("lareji_admin");
    setAdminUser(null);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminUser, login, logout }}>  
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be inside AdminProvider");
  return ctx;
};