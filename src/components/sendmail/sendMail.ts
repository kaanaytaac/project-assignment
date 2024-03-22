import axios from "axios";

export async function sendMail(userEmail: string, verificationCode: string) {
  const data = {
    user: "hospitalassignmentproject@gmail.com",
    pass: "gvep ebyj jwfp kxif",
    to: userEmail,
    title: "Verification",
    text: `Your verification code is ${verificationCode} `,
  };
  const config = {
    data,
    method: "post",
    url: "https://bitirme-kaan-92896.hq.spicaengine.com/api/fn-execute/sendmail",
  };
  return axios.request(config as any).catch((e) => console.log("email verification went wrong!", e));
}
