
import { IoWallet } from "react-icons/io5";
import Popup from './Popup';
import { IoExit } from "react-icons/io5";
import useStore from "@/store/store";
 
const Navbar = ( { connectMetamask,connectWalletConnect, disconnectWallet} ) => {

    const { connected, showPopup, setShowPopup } = useStore()
    return (
      <>
        <nav className="flex justify-between w-full mb-8 py-2 bg-opacity-30 ">
          <div></div>
          {/* Desktop Navigation */}
          <div className="sm:flex md:mr-20">
            {connected ? (
              <>
                <button
                  onClick={disconnectWallet}
                  className="hover:cursor-pointer bg-[#08ABF4] hover:bg-blue-400 text-black font-bold py-2 px-4 mx-10 border-b-4 border-blue-700 hover:border-blue-500 rounded flex-row cursor-pointer"
                >
                  <p className="flex items-center">
                    Connected{" "}
                    <span className="m-1">
                      <IoExit />{" "}
                    </span>{" "}
                  </p>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowPopup((prev) => !prev)}
                className="hover:cursor-pointer hover:bg-slate-200 bg-blue-700 hover:text-black border-1 border-black text-white font-medium py-2 px-4 mx-10 hover:border-transparent rounded"
              >
                <p className="flex items-center">
                  <span className="m-1">
                    {" "}
                    <IoWallet />{" "}
                  </span>
                  Connect
                </p>
              </button>
            )}
          </div>
        </nav>

        <Popup showPopup={showPopup} setshowPopup={setShowPopup} connectMetamask={connectMetamask} connectWalletConnect={connectWalletConnect} />
      </>
    );
};

export default Navbar;