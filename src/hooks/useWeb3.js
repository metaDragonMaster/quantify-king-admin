import Web3 from 'web3';
import { lockLoadHandler, PlusElMessage } from "@/utils/PlusElement";

function getEth() {
	if (typeof window.ethereum === "undefined") {
		//没安装MetaMask钱包进行弹框提示
		PlusElMessage({
			type: 'warning',
			message: 'MetaMask not installed'
			// '请安装MetaMask'
		})
		throw new Error('MetaMask not installed');
	} else {
		if (process.env.NODE_ENV == 'production' && window.ethereum.chainId != '0x38') {
			PlusElMessage({
				type: 'warning',
				message: 'MetaMask currently in an informal network'
				// 'MetaMask 处于非正式网络中'
			})
			throw new Error('MetaMask not installed');
		} else {
			return window.ethereum
		}
	}
}
export async function useWeb3(callback) {
	const loadHandler = lockLoadHandler('正在获取授权...')
	try {
		const web3Provider = await getEth()
		// const userAddress = await web3Provider.enable();//hte enable function will be removed
		const userAddress = await web3Provider.request({ method: 'eth_requestAccounts' });
		// console.log(userAddress[0])
		const web3 = new Web3(web3Provider);
		loadHandler.close();
		callback && callback(web3, userAddress[0])
		web3Provider && web3Provider.on("accountsChanged", function (accounts) {
			console.log('用户切换了钱包', accounts[0]);//一旦切换账号这里就会执行
			callback && callback(web3, accounts[0])
		});
		return web3
	} catch (error) {
		console.error(error)
		PlusElMessage({
			type: 'error',
			message: 'User denied account access'
			// '请安装MetaMask'
		})
		loadHandler.close()
		return;
	}
}
export function getContract(web3, abi, abiAddress) {
	return new web3.eth.Contract(abi, abiAddress)
}
