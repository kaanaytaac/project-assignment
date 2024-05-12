import { useEffect, useState } from "react";
import { dataService } from "../../services/api/Data";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const Reports = () => {
  const [reports, setReports] = useState<any>([]);
  const [doctors, setDoctors] = useState<any>([]);

  function handleDoctorChange(_id: string, value: any) {
    const newReports = reports.map((report: any, index: number) => {
      return report._id === _id ? { ...report, doctor: value._id } : report;
    });
    setReports(newReports);
  }
  function handleClick() {
    reports.map((report: any, index: number) => {
      dataService.patchData("66334cc6b7e10b002cce61e4", report._id, { ...report, user: report.user._id, clinic: report.clinic._id });
    });
  }

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
      <ul>
        {reports.map((report: any, index: number) => {
          return (
            <div key={index} style={{ display: "flex", gap: "4px" }}>
              <li>{report.user.fullname}</li>
              <li>{report.clinic.title}</li>
              <li style={{ color: "white" }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={doctors}
                  getOptionLabel={(option: any) => option.fullname}
                  onChange={(e: any, value) => handleDoctorChange(report._id, value)}
                  sx={{
                    color: "white",
                    width: 300,
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    ".MuiInput-underline:after": { outline: "none", border: 0 },
                  }}
                  style={{}}
                  renderInput={(params) => <TextField {...params} style={{ color: "white" }} label="Doktoru lutfen seciniz." />}
                />
              </li>
            </div>
          );
        })}
      </ul>
      <button onClick={handleClick}>Yukle</button>
    </div>
  );
};
export default Reports;
