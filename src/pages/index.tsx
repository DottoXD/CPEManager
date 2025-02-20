import { MdFilledTextField, MdOutlinedTextField } from "@/components/TextField";
import { MdElevatedButton, MdFilledButton } from "@/components/Buttons";

import Style from "@/styles/Index.module.css";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import cryptojs from "crypto-js";
import axios from "axios";
import { MdCheckbox } from "@/components/Checkbox";
import { useState } from "react";
import { MdBrandedFab, MdFab } from "@/components/Fab";
import { MdChipSet } from "@/components/Chip";
import {
  MdFilledSelect,
  MdOutlinedSelect,
  MdSelectOption,
} from "@/components/Select";
import { MdIcon } from "@/components/Icon";
import { MdBugReport, MdLogin, MdQuestionMark } from "react-icons/md";

export default function Index() {
  const [passwordInput, setPasswordInput] = useState(
    <MdOutlinedTextField id="password" label="Password" type="password" />,
  );

  const router = useRouter();

  const login = async () => {
    const pass = (document.getElementById("password") as HTMLInputElement)
      ?.value;
    const remember = (document.getElementById("checkbox") as HTMLInputElement)
      ?.value;

    try {
      await axios({
        url: "/api/getCookie",
        method: "POST",
        data: { pass },
      }).then(() => {
        const session = getCookie("session");

        if (session) {
          if (remember == "on")
            setCookie("token", cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(pass)), {
              maxAge: 60 * 60 * 24 * 365,
            });
          else setCookie("token", cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(pass)));

          router.push("/manager");
        } else {
          setPasswordInput(
            <MdOutlinedTextField
              id="password"
              label="Password"
              error={true}
              errorText="Invalid session token."
              type="password"
            />,
          );
        }
      });
    } catch (err: any) {
      console.log(err);
      setPasswordInput(
        <MdOutlinedTextField
          id="password"
          label="Password"
          error={true}
          errorText={"Login failed: " + err.response.data.result}
          type="password"
        />,
      );
    }
  };

  return (
    <main>
      <div className={Style.loginForm}>
        <h1>CPEManager</h1>
        <MdOutlinedSelect label="Select your CPE">
          <MdSelectOption>ZTE - MF289F</MdSelectOption>
          <MdSelectOption>ZTE - MC801A/MC7010</MdSelectOption>
          <MdSelectOption>ZTE - MC888/MC889</MdSelectOption>
        </MdOutlinedSelect>
        <br />
        {passwordInput}
        <p>
          <MdCheckbox id="checkbox" touch-target="wrapper"></MdCheckbox>
          Remember password
        </p>
        <MdFilledButton onClick={login}><MdLogin/>Login</MdFilledButton>
      </div>
      <div className={Style.fab}>
        <MdFab label="Report a bug">
          <MdIcon slot="icon">
            <MdBugReport />
          </MdIcon>
        </MdFab>
      </div>
    </main>
  );
}

export async function getServerSideProps(Context: GetServerSidePropsContext) {
  const session = Context.req.cookies.session;
  const token = Context.req.cookies.token;

  if (session) {
    let res = await axios({
      url: "http://localhost:3000/api/getData",
      method: "GET",
      headers: {
        cookie: session,
      },
    });
    const parsedRes = await res.data;

    if (parsedRes.wan_apn != null && parsedRes.wan_apn != "") {
      return {
        redirect: {
          destination: "/manager",
          permanent: false,
        },
      };
    } else {
      deleteCookie("session", {
        req: Context.req,
        res: Context.res,
      });
      deleteCookie("token", {
        req: Context.req,
        res: Context.res,
      });

      return {
        props: {},
      };
    }
  } else {
    return {
      props: {},
    };
  }
}
