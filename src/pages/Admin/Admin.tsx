import { useEffect, useState } from "react";
import { dataService } from "../../services/api/Data";
import useCreateAccountStore from "../../store/store";
import Switch from "@mui/material/Switch";

const Admin = () => {
  const bucketID = "65ef137ca1ccd0002cea9989";
  const [users, setUsers] = useState<any>([]);

  function handleChange(email: string) {
    const newUserState = users.map((user: any) => {
      if (user.email === email) {
        dataService.patchData(bucketID, user._id, { ispassive: !user.ispassive });
        return { ...user, ispassive: !user.ispassive };
      }
      return user;
    });
    setUsers(newUserState);
  }

  useEffect(() => {
    dataService.getDataAll(bucketID).then((userArray: any) => {
      setUsers(userArray);
    });
  }, []);
  return (
    <div>
      {users
        .filter((user: any) => user.role !== "admin")
        .map((user: any, index: number) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }} key={index}>
              <li>{user.fullname}</li>
              <Switch onChange={() => handleChange(user.email)} checked={!user?.ispassive} />
            </div>
          );
        })}
    </div>
  );
};
export default Admin;
