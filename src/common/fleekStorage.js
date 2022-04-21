// import fleekStorage from '@fleekhq/fleek-storage-js'
import { listFiles } from '@fleekhq/fleek-storage-js';
// import { hex_md5 } from '@/utils/md5';

const options = {
	apiKey: `3aeUoeyQffL8v0jNNQv60g==`,
	apiSecret: `F+yU8/8gR35QLdJ4Ek+waC/z1v5xN8Wthx9a6pI2BBM=`,
};

async function getListFiles(prefix) {
	try {
		const files = await listFiles({
			apiKey: options.apiKey,
			apiSecret: options.apiSecret,
			prefix: `${BaseVersion}/${prefix}`,
			getOptions: ['key'],
		});
		console.log(files);
		return files;
	} catch (e) {
		return []
	}
}
function getFileNameByFileKey(packageName, key) {
	return key.slice(
		`${BaseVersion}/${packageName}/`.length,
		key.length - '.json'.length
	)
}

function getBucketUrl(bucket) {
	return `https://storageapi2.fleek.co/${BaseBucket}/${bucket}/`;
}

const BaseVersion = 'version-5';
const BaseBucket = `0fdd4305-c758-4bda-97be-de16e5307de4-bucket/${BaseVersion}`;

const bucketTest = 'test';
const bucketUser = 'user';
const BaseBucketRE =
	process.env.NODE_ENV == 'development' ? bucketTest : bucketUser;

export function getFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketRE);
	return BaseUrl + userAddress + '.json';
}

const bucketAllowanceTest = 'AllowanceTimeTest';
const bucketAllowance = 'AllowanceTime';
export const BaseBucketAllowance =
	process.env.NODE_ENV == 'development'
		? bucketAllowanceTest
		: bucketAllowance;
export function getAllowanceFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllowance);
	return BaseUrl + userAddress.toLocaleLowerCase() + '.json';
}

export async function getAllowanceListFilesName() {
	const res = await getListFiles(BaseBucketAllowance);
	const addressList = res.map((item) =>
		getFileNameByFileKey(BaseBucketAllowance, item.key)
	);
	return addressList;
}

const bucketAllUsersTest = 'AllUsersTest';
const bucketAllUsers = 'AllUsers';
const BaseBucketAllUsers =
	process.env.NODE_ENV == 'development' ? bucketAllUsersTest : bucketAllUsers;
export function getAllUsersFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllUsers);
	return BaseUrl + userAddress + '.json';
}
export async function getAllUsersListFilesName() {
	const res = await getListFiles(BaseBucketAllUsers);
	const addressList = res.map((item) =>
		getFileNameByFileKey(BaseBucketAllUsers, item.key)
	);
	return addressList;
}

const bucketReUsersTest = 'ReUsersTest';
const bucketReUsers = 'ReUsers';
const BaseBucketReUsers =
	process.env.NODE_ENV == 'development' ? bucketReUsersTest : bucketReUsers;
export function getReUsersFileUrl(userAddress, reAddress) {
	const BaseUrl = getBucketUrl(`${BaseBucketReUsers}/${reAddress}`);
	return BaseUrl + userAddress + '.json';
}
export async function getReUsersListFilesName() {
	try {
		const res = await getListFiles(BaseBucketReUsers);
		console.log("getReUsersListFilesName ***->", res);
		return res;
	} catch (e) {
		return []
	}
}


// 上级关系
const bucketRelationReTest = "RelationReTest"
const bucketRelationRe = "RelationRe"
const BaseBucketRelationRe =
	process.env.NODE_ENV == 'development' ? bucketRelationReTest : bucketRelationRe;
export function getRelationReFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketRelationRe);
	return `${BaseUrl}${userAddress}.json`;
}
// export async function uploadRelationRe(userAddress, baseData) {
// 	let option = {
// 		bucket: BaseBucketRelationRe,
// 		fileKey: `${userAddress}.json`,
// 		fileType: 'json',
// 		fileData: JSON.stringify(baseData),
// 	};
// 	const res = await uploadFile(option);
// 	console.log('uploadRelationRe-->', res);
// 	return res;
// }

// 子集关系
const bucketRelationChildTest = "RelationChildTest"
const bucketRelationChild = "RelationChild"
const BaseBucketRelationChild =
	process.env.NODE_ENV == 'development' ? bucketRelationChildTest : bucketRelationChild;
export const lvs = ['re1', 're2', 're3'];
export async function getRelationChildAll(userAddress, lv) {
	try {
		const prefix = `${BaseBucketRelationChild}/${userAddress}/${lv}`
		const res = await getListFiles(prefix)
		const addressList = res.map((item) =>
			getFileNameByFileKey(prefix, item.key)
		);
		return addressList
	} catch (e) {
		return []
	}
}
/*
async function getListFiles(prefix) {
	const files = await listFiles({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		prefix: `${BaseVersion}/${prefix}`,
		getOptions: ['key'],
	});
	console.log(files);
	return files;
}
*/

// export function getRelationChildFileUrl(userAddress,reAddress,lv) {
// 	const lvs = ['re1','re2','re3'];
// 	if(!lvs.includes(lv)) return;
// 	const BaseUrl = getBucketUrl(BaseBucketRelationChild);
// 	return `${BaseUrl}${reAddress}/${lv}/${userAddress}.json`;
// }
// export async function uploadRelationChild(userAddress,reAddress,lv) {
// 	if(!lvs.includes(lv)) return false;
// 	let option = {
// 		bucket: `${BaseBucketRelationChild}/${reAddress}/${lv}`,
// 		fileKey: `${userAddress}.json`,
// 		fileType: 'json',
// 		fileData: JSON.stringify({
// 			time: getNewTimetamps(),
// 		}),
// 	};
// 	const res = await uploadFile(option);
// 	console.log('uploadRelationChild-->', res);
// 	return res;
// }
