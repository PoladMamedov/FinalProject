import { Dna } from "react-loader-spinner";

function PreLoader({ fillScreen }) {
  return (
    <div className={fillScreen ? "loader-wrapper fill-screen" : "loader-wrapper"}>
      <Dna height="200" width="200" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="" />
    </div>
  );
}

export default PreLoader;
