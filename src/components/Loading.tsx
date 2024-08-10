import { ImSpinner6 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ImSpinner6 className="animate-spin text-blue-500" size={30} />
    </div>
  );
};

export default Loading;
