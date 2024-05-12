import { create } from "zustand";
type TenteredValue = {
  name: string;
  email: string;
  password: string;
};
interface State {
  users: { [key: string]: any }[];
  setUsers: (newUsers: { [key: string]: any }[]) => void;
  enteredValues: TenteredValue;
  setEnteredValues: (state: TenteredValue) => void;
  verificationNumber: string;
  setVerificationNumber: (state: string) => void;
  currentUser: { [key: string]: any };
  setCurrentUser: (currentUser: { [key: string]: any }) => void;
}

const useCreateAccountStore = create<State>((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),
  enteredValues: { name: "", email: "", password: "" },
  setEnteredValues: (state: TenteredValue) => set({ enteredValues: state }),
  verificationNumber: "",
  setVerificationNumber: (state: string) => set({ verificationNumber: state }),
  currentUser: {},
  setCurrentUser: (state: { [key: string]: any }) => set({ currentUser: state }),
}));

export default useCreateAccountStore;
