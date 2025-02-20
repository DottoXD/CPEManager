import Style from "@/styles/Manager.module.css";
import { deleteCookie, getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import cryptojs from "crypto-js";
import axios from "axios";
import { MdPrimaryTab, MdTabs } from "@/components/Tabs";
import { MdIcon, MdIconButton } from "@/components/Icon";

import {
  MdCellTower,
  MdDownload,
  MdHome,
  MdList,
  MdMoreVert,
  MdNetworkLocked,
  MdOutlineNetworkCell,
  MdQuestionMark,
  MdRefresh,
  MdSettings,
  MdUpload,
} from "react-icons/md";
import { MdFab } from "@/components/Fab";
import { MdRipple } from "@/components/Ripple";
import { MdTextButton } from "@/components/Buttons";
import { MdDialog } from "@/components/Dialog";
import { MdMenu, MdMenuItem } from "@/components/Menu";

export default function Manager() {
  const router = useRouter();
  let interval: NodeJS.Timeout;

  const [generalData, setGeneralData] = useState({
    provider: "",
    mcc: "",
    mnc: "",
    rx_thrp: "",
    tx_thrp: "",
    signalBars: "",
    cellId: "",
    eNB: "",
    cid: "",
  });

  const [nrData, setNrData] = useState({
    mainBand: {
      name: "",
      freq: "",
      pci: "",
      earfcn: "",
      sinr: "",
      rsrp: "",
      rsrq: "",
    },
  });

  const [lteData, setLteData] = useState({
    mainBand: {
      name: "",
      freq: "",
      pci: "",
      earfcn: "",
      sinr: "",
      rsrp: "",
      rsrq: "",
      rssi: "",
    },
    caBands: [],
  });

  const refreshHandler = () => {
    const cookie = getCookie("session");
    if (!cookie) {
      deleteCookie("session");
      router.push("/");
      if (interval) clearInterval(interval);
    } else updateData(cookie);
  };

  const formatBps = async (bps: number) => {
    let div = 0;
    let res;

    while (bps >= 1024) {
      bps = bps / 1024;
      div++;
    }

    bps = Math.round(bps * 10) / 10;

    switch (div) {
      case 1:
        res = bps + "Kbps";
        break;
      case 2:
        res = bps + "Mbps";
        break;
      case 3:
        res = bps + "Gbps";
        break;
      default:
        res = bps + "bps";
    }

    return res;
  };

  const updateData = async (cookie: string) => {
    const session = getCookie("session");
    const token = getCookie("token");

    if(!session) {
      deleteCookie("token");
      router.push("/");
      if (interval) clearInterval(interval);
    }

    let res = await axios({
      url: "/api/getData",
      method: "POST",
      headers: {
        cookie: cookie,
      },
    });
    let parsedRes = await res.data;

    if (!parsedRes.wan_apn || parsedRes.wan_apn == "") {
      const pass = cryptojs.enc.Utf8.stringify(cryptojs.enc.Base64.parse(
        token?.toString() ? token.toString() : "",
      ));
      console.log(pass)
      deleteCookie("session");
      await axios({
        url: "/api/getCookie",
        method: "POST",
        data: { pass },
      });
    }

    res = await axios({
      url: "/api/getData",
      method: "POST",
      headers: {
        cookie: getCookie("session"),
      },
    });

    parsedRes = await res.data;

    if (!parsedRes.wan_apn || parsedRes.wan_apn == "") {
      deleteCookie("session");
      router.push("/");
      if (interval) clearInterval(interval);
    } else {
      setGeneralData({
        provider: parsedRes.network_provider,
        mcc: parsedRes.mdm_mcc,
        mnc: parsedRes.mdm_mnc,
        rx_thrp: await formatBps(parsedRes.realtime_rx_thrpt * 8),
        tx_thrp: await formatBps(parsedRes.realtime_tx_thrpt * 8),
        signalBars: parsedRes.signalbar,
        cellId: parseInt(parsedRes.cell_id, 16).toString(),
        eNB: Math.floor(parseInt(parsedRes.cell_id, 16) / 256).toString(),
        cid: (parseInt(parsedRes.cell_id, 16) % 256).toString(),
      });

      setNrData({
        mainBand: {
          name: parsedRes.nr5g_action_band.replace("n", "N"),
          freq: "",
          pci: parseInt(parsedRes.nr5g_pci, 16).toString(),
          earfcn: parsedRes.nr5g_action_channel,
          sinr: parsedRes.Z5g_SINR,
          rsrp: parsedRes.Z5g_rsrp,
          rsrq: "",
        },
      });

      const caData: never[] = [];
      if (parsedRes.lte_multi_ca_scell_info != "") {
      } //todo

      setLteData({
        mainBand: {
          name: parsedRes.wan_active_band.replace("LTE BAND ", "B"),
          freq: "",
          pci: "",
          earfcn: parsedRes.wan_active_channel,
          sinr: parsedRes.lte_snr,
          rsrp: parsedRes.lte_rsrp,
          rsrq: parsedRes.lte_rsrq,
          rssi: parsedRes.lte_rssi,
        },
        caBands: caData,
      });
    }
  };

  useEffect(() => {
    const cookie = getCookie("session");
    if (!cookie) {
      deleteCookie("session");
      deleteCookie("token");
      router.push("/");
      if (interval) clearInterval(interval);
    } else {
      interval = setInterval(() => {
        updateData(cookie);
      }, 3000);
    }
  }, []);

  return (
    <main>
      <div className={Style.managerIndex}>
        <div className={Style.topCover} />
        <div className={Style.topBar}>
          <h1>{generalData.provider ? generalData.provider : "Unknown"}</h1>
          <MdIconButton>
            <MdIcon>
              <MdQuestionMark />
            </MdIcon>
          </MdIconButton>
          <MdIconButton id="usage-anchor">
            <MdIcon>
              <MdMoreVert />
            </MdIcon>
          </MdIconButton>
          <MdIconButton>
            <MdIcon>
              <MdList />
            </MdIcon>
          </MdIconButton>
        </div>
        <div className={Style.dataDisplay}>
          <div>
            <table>
              <tr>
                <td colSpan={2}>
                  <MdRipple />
                  <p>Cell Tower</p>
                  <h1>
                    <MdCellTower />
                    {generalData.cellId ? generalData.cellId : "Loading"}
                  </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <MdRipple />
                  <p>LTE Band</p>
                  <h1>
                    {lteData.mainBand.name ? lteData.mainBand.name : "No data"}
                  </h1>
                </td>
                <td>
                  <MdRipple />
                  <p>LTE RSRP</p>
                  <h1>
                    {lteData.mainBand.rsrp
                      ? lteData.mainBand.rsrp + "dBm"
                      : "No data"}
                  </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <MdRipple />
                  <p>LTE SNR</p>
                  <h1>
                    {lteData.mainBand.sinr
                      ? lteData.mainBand.sinr + "dB"
                      : "No data"}
                  </h1>
                </td>
                <td rowSpan={2}>
                  <MdRipple />
                  <p>DL Throughput</p>
                  <h1 className={Style.small}>
                    <MdDownload />
                    {generalData.rx_thrp ? generalData.rx_thrp : "0bps"}
                  </h1>
                  <p>UL Throughput</p>
                  <h1 className={Style.small}>
                    <MdUpload />
                    {generalData.tx_thrp ? generalData.tx_thrp : "0bps"}
                  </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <MdRipple />
                  <p>LTE CID</p>
                  <h1>{generalData.cid ? generalData.cid : "No data"}</h1>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <MdRipple />
                  <p>PLMN</p>
                  <h1>
                    <MdNetworkLocked />
                    {generalData.mcc && generalData.mnc
                      ? generalData.mcc + " " + generalData.mnc
                      : "No data"}
                  </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <MdRipple />
                  <p>NR Band</p>
                  <h1>
                    {nrData.mainBand.name ? nrData.mainBand.name : "No data"}
                  </h1>
                </td>
                <td>
                  <MdRipple />
                  <p>NR RSRP</p>
                  <h1>
                    {nrData.mainBand.rsrp
                      ? nrData.mainBand.rsrp + "dBm"
                      : "No data"}
                  </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <MdRipple />
                  <p>NR PCI</p>
                  <h1>
                    {nrData.mainBand.pci ? nrData.mainBand.pci : "No data"}
                  </h1>
                </td>
                <td>
                  <MdRipple />
                  <p>NR SNR</p>
                  <h1>
                    {nrData.mainBand.sinr
                      ? nrData.mainBand.sinr + "dB"
                      : "No data"}
                  </h1>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={Style.navBar}>
          <MdTabs>
            <MdPrimaryTab>
              <MdIcon slot="icon">
                <MdHome />
              </MdIcon>
              Overview
            </MdPrimaryTab>
            <MdPrimaryTab>
              <MdIcon slot="icon">
                <MdOutlineNetworkCell />
              </MdIcon>
              Network
            </MdPrimaryTab>
            <MdPrimaryTab>
              <MdIcon slot="icon">
                <MdSettings />
              </MdIcon>
              Manage
            </MdPrimaryTab>
          </MdTabs>
        </div>
        <div className={Style.cover} />
        <div className={Style.fab}>
          <MdFab onClick={refreshHandler}>
            <MdIcon slot="icon">
              <MdRefresh />
            </MdIcon>
          </MdFab>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(Context: GetServerSidePropsContext) {
  const session = Context.req.cookies.session;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
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
        props: {},
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
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
}
