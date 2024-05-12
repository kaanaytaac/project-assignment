import * as Bucket from "@spica-devkit/bucket";

class DataService {
  constructor() {
    Bucket.initialize({
      apikey: "a1gr18ltn1izj2",
      publicUrl: "https://bitirme-kaan-92896.hq.spicaengine.com/api",
    });
  }

  getData = async (bucketId: string, bucketDataId: string) => {
    return Bucket.data.get(bucketId, bucketDataId);
  };

  getDataAll = async (bucketId: string, queryParams?: { [key: string]: any }) => {
    return Bucket.data.getAll(bucketId, { queryParams });
  };

  insertData = async (bucketId: string, document: { [key: string]: any }) => {
    return Bucket.data.insert(bucketId, document);
  };

  patchData = async (bucketId: string, bucketDataId: string, updatedData: { [key: string]: any }) => {
    return Bucket.data.patch(bucketId, bucketDataId, updatedData);
  };

  removeData = async (bucketId: string, bucketDataId: string) => {
    return Bucket.data.remove(bucketId, bucketDataId);
  };
}

export const dataService = new DataService();
// useEffect(() => {
//   Bucket.initialize({
//     publicUrl: "https://bitirme-kaan-92896.hq.spicaengine.com/api",
//     apikey: "a1gr18ltn1izj2",
//   }); // initialize ettik -- kontrol ediliyor
// }, []);
// / new bucket create

//   useEffect(() => {
//     Bucket.initialize({
//       publicUrl: "https://bitirme-kaan-92896.hq.spicaengine.com/api",
//       apikey: "a1gr18ltn1izj2",
//     }); // initialize ettik -- kontrol ediliyor
//   }, []);

//   // delete data
//   function removeItem() {
//     return Bucket.data.remove(
//       "65ef137ca1ccd0002cea9989",
//       "65f7eb01a1ccd0002cea9b9a"
//     );
//   }

//   // data insert
//   function handleClick() {
//     let document = {
//       title: "hello",
//       description: "hello",
//     };

//     Bucket.data.insert("65ef137ca1ccd0002cea9989", document);
//   }
//   // get single data
//   async function getData() {
//     const change = await Bucket.data.get(
//       "65ef137ca1ccd0002cea9989",
//       "65f7eb01a1ccd0002cea9b9a"
//     );
//     console.log(change);
//   }
//   // gettin all data
//   function getAll() {
//     Bucket.data
//       .getAll("65ef137ca1ccd0002cea9989")
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err));
//   }
//   // gettin all data

//   // data patching
//   function enough() {
//     let document = {
//       title: "i have changed",
//     };
//     return Bucket.data.patch(
//       "65ef137ca1ccd0002cea9989",
//       "65f7eb01a1ccd0002cea9b9a",
//       document
//     ); //ilki bucket id patching
//   }
//   // data patching
