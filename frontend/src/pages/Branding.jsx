function Branding() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));

  return (
    <div style={{ padding: 40 }}>
      <h2>Branding Options</h2>
      <p>(Will display 3 AI-generated branding directions)</p>

      <pre>{JSON.stringify(analysis, null, 2)}</pre>
    </div>
  );
}

export default Branding;
