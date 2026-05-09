export default function Container({ children, style = {}, narrow = false }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: narrow ? "860px" : "1320px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(20px, 5vw, 72px)",
        paddingRight: "clamp(20px, 5vw, 72px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}