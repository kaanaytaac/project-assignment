// import { useEffect, useState } from "react";
// import { dataService } from "../../services/api/Data";
// import Autocomplete from "@mui/material/Autocomplete";
// import { TextField } from "@mui/material";
// import useCreateAccountStore from "../../store/store";
// import Modal from "../../components/Modal/Modal";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css"; // Import default styles
// import Spinner from "../../components/Spinner";

// const Reports = () => {
//   const [reports, setReports] = useState<any[]>([]);
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [selectedDoctors, setSelectedDoctors] = useState<any>({});
//   const { selectedReport, setSelectedReport } = useCreateAccountStore();

//   // Function to handle doctor change
//   const handleDoctorChange = (_id: string, value: any) => {
//     const newReports = reports.map((report) => (report._id === _id ? { ...report, doctor: value ? value._id : null } : report));
//     setReports(newReports);
//     setSelectedDoctors((prevState: any) => ({
//       ...prevState,
//       [_id]: value ? value._id : null,
//     }));
//   };

//   // Function to handle click event
//   const handleClick = () => {
//     reports.forEach((report) => {
//       dataService.patchData("66334cc6b7e10b002cce61e4", report._id, { ...report, user: report.user._id, clinic: report.clinic._id });
//     });
//   };

//   // Function to open the modal with the selected report
//   const openPdfModal = (reportUrl: string) => {
//     setSelectedReport(reportUrl);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setSelectedReport(null);
//   };

//   // Effect to fetch reports and doctors data
//   useEffect(() => {
//     dataService
//       .getDataAll("66334cc6b7e10b002cce61e4", { relation: true })
//       .then((data) => {
//         setReports(data);
//       })
//       .catch((err) => console.log(err));

//     dataService
//       .getDataAll("65ef137ca1ccd0002cea9989", { filter: { role: { "$eq": "doctor" } } })
//       .then((doc) => {
//         setDoctors(doc);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", marginBottom: "10px", fontWeight: "bold" }}>
//         <div>Name</div>
//         <div>Clinic</div>
//         <div>Doctor</div>
//         <div>PDF</div>
//       </div>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {reports.map((report: any, index: number) => (
//           <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", alignItems: "center", marginBottom: "8px" }}>
//             <li>{report.user.fullname}</li>
//             <li>{report.clinic.title}</li>
//             <li>
//               <Autocomplete
//                 disablePortal
//                 id="combo-box-demo"
//                 options={doctors}
//                 getOptionLabel={(option: any) => option.fullname}
//                 onChange={(e: any, value) => handleDoctorChange(report._id, value)}
//                 sx={{
//                   width: 300,
//                   "& .MuiOutlinedInput-root": {
//                     color: "gray",
//                     "& fieldset": {
//                       borderColor: "gray",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "lightgray",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "darkgray",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "gray",
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": {
//                     color: "darkgray",
//                   },
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={!selectedDoctors[report._id] ? "Doktoru lutfen seciniz." : ""}
//                     InputLabelProps={{
//                       style: { color: "gray" },
//                     }}
//                     inputProps={{
//                       ...params.inputProps,
//                       style: { color: "gray" },
//                     }}
//                   />
//                 )}
//               />
//             </li>
//             <li>
//               <button onClick={() => openPdfModal(report.report)}>View PDF</button>
//             </li>
//           </div>
//         ))}
//       </ul>

//       {selectedReport && (
//         <Modal open={!!selectedReport} onClose={closeModal}>
//           <div style={{ height: "50vh", width: "50vw" }}>
//             <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//               <Viewer fileUrl={selectedReport as string} />
//             </Worker>
//           </div>
//         </Modal>
//       )}
//       <button onClick={handleClick}>Yukle</button>
//     </div>
//   );
// };

// export default Reports;

import { useEffect, useState } from "react";
import { dataService } from "../../services/api/Data";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import useCreateAccountStore from "../../store/store";
import Modal from "../../components/Modal/Modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import default styles
import Spinner from "../../components/Spinner"; // Assuming you have a Spinner component
import { FcCheckmark } from "react-icons/fc";

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctors, setSelectedDoctors] = useState<any>({});
  const { selectedReport, setSelectedReport } = useCreateAccountStore();
  const [loading, setLoading] = useState(false); // Loading state
  const [completed, setCompleted] = useState(false); // Completion state

  // Function to handle doctor change
  const handleDoctorChange = (_id: string, value: any) => {
    const newReports = reports.map((report) => (report._id === _id ? { ...report, doctor: value ? value._id : null } : report));
    setReports(newReports);
    setSelectedDoctors((prevState: any) => ({
      ...prevState,
      [_id]: value ? value._id : null,
    }));
  };

  // Function to handle click event
  const handleClick = async () => {
    setLoading(true); // Set loading to true
    try {
      for (const report of reports) {
        await dataService.patchData("66334cc6b7e10b002cce61e4", report._id, { ...report, user: report.user._id, clinic: report.clinic._id });
      }
      setCompleted(true); // Set completed to true if successful
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to open the modal with the selected report
  const openPdfModal = (reportUrl: string) => {
    setSelectedReport(reportUrl);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedReport(null);
  };

  // Effect to fetch reports and doctors data
  useEffect(() => {
    dataService
      .getDataAll("66334cc6b7e10b002cce61e4", { relation: true })
      .then((data) => {
        setReports(data);
      })
      .catch((err) => console.log(err));

    dataService
      .getDataAll("65ef137ca1ccd0002cea9989", { filter: { role: { "$eq": "doctor" } } })
      .then((doc) => {
        setDoctors(doc);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", marginBottom: "10px", fontWeight: "bold" }}>
        <div>Name</div>
        <div>Clinic</div>
        <div>Doctor</div>
        <div>PDF</div>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {reports.map((report: any, index: number) => (
          <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", alignItems: "center", marginBottom: "8px" }}>
            <li>{report.user.fullname}</li>
            <li>{report.clinic.title}</li>
            <li>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={doctors}
                getOptionLabel={(option: any) => option.fullname}
                onChange={(e: any, value) => handleDoctorChange(report._id, value)}
                sx={{
                  width: 300,
                  "& .MuiOutlinedInput-root": {
                    color: "gray",
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "lightgray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "darkgray",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "darkgray",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={!selectedDoctors[report._id] ? "Doktoru lutfen seciniz." : ""}
                    InputLabelProps={{
                      style: { color: "gray" },
                    }}
                    inputProps={{
                      ...params.inputProps,
                      style: { color: "gray" },
                    }}
                  />
                )}
              />
            </li>
            <li>
              <button onClick={() => openPdfModal(report.report)}>View PDF</button>
            </li>
          </div>
        ))}
      </ul>

      {selectedReport && (
        <Modal open={!!selectedReport} onClose={closeModal}>
          <div style={{ height: "50vh", width: "50vw" }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={selectedReport as string} />
            </Worker>
          </div>
        </Modal>
      )}

      <button onClick={handleClick} disabled={loading || completed}>
        {loading ? <Spinner /> : completed ? <FcCheckmark /> : "Yukle"}
      </button>
    </div>
  );
};

export default Reports;
