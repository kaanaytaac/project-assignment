import { useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import { dataService } from "../../services/api/Data";
import useCreateAccountStore from "../../store/store";

const Tasks = () => {
  const [reports, setReports] = useState<any>([]);
  const { currentUser } = useCreateAccountStore();
  useEffect(() => {
    dataService.getDataAll("66334cc6b7e10b002cce61e4", { relation: true, filter: { doctor: { "$eq": currentUser._id } } }).then((data) => {
      setReports(data);
    });
  }, []);
  return (
    <div>
      {reports.map((report: any, index: number) => {
        return (
          <div>
            {report.user.fullname}, <a href={report.report}>Indir</a>
          </div>
        );
      })}
    </div>
  );
};
export default Tasks;
