import CoalNFT from "../../../generated/deployedContracts";
import { ReviewSongProps } from "../../services/interfaces";

export const ReviewSong: React.FC<ReviewSongProps> = ({ id, txHash, metadata }) => {
  // Pinata
  const pinataGateway = "https://gateway.pinata.cloud/ipfs/";
  // Contract 
  const contract = CoalNFT[11155111][0].contracts.CoalNFT;

  const showCopyrights = () => {
    return "copyrights";
  };

  const contractCallInfo = () => {
    return (
      <div >
        <p> Song info: </p>
        <p> Id is: {String(id)} </p>
        <p>
          {" "}
          Metadata link:{" "}
          <a href={pinataGateway + metadata} target="_blank" rel="noopener noreferrer">
            {pinataGateway + metadata}
          </a>{" "}
        </p>
        <p> Transaction Hash: {txHash} </p>
        <p> Uses copyrights from songs: </p>
        {showCopyrights()}
      </div>
    );
  };

  return (
    <div>
      <h1>Review Song</h1>
      {contractCallInfo()}
    </div>
  );
};
