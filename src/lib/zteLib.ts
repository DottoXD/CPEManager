import axios from "axios";

const host = "http://192.168.0.1/";

const getPath = "goform/goform_get_cmd_process";
const postPath = "goform/goform_set_cmd_process";

export default class ZteLib {
  public async getPre(): Promise<any> {
    const res = await axios({
      method: "GET",
      url:
        host +
        getPath +
        "?isTest=false&cmd=Language,cr_version,wa_inner_version&multi_data=1&_=" +
        Date.now(),
      headers: {
        Referer: host,
      },
    });

    return res.data;
  }

  public async getLD(): Promise<any> {
    const res = await axios({
      method: "GET",
      url: host + getPath + "?isTest=false&cmd=LD",
      headers: {
        Referer: host,
      },
    });

    return res.data;
  }

  public async getRD(): Promise<any> {
    const res = await axios({
      method: "GET",
      url: host + getPath + "?isTest=false&cmd=RD",
      headers: {
        Referer: host,
      },
    });

    return res.data;
  }

  public async getVersion(): Promise<any> {
    const res = await axios({
      method: "GET",
      url: host + getPath + "?isTest=false&cmd=wa_inner_version",
      headers: {
        Referer: host,
      },
    });

    return res.data;
  }

  public async getCookie(pass: string): Promise<any> {
    const res = await axios({
      method: "POST",
      url: host + postPath,
      headers: {
        Referer: host,
      },
      data: `?isTest=false&goformId=LOGIN&password=${pass}`,
    });

    return res.headers["set-cookie"];
  }

  public async getData(cookie: string): Promise<any> {
    const res = await axios({
      method: "GET",
      url:
        host +
        getPath +
        "?isTest=false&cmd=lte_pci,lte_pci_lock,lte_earfcn_lock,wan_ipaddr,wan_apn,pm_sensor_mdm,pm_modem_5g,nr5g_pci,nr5g_action_channel,nr5g_action_band,Z5g_SINR,Z5g_rsrp,wan_active_band,wan_active_channel,wan_lte_ca,lte_multi_ca_scell_info,cell_id,network_type,rmcc,rmnc,lte_rsrq,lte_rssi,lte_rsrp,lte_snr,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,wan_ipaddr,static_wan_ipaddr,mdm_mcc,mdm_mnc,signalbar,network_provider,realtime_tx_thrpt,realtime_rx_thrpt&multi_data=1&_=" +
        Date.now(),
      headers: {
        Referer: host,
        Cookie: 'stok="' + cookie + '"',
      },
    });

    return res.data;
  }
}
