import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js";
import Navue from "/js/navue.js";
import FootVue from "/js/footvue.js";

let url = location.href.replace(/\/$/, "");
let lapi = "";
if (location.search) {
  const string = location.search.replace("?", "");
  let params = string.split("&");
  for (let i = 0; i < params.length; i++) {
    let param = params[i].split("=");
    if (param[0] == "api") {
      lapi = param[1];
    }
  }
  //window.history.replaceState(null, null, "dex?api=" + lapi);
}
if (location.hash && !lapi) {
  const hash = url.split("#");
  if (hash[1].includes("dlux")) {
    lapi = "https://token.dlux.io";
  } else if (hash[1].includes("larynx")) {
    lapi = "https://spkinstant.hivehoneycomb.com";
  }
}
if (!lapi) {
  lapi = localStorage.getItem("lapi") || "https://token.dlux.io";
}
console.log(lapi);
if (
  lapi == "https://token.dlux.io" ||
  lapi == "https://spkinstant.hivehoneycomb.com"
) {
  console.log("using defaults");
  //window.history.replaceState(null, null, "dex");
}
let user = localStorage.getItem("user") || "GUEST";
let hapi = localStorage.getItem("hapi") || "https://api.hive.blog";
console.log({
  lapi,
});

// createApp({ // vue 3
var app = new Vue({
  // vue 2
  el: "#app", // vue 2
  data() {
    return {
      ohlcv: [],
      toSign: {},
      chart: {
        id: "honeycomb_tv",
        width: 600,
        height: 400,
        toolbar: true,
        overlays: false,
        bg: `#111215`,
      },
      barcount: 500,
      barwidth: 3600000 * 6,
      nowtime: new Date().getTime(),
      agoTime: new Date().getTime() - 86400000,
      account: user,
      hasDrop: false,
      dropnai: "",
      balance: "0.000",
      bartoken: "",
      barhive: "",
      barhbd: "",
      bargov: "",
      barpow: "",
      toSign: {},
      buyFormValid: false,
      sellFormValid: false,
      govFormValid: false,
      powFormValid: false,
      sendFormValid: false,
      hiveFormValid: false,
      hbdFormValid: false,
      lapi: lapi,
      hapi: hapi,
      accountapi: {},
      hiveprice: {
        hive: {
          usd: 1,
        },
      },
      hbdprice: {
        hive_dollar: {
          usd: 1,
        },
      },
      nodes: {},
      runners: [],
      runnersSearch: [],
      marketnodes: {},
      hivebuys: [],
      hivesells: [],
      hbdbuys: [],
      hbdsells: [],
      dexapi: {
        markets: {
          hive: {
            tick: 0.001,
          },
          hbd: {
            tick: 0.001,
          },
        },
      },
      prefix: "",
      multisig: "",
      jsontoken: "",
      node: "",
      behind: "",
      stats: {},
      behindTitle: "",
      TOKEN: "LARYNX",
      bform: {
        cl: false,
        tl: false,
        pl: true,
      },
      sform: {
        cl: false,
        tl: false,
        pl: true,
      },
      buyHiveTotal: 0,
      buyPrice: 0,
      sellPrice: 0,
      buyHbdTotal: 0,
      sellHiveTotal: 0,
      sellHbdTotal: 0,
      buyQuantity: 0,
      sellQuantity: 0,
      buyHours: 720,
      sellHours: 720,
      volume: {
        hive: 0,
        hbd: 0,
        token_hive: 0,
        token_hbd: 0,
        hive_usd: 0,
        hbd_usd: 0,
      },
      sendTo: "",
      sendAmount: 0,
      sendMemo: "",
      sendAllowed: false,
      sendHiveTo: "",
      sendHiveAllowed: false,
      sendHiveAmount: 0,
      sendHiveMemo: "",
      sendHBDTo: "",
      sendHBDAllowed: false,
      sendHBDAmount: 0,
      sendHBDMemo: "",
      recenthive: {},
      recenthbd: {},
      openorders: [],
      toasts: [],
      orders: {
        filleda: false,
        filledd: false,
        blocka: false,
        blockd: true,
        coina: false,
        coind: false,
        tokena: false,
        tokend: false,
        ratea: false,
        rated: false,
        typea: false,
        typed: false,
      },
      features: {
        claim_id: "claim",
        claim_S: "Airdrop",
        claim_B: true,
        claim_json: "drop",
        rewards_id: "shares_claim",
        rewards_S: "Rewards",
        rewards_B: true,
        rewards_json: "claim",
        rewardSel: false,
        reward2Gov: false,
        send_id: "send",
        send_S: "Send",
        send_B: true,
        send_json: "send",
        powup_id: "power_up",
        powup_B: false,
        pow_val: "",
        powdn_id: "power_down",
        powdn_B: false,
        powsel_up: true,
        govup_id: "gov_up",
        govup_B: true,
        gov_val: "",
        govsel_up: true,
        govdn_id: "gov_down",
        govdn_B: true,
        node: {
          id: "node_add",
          opts: [
            {
              S: "Domain",
              type: "text",
              info: "https://no-trailing-slash.com",
              json: "domain",
              val: "",
            },
            {
              S: "DEX Fee Vote",
              type: "number",
              info: "500 = .5%",
              max: 1000,
              min: 0,
              json: "bidRate",
              val: "",
            },
            {
              S: "DEX Max Vote",
              type: "number",
              info: "10000 = 100%",
              max: 10000,
              min: 0,
              json: "dm",
              val: "",
            },
            {
              S: "DEX Slope Vote",
              type: "number",
              info: "10000 = 100%",
              max: 10000,
              min: 0,
              json: "ds",
              val: "",
            },
            {
              S: "DAO Claim Vote",
              type: "number",
              info: "1500 = 15%",
              max: 10000,
              min: 0,
              json: "dv",
              val: "",
            },
          ],
        },
      },
      accountinfo: {},
      filterusers: {
        checked: true,
        value: "",
      },
      filteraccount: {
        checked: false,
        value: "",
        usera: false,
        userd: false,
        gova: false,
        govd: true,
        apia: false,
        apid: false,
      },
      lockgov: {
        checked: true,
      },
      unlockgov: {
        checked: false,
      },
      buyhive: {
        checked: true,
      },
      buyhbd: {
        checked: false,
      },
      buylimit: {
        checked: true,
      },
      buymarket: {
        checked: false,
      },
      selllimit: {
        checked: true,
      },
      sellmarket: {
        checked: false,
      },
      pwrup: {
        checked: true,
      },
      pwrdown: {
        checked: false,
      },
      govlock: {
        checked: true,
      },
      govunlock: {
        checked: false,
      },
      nftsets: [],
      nftscripts: {},
      loadsscripts: {},
      computedsets: {},
    };
  },
  components: {
    "nav-vue": Navue,
    "foot-vue": FootVue,
  },
  methods: {
    removeOp(txid) {
      if (this.toSign.txid == txid) {
        this.toSign = {};
      }
    },
    run(op) {
      if (typeof this[op] == "function" && this.account != "GUEST") {
        this[op](this.account);
      }
    },
    checkAccount(name, key) {
      fetch("https://anyx.io", {
        body: `{\"jsonrpc\":\"2.0\", \"method\":\"condenser_api.get_accounts\", \"params\":[[\"${this[name]}\"]], \"id\":1}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      })
        .then((r) => {
          return r.json();
        })
        .then((re) => {
          if (re.result.length) this[key] = true;
          else this[key] = false;
        });
    },
    tokenSend() {
      if (!this.sendFormValid) return;
      if (this.sendAllowed) {
        this.toSign = {
          type: "cja",
          cj: {
            to: this.sendTo,
            amount: parseInt(this.sendAmount * 1000),
            memo: this.sendMemo,
          },
          id: `${this.prefix}send`,
          msg: `Trying to send ${this.TOKEN}...`,
          ops: ["getTokenUser"],
          txid: "send",
        };
      } else alert("Username not found");
    },
    sendhive() {
      if (!this.hiveFormValid) return;
      if (this.sendHiveAllowed)
        this.toSign = {
          type: "xfr",
          cj: {
            to: this.sendHiveTo,
            hive: this.sendHiveAmount * 1000,
            memo: this.sendHiveMemo,
          },
          txid: "sendhive",
          msg: ``,
          ops: ["getHiveUser"],
        };
      else alert("Account Not Found");
    },
    sendhbd() {
      if (!this.hbdFormValid) return;
      if (this.sendHBDAllowed)
        this.toSign = {
          type: "xfr",
          cj: {
            to: this.sendHBDTo,
            hbd: this.sendHBDAmount * 1000,
            memo: this.sendHBDMemo,
          },
          txid: "sendhbd",
          msg: ``,
          ops: ["getHiveUser"],
        };
      else alert("Account Not Found");
    },
    localStoreSet(k, v) {
      localStorage.setItem(k, v);
    },
    toFixed(value, decimals) {
      return Number(value).toFixed(decimals);
    },
    parseFloat(value) {
      return parseFloat(value);
    },
    toUpperCase(value) {
      return value.toUpperCase();
    },
    formatNumber(t, n, r, e) {
      if (typeof t != "number") t = parseFloat(t);
      if (isNaN(t)) return "Invalid Number";
      if (!isFinite(t)) return (t < 0 ? "-" : "") + "infinite";
      (r = r || "."), (e = e || "");
      var u = t < 0;
      t = Math.abs(t);
      var a = (null != n && 0 <= n ? t.toFixed(n) : t.toString()).split("."),
        i = a[0],
        o = 1 < a.length ? r + a[1] : "";
      if (e)
        for (var c = /(\d+)(\d{3})/; c.test(i); )
          i = i.replace(c, "$1" + e + "$2");
      return (u ? "-" : "") + i + o;
    },
    setValue(key, value) {
      if (key.split(".").length > 1) {
        let keys = key.split(".");
        let obj = this[keys[0]];
        for (let i = 1; i < keys.length; i++) {
          if (i == keys.length - 1) {
            obj[keys[i]] = value;
          } else {
            obj = obj[keys[i]];
          }
        }
      } else {
        this[key] = value;
      }
    },
    setApi(url) {
      // remove trailing slash
      if (url.substr(-1) == "/") {
        url = url.substr(0, url.length - 1);
      }
      let api =
        url ||
        prompt("Please enter your API", "https://spkinstant.hivehoneycomb.com");
      if (url.indexOf("https://") == -1) {
        alert("https is required");
        return;
      }
      if (api != null) {
        if (location.hash && api) {
          location.hash = "";
        }
        localStorage.setItem("lapi", api);
        location.search = "?api=" + api;
      }
    },
    suggestValue(key, value) {
      if (key.split(".").length > 1) {
        let keys = key.split(".");
        let obj = this[keys[0]];
        for (let i = 1; i < keys.length; i++) {
          if (i == keys.length - 1) {
            if (!obj[keys[i]]) obj[keys[i]] = value;
          } else {
            obj = obj[keys[i]];
          }
        }
      } else {
        if (!this[key]) this[key] = value;
      }
    },
    atref(key) {
      return `/@${key}`;
    },
    setMem(key, value, reload) {
      if (value.indexOf("https://") == -1) {
        alert("https:// is required for security reasons");
        return;
      } else if (value[value.length - 1] == "/") {
        value = value.substring(0, value.length - 1);
      }
      localStorage.setItem(key, value);
      if (reload) {
        location.reload();
      }
    },
    sort(item, key, method) {
      switch (method) {
        case "asc":
          this[item].sort((a, b) => {
            return a[key] < b[key] ? -1 : 1;
          });
          break;
        case "desc":
        default:
          this[item].sort((a, b) => {
            return a[key] > b[key] ? -1 : 1;
          });
      }
    },
    focus(id) {
      document.getElementById(id).focus();
    },
    validateForm(formKey, validKey) {
      var Container = document.getElementById(formKey);
      if (Container.querySelector("input:invalid")) this[validKey] = false;
      else this[validKey] = true;
    },
    getQuotes() {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=hive&amp;vs_currencies=usd"
      )
        .then((response) => response.json())
        .then((data) => {
          this.hiveprice = data;
        });
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=hive_dollar&amp;vs_currencies=usd"
      )
        .then((response) => response.json())
        .then((data) => {
          this.hbdprice = data;
        });
    },
    getNodes() {
      fetch(this.lapi + "/runners")
        .then((response) => response.json())
        .then((data) => {
          this.runners = data.result.sort((a, b) => {
            return b.g - a.g;
          });
        });
      fetch(this.lapi + "/markets")
        .then((response) => response.json())
        .then((data) => {
          this.nodes = data.markets.node;
          this.stats = data.stats;
        });
    },
    getProtocol() {
      fetch(this.lapi + "/api/protocol")
        .then((response) => response.json())
        .then((data) => {
          this.prefix = data.prefix;
          this.multisig = data.multisig;
          this.jsontoken = data.jsontoken;
          this.TOKEN = data.jsontoken.toUpperCase();
          location.hash = data.jsontoken;
          this.node = data.node;
          this.features = data.features ? data.features : this.features;
          this.behind = data.behind;
          this.behindTitle = data.behind + " Blocks Behind Hive";
          fetch(this.lapi + "/api/recent/HIVE_" + this.TOKEN + "?limit=1000")
            .then((response) => response.json())
            .then((data) => {
              this.volume.hive =
                data.recent_trades.reduce((a, b) => {
                  if (b.trade_timestamp > this.agoTime)
                    return a + parseInt(parseFloat(b.target_volume) * 1000);
                  else return a;
                }, 0) / 1000;
              this.volume.token_hive =
                data.recent_trades.reduce((a, b) => {
                  if (b.trade_timestamp > this.agoTime)
                    return a + parseInt(parseFloat(b.base_volume) * 1000);
                  else return a;
                }, 0) / 1000;
              this.recenthive = data.recent_trades.sort((a, b) => {
                return (
                  parseInt(b.trade_timestamp) - parseInt(a.trade_timestamp)
                );
              });
            });
          fetch(this.lapi + "/api/recent/HBD_" + this.TOKEN + "?limit=1000")
            .then((response) => response.json())
            .then((data) => {
              this.volume.hbd =
                data.recent_trades.reduce((a, b) => {
                  if (b.trade_timestamp > this.agoTime)
                    return a + parseInt(parseFloat(b.target_volume) * 1000);
                  else return a;
                }, 0) / 1000;
              this.volume.token_hbd =
                data.recent_trades.reduce((a, b) => {
                  if (b.trade_timestamp > this.agoTime)
                    return a + parseInt(parseFloat(b.base_volume) * 1000);
                  else return a;
                }, 0) / 1000;
              this.recenthbd = data.recent_trades.sort((a, b) => {
                return (
                  parseInt(b.trade_timestamp) - parseInt(a.trade_timestamp)
                );
              });
            });
        });
    },
    removeUser() {
      this.balance = 0;
      this.bartoken = "";
      this.barpow = "";
      this.bargov = "";
      this.accountapi = "";
      this.hasDrop = false;
      this.openorders = [];
      this.accountinfo = {};
      this.barhive = "";
      this.barhbd = "";
    },
    getNFTsets() {
      fetch(this.lapi + "/api/sets")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.nftsets = data.result;
          for(let i = 0; i < this.nftsets.length; i++) {
            this.callScript({script: this.nftsets[i].script, uid: "0"});
          }
        });
    },
    pullScript(id) {
      return new Promise((resolve, reject) => {
        if (!this.loadsscripts[id])
          this.loadsscripts[id] = new Date().getTime();
          fetch(`https://ipfs.io/ipfs/${id}`)
            .then((response) => response.text())
            .then((data) => {
              this.nftscripts[id] = data;
              resolve("OK");
            });
        });
    },
    callScript(o) {
      return new Promise((resolve, reject) => {
        if (this.nftscripts[o.script]) {
          console.log("script already loaded");
          const code = `(//${this.nftscripts[o.script]}\n)("${
            o.uid ? o.uid : 0
          }")`;
          this.computedsets[o.script] = eval(code);
          resolve(this.computedsets[o.script]);
        } else {
          this.pullScript(o.script).then((empty) => {
            this.callScript(o).then((r) => {
              console.log({ r });
              resolve(r);
            });
          });
        }
      });
    },
    makeLink(a, b) {
      return a + b;
    },
    getSetPhotos(s, c) {
      return this.computedsets[s] ? `https://ipfs.io/ipfs/${this.computedsets[s].set[c]}` : ''
    },
    getSetDetails(s, o) {
      return this.computedsets[s] ? this.computedsets[s].set[o] : "Not Specified";
    },
    getSetDetailsColors(s) {
     let r = "chartreuse,lawngreen";
        if (this.computedsets[s]){
          try {
            r = `${this.computedsets[s].SVG.set.Color1},${
              this.computedsets[s].SVG.set.Color2
                ? this.computedsets[s].SVG.set.Color2
                : this.computedsets[s].SVG.set.Color1
            }`;
          } catch (e) {
            console.log(e);
            r = "chartreuse,lawngreen";
          }
        }
        return `linear-gradient(${r})`;
      },
    getTokenUser(user) {
      if (user)
        fetch(this.lapi + "/@" + user)
          .then((response) => response.json())
          .then((data) => {
            this.balance = (data.balance / 1000).toFixed(3);
            this.bartoken = this.balance;
            this.barpow = (
              (data.poweredUp + data.granted - data.granting) /
              1000
            ).toFixed(3);
            this.bargov = (data.gov / 1000).toFixed(3);
            this.accountapi = data;
            if (
              new Date().getMonth() + 1 !=
                parseInt(data.drop?.last_claim, 16) &&
              data.drop?.availible.amount > 0
            ) {
              this.hasDrop = true;
              this.dropnai = `${parseFloat(
                data.drop.availible.amount /
                  Math.pow(10, data.drop.availible.precision)
              ).toFixed(data.drop.availible.precision)} ${
                data.drop.availible.token
              }`;
            }
            this.openorders = data.contracts.reduce((acc, cur) => {
              cur.nai = `${
                cur.type.split(":")[0] == "hive"
                  ? parseFloat(cur.hive / 1000).toFixed(3)
                  : parseFloat(cur.hbd / 1000).toFixed(3)
              } ${cur.type.split(":")[0] == "hive" ? "HIVE" : "HBD"}`;
              if (
                cur.partials &&
                cur.partials.length &&
                cur.type.split(":")[1] == "sell"
              ) {
                const filled = cur.partials.reduce(function (a, c) {
                  return a + c.coin;
                }, 0);
                cur.percentFilled = parseFloat(
                  (100 * filled) / (cur.hive ? cur.hive : cur.hbd + filled)
                ).toFixed(2);
                acc.push(cur);
              } else if (cur.partials && cur.partials.length) {
                const filled = cur.partials.reduce(function (a, c) {
                  return a + c.token;
                }, 0);
                cur.percentFilled = parseFloat(
                  (100 * filled) / (cur.amount + filled)
                ).toFixed(2);
                acc.push(cur);
              } else {
                cur.percentFilled = "0.00";
                acc.push(cur);
              }
              console.log({
                acc,
              });
              return acc;
            }, []);
          });
    },
    getHiveUser(user) {
      if (user)
        fetch(hapi, {
          body: `{"jsonrpc":"2.0", "method":"condenser_api.get_accounts", "params":[["${user}"]], "id":1}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.accountinfo = data.result[0];
            this.barhive = this.accountinfo.balance;
            this.barhbd = this.accountinfo.hbd_balance;
          });
    },
  },
  mounted() {
    this.getNFTsets();
    //this.getQuotes();
    //this.getNodes();
    //this.getProtocol();
    //if (user != "GUEST") this.getTokenUser(user);
    //if (user != "GUEST") this.getHiveUser(user);
  },
  computed: {},
});


/*
getSetPhotos(s, i, c){
      var dummySet = {
        script: s,
        uid: i
      }
      this.callScript(dummySet)
      .then(SVG =>{
        let r = ''
        try{r = SVG.set[c];}catch(e){
            r = ''
        }
        return `https://ipfs.io/ipfs/${r}`
      })
    },
    getSetDetails(s, o){
      var dummySet = {
        script: s,
        uid: "0"
      }
      this.callScript(dummySet)
      .then(SVG =>{
        return SVG.set[o] || 'Not Specified'
      })
    },
    getSetDetailsColors (s, i, c){
      var dummySet = {
        script: s,
        uid: "0"
      }
      this.callScript(dummySet)
      .then(SVG =>{
        let r = ''
        try{r=`${SVG.set.Color1},${SVG.set.Color2}`}catch(e){
            console.log(e)
            r = 'chartreuse,lawngreen'
        }
        return `linear-gradient(${r})`
      })
    },
*/