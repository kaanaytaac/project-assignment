import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import * as Storage from "@spica-devkit/storage";
import { FcCheckmark } from "react-icons/fc";
import styles from "./Upload.module.css";
import Spinner from "../../components/Spinner";
import useCreateAccountStore from "../../store/store";
import { dataService } from "../../services/api/Data";
const Upload = () => {
  const { users, currentUser } = useCreateAccountStore();
  const [selectedClinic, setSelectedClinic] = useState<{ [key: string]: any }>({});
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [initialUpload, setInitialUploaded] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  const [clinics, setClinics] = useState<any[]>([]);
  console.log(users);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploaded(false);
    const selectedFile: File | undefined = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    const renamedSelectedFile = new File([selectedFile], `Pdf/${selectedFile.name}`, {
      type: selectedFile.type,
      lastModified: selectedFile.lastModified,
    });

    setFile(renamedSelectedFile);
    console.log(renamedSelectedFile);
  };

  function handleFile() {
    Storage.initialize({
      apikey: "a1gr18ltn1izj2",
      publicUrl: "https://bitirme-kaan-92896.hq.spicaengine.com/api",
    });
    if (file === undefined) {
      alert("Lutfen bir dosya seciniz");
      return;
    }
    setInitialUploaded(true);
    Storage.insert(file, (progress) => {
      const loadedPercentage = (progress.loaded / progress.total) * 100;
      if (loadedPercentage === 100) {
        setUploaded(true);
        setInitialUploaded(false);
      }
      console.log(`Upload progress: %${loadedPercentage}`);
    })
      .then((res) => {
        console.log(res);
        dataService.insertData("66334cc6b7e10b002cce61e4", { report: res.url, user: currentUser._id, clinic: selectedClinic._id });
      })
      .catch((err) => console.log(err));
  }

  const handleClinicChange = (event: React.SyntheticEvent<Element, Event>, value: { [key: string]: any }) => {
    setSelectedClinic(value);
  };
  console.log(selectedClinic);
  useEffect(() => {
    dataService
      .getDataAll("6640a94ab7e10b002cce65c3")
      .then((data) => {
        setClinics(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div style={{ color: "white", background: "gray", width: "fit-content" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className={styles.mui}
          options={clinics}
          getOptionLabel={(option) => option.title}
          onChange={handleClinicChange}
          sx={{ width: 300, ".MuiOutlinedInput-notchedOutline": { border: 0 }, ".MuiInput-underline:after": { outline: "none", border: 0 } }}
          style={{ color: "white" }}
          renderInput={(params) => <TextField {...params} style={{ color: "white" }} label="Kliniginizi lutfen seciniz." />}
        />
      </div>
      <div>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <div style={{ display: "inline-block" }}>{initialUpload ? <Spinner /> : uploaded ? <FcCheckmark /> : undefined}</div>
      </div>
      {selectedClinic ? (
        <button style={{ marginTop: "1rem" }} onClick={handleFile}>
          yukle
        </button>
      ) : undefined}
    </>
  );
};
export default Upload;

// const logOut = async () => {
//   instantStore.setIsLoading(true);
//   pageStore.setPage(defaultPage);
//   authService.logOut();
//   authStore.setSignedIn(false);
//   instantStore.setIsLoading(false);
//   navigate("/login");
// };
