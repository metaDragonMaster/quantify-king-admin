import { defineStore } from "pinia";
import { useWeb3, getContract } from "@/hooks/useWeb3";
import {
  AbiQK,
  AbiAddressQK,
  AbiUSDT,
  AbiAddressUSDT,
} from "@/abis/index.js";

export const UseStoreWeb3js = defineStore("Web3js", {
  state: () => ({
    _web3: null,
    // _auth: false,
    _address: "",
    _re: "",
  }),
  getters: {
    web3: ({ _web3 }) => _web3,
    haveWeb3: ({ _web3 }) => !!_web3, //Web3是否被授权
    // haveAuth: ({ _auth }) => !!_auth, //是否被授权
    haveRe: ({ _re }) => !!_re, //是否有推荐人
    userAddress: ({ _address }) => _address,
    fromWei: ({ _web3 }) => {
      let fromWei;
      if (_web3.utils) {
        fromWei = _web3.utils.fromWei;
      }
      return fromWei;
    },
  },
  actions: {
    // callback
    async startWeb3() {
      // const Router = useRouter()
      const { setContracts } = UseStoreContracts();
      const web3InCode = await useWeb3(async (web3Eth, userAddress) => {
        console.log("用户切换了钱包后的操作");
        this.setUserAddress(userAddress);
        this.setWeb3(web3Eth);
        const contracts = await startContracts(web3Eth);
        await setContracts(contracts);
      });
      return !!web3InCode;
    },
    setWeb3(web3) {
      this._web3 = web3;
    },
    // setAuth(bool) {
    //   this._auth = bool;
    // },
    setUserAddress(address) {
      this._address = address;
    },
    setRe(re) {
      this._re = re;
    },
  },
});

async function startContracts(web3) {
  const USDTContract = await getContract(web3, AbiUSDT, AbiAddressUSDT);
  const QKContract = await getContract(web3, AbiQK, AbiAddressQK);
  // console.log(USDTContract);
  return {
    USDTContract,
    QKContract,
  };
}

export const UseStoreContracts = defineStore("contracts", {
  state: () => ({
    _Contracts: null,
  }),
  getters: {
    Contracts: ({ _Contracts }) => _Contracts,
  },
  actions: {
    async setContracts(Contracts) {
      this._Contracts = Contracts;
    },
  },
});
