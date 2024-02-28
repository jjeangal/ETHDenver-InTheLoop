import { RegisterStepsProps } from "../../services/interfaces";
import { compareSvg, songInfoSvg, uploadSvg, validSvg } from "../Svgs";

export const RegisterSteps: React.FC<RegisterStepsProps> = ({ state }) => {
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mb-10 ms-6">
        {state > 0 ? validSvg : compareSvg}
        <h3 className="font-medium leading-tight">Compare</h3>
        <p className="text-sm">Choose song file</p>
      </li>
      <li className="mb-10 ms-6">
        {state > 1 ? validSvg : uploadSvg}
        <h3 className="font-medium leading-tight">Upload</h3>
        <p className="text-sm">Upload song information</p>
      </li>
      <li className="mb-10 ms-6">
        {state > 2 ? validSvg : songInfoSvg}
        <h3 className="font-medium leading-tight">Review</h3>
        <p className="text-sm">Review uploaded song</p>
      </li>
    </ol>
  );
};
