import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import useCreateAccountStore from "../store/store";
import { useEffect } from "react";
import * as Bucket from "@spica-devkit/bucket";

const Root = () => {
  const { users, setUsers } = useCreateAccountStore();
  const getAll = async () => {
    try {
      const data: { [key: string]: any }[] = await Bucket.data.getAll("65ef137ca1ccd0002cea9989");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Root;
