export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  fullWidth = false,
  disabled = false,
  type = "button",
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    fontFamily: "var(--sans)",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.22s ease",
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
  };

  const sizes = {
    sm: { padding: "9px 20px",  fontSize: "10px" },
    md: { padding: "13px 30px", fontSize: "11px" },
    lg: { padding: "17px 42px", fontSize: "12px" },
  };

  const variants = {
    primary: {
      background: "var(--green)",
      color: "var(--white)",
    },
    secondary: {
      background: "transparent",
      color: "var(--green)",
      border: "1px solid var(--green)",
    },
    ghost: {
      background: "transparent",
      color: "var(--white)",
      border: "1px solid rgba(255,255,255,0.4)",
    },
    dark: {
      background: "var(--charcoal)",
      color: "var(--white)",
    },
    white: {
      background: "var(--white)",
      color: "var(--green)",
    },
  };

  const handleHover = (e, enter) => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = enter ? "var(--green-mid)" : "var(--green)";
    if (variant === "secondary") e.currentTarget.style.background = enter ? "rgba(30,75,50,0.06)" : "transparent";
    if (variant === "ghost") e.currentTarget.style.background = enter ? "rgba(255,255,255,0.1)" : "transparent";
    if (variant === "dark") e.currentTarget.style.background = enter ? "#444" : "var(--charcoal)";
    if (variant === "white") e.currentTarget.style.background = enter ? "var(--beige-deep)" : "var(--white)";
  };

  return (
    <button
      type={type}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </button>
  );
}