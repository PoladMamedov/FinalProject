import "./preLoader.scss";
import { Dna } from "react-loader-spinner";

function Notification() {
  return (
    <div className="loader-wrapper">
      <Dna height="200" width="200" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="" />
    </div>
  );
}

export default Notification;
