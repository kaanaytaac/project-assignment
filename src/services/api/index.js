import axios from "axios";

export function login(signInData) {
  const config = {
    ...signInData,
    method: "post",
    url: "https://bitirme-kaan-92896.hq.spicaengine.com/api/fn-execute/login",
  };
  axiosWriteValidator(config);
  axiosReadValidator(config);
  return axios.request(config).then((r) => r.data);
}

export function registration(signUpData) {
  const config = {
    ...signUpData,
    method: "post",
    url: "https://bitirme-kaan-92896.hq.spicaengine.com/api/fn-execute/registration",
  };
  axiosWriteValidator(config);
  axiosReadValidator(config);
  return axios.request(config).then((r) => r.data);
}

// This statement has been deleted.
function axiosWriteValidator(config) {
  if (["post", "put", "patch"].includes(config.method) && !config.data) {
    console.warn(
      "Sending empty request body for post, put, patch requests is unusual. If it's not intented, please use config.data or update your spica function."
    );
  }
}
function axiosReadValidator(config) {
  if (["get", "delete", "trace", "options", "head"].includes(config.method) && config.data) {
    console.warn(
      "Sending request body for get, delete, trace, options, head requests is unusual. If it's not intented, please remove config.data or update your spica function."
    );
  }
}
