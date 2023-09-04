const { PuffLoader } = require("react-spinners");

function Spinner() {
  return <PuffLoader color={"var(--primary-color)"} speedMultiplier={2} />;
}

export default Spinner;
