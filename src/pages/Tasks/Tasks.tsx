// import { useEffect, useState } from "react";
// import styles from "./Tasks.module.css";
// import { dataService } from "../../services/api/Data";
// import useCreateAccountStore from "../../store/store";

// const Tasks = () => {
//   const [reports, setReports] = useState<any>([]);
//   const { currentUser } = useCreateAccountStore();

//   useEffect(() => {
//     dataService.getDataAll("66334cc6b7e10b002cce61e4", { relation: true, filter: { doctor: { "$eq": currentUser._id } } }).then((data) => {
//       setReports(data);
//     });
//   }, []);

//   return (
//     <div>
//       {reports.map((report: any, index: number) => {
//         return (
//           <>
//             <div key={index}>
//               {report.user.fullname}, <a href={report.report}>Indir</a>
//             </div>
//           </>
//         );
//       })}
//     </div>
//   );
// };
// export default Tasks;

import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import styles from "./Tasks.module.css";
import { dataService } from "../../services/api/Data";
import useCreateAccountStore from "../../store/store";
import Modal from "../../components/Modal/Modal";

const Tasks = () => {
  const [reports, setReports] = useState<any[]>([]);
  // const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { currentUser } = useCreateAccountStore();

  const { selectedReport, setSelectedReport } = useCreateAccountStore();
  useEffect(() => {
    dataService
      .getDataAll("66334cc6b7e10b002cce61e4", {
        relation: true,
        filter: { doctor: { $eq: currentUser._id } },
      })
      .then((data) => {
        setReports(data);
      });
  }, [currentUser]);

  const openModal = (report: string) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div>
      {reports.map((report: any, index: number) => (
        <div key={index}>
          <h3>{report.user.fullname}</h3>
          <button onClick={() => openModal(report.report)}>View PDF</button>
        </div>
      ))}
      {selectedReport && (
        <Modal open={!!selectedReport} onClose={closeModal}>
          <div style={{ height: "50vh", width: "50vw" }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={selectedReport} />
            </Worker>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Tasks;
