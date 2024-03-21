import { create } from 'zustand';

const useStore = create((set) => ({
    connected: false,
    userAddress: '',
    isOwner: false,
    showTansaction: false,
    buttonSelected: "walletconnect",
    showPopup: false,
    setConnected: (value) => set(state => ({ connected: value})),
    setUserAddress: (value) => set(state => ({ userAddress: value})),
    setIsOwner: (value) => set(state => ({ isOwner: value })),
    setShowTansaction: (value) => set(state => ({ showTansaction: value })),
    setButtonSelected: (value) => set(state => ({ buttonSelected: value})),
    setShowPopup: status => set({ showPopup: status }),
}));

export default useStore;
