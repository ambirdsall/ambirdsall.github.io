import React from "react"

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
  },
  textBlock: {
    padding: "1em",
  },
  title: {
    fontSize: "6rem",
    fontStyle: "italic",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.5rem",
    fontStyle: "italic",
    opacity: 0.6,
    marginTop: "0.5em",
  },
}

const Fin = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textBlock}>
        <h1 style={styles.title}>Fin</h1>
      </div>
      <style>{`
        body {
          margin: 0;
          font-family: 'Georgia', serif;
          background-color: black;
        }
      `}</style>
    </div>
  )
}

export default Fin
