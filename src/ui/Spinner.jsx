function Spinner() {
  return (
    <div
      id="loaderWrapper"
      className="absolute inset-0 z-100 flex flex-col items-center justify-center bg-slate-600/30 backdrop-blur-sm"
    >
      <div className="loader"></div>
      <div className="text-sky-50">Loading data...</div>
    </div>
  );
}

export default Spinner;
