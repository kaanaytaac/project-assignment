import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Tasks = () => {
  interface Clinic {
    label: string;
  }
  const clinics: Clinic[] = [
    { label: "Beyin ve Sinir Cerrahisi" },
    { label: "Çocuk Sağlığı ve Hastalıkları" },
    { label: "Enfeksiyon Hastalıkları" },
    { label: "Genel Cerrahi" },
    { label: "Göğüs Hastalıkları" },
    { label: "Kalp Damar Cerrahisi" },
    { label: "Kardiyoloji" },
  ];
  return (
    <>
      <div style={{ color: "white", background: "gray", width: "fit-content" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={clinics}
          sx={{ width: 300, ".MuiOutlinedInput-notchedOutline": { border: 0 }, ".MuiInput-underline:after": { outline: "none", border: 0 } }}
          style={{ color: "white" }}
          renderInput={(params) => <TextField {...params} style={{ color: "white" }} label="Kliniginizi lutfen seciniz." />}
        />
      </div>
    </>
  );
};
export default Tasks;
