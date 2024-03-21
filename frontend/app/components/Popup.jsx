import useStore from "@/store/store";
import { IoIosClose } from "react-icons/io";
import Image from 'next/image';
import { SiWalletconnect } from "react-icons/si";


const Popup = ({ connectMetamask, connectWalletConnect }) => {

  const { connected,showPopup,setShowPopup } = useStore();
  
  return (
    showPopup &&
    !connected && (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        onClick={() => setShowPopup(false)}
      >
        <div className="absolute w-full h-full bg-black opacity-80"></div>
        <div
          className="relative flex flex-col items-start justify-center bg-[#080404] border-2 border-gray-400 p-4 md:w-1/4 w-3/4 md:h-60 h-auto rounded-lg z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-white font-bold text-4xl hover:text-red-200"
            onClick={() => setShowPopup(false)}
          >
            <IoIosClose />
          </button>
          <div className="w-full mb-4">
            <p className="font-mono font-bold text-slate-50 text-white">
              Choose wallet to connect.
            </p>
          </div>
          <div className="w-full flex flex-col py-2 rounded">
            <button
              id="injected"
              onClick={connectMetamask}
              className="cursor-pointer hover:bg-slate-200 flex justify-start items-center p-2 rounded my-2 bg-white font-mono"
            >
              <Image
                src="/metamask.svg"
                alt="Metamask"
                width={20}
                height={20}
                className="mr-2"
              />
              Metamask
            </button>

            <button
              onClick={connectWalletConnect}
              className="cursor-pointer hover:bg-slate-200 flex justify-start items-center p-2 rounded my-2 bg-white font-mono"
            >
              <SiWalletconnect className="text-blue-500 mr-2" />
              Wallet Connect
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;