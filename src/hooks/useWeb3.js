import Web3 from "web3";
import { lockLoadHandler, PlusElMessage } from "@/utils/PlusElement";
import detectEthereumProvider from "@metamask/detect-provider";

async function getEth() {
  console.log("getEth");
  console.log(window.ethereum);
  console.log(typeof window.ethereum === "undefined");
  const provider = await detectEthereumProvider();
  console.log(provider,);
  console.log(provider !== window.ethereum);
  if (provider !== window.ethereum) {
    //没安装MetaMask钱包进行弹框提示
    PlusElMessage({
      type: "warning",
      message: "error 10404:MetaMask not installed",
      // '请安装MetaMask'
    });
    throw new Error("error 10404:MetaMask not installed");
  } else {
    // if (
    //   process.env.NODE_ENV == "production" &&
    //   window.ethereum.chainId != "0x38"
    // ) {
    //   PlusElMessage({
    //     type: "warning",
    //     message: "error 10501:MetaMask currently in an informal network",
    //     // 'MetaMask 处于非正式网络中'
    //   });
    //   throw new Error("error 10501:MetaMask currently in an informal network");
    // } else {
      return window.ethereum;
    // }
  }
}
export async function useWeb3(callback) {
	//正在获取授权 
  const loadHandler = lockLoadHandler("Getting Authorization...");
  try {
    const web3Provider = await getEth();
    const userAddress = await web3Provider.enable(); //hte enable function will be removed
    // const userAddress = await web3Provider.request({ method: 'eth_requestAccounts' });
    // console.log(userAddress[0])
    const web3 = new Web3(web3Provider);
    loadHandler.close();
    callback && callback(web3, userAddress[0]);
    web3Provider &&
      web3Provider.on("accountsChanged", function (accounts) {
        console.log("用户切换了钱包", accounts[0]); //一旦切换账号这里就会执行
        callback && callback(web3, accounts[0]);
      });
    return web3;
  } catch (error) {
    console.error(error);
    PlusElMessage({
      type: "error",
      message: "User denied account access",
      // '请安装MetaMask'
    });
    loadHandler.close();
    return;
  }
}
export function getContract(web3, abi, abiAddress) {
  return new web3.eth.Contract(abi, abiAddress);
}
