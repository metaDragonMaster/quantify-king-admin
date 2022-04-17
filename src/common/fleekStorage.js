// import fleekStorage from '@fleekhq/fleek-storage-js'
import { listFiles } from '@fleekhq/fleek-storage-js';
// import { hex_md5 } from '@/utils/md5';

const options = {
	apiKey: `3aeUoeyQffL8v0jNNQv60g==`,
	apiSecret: `F+yU8/8gR35QLdJ4Ek+waC/z1v5xN8Wthx9a6pI2BBM=`,
};

async function getListFiles(prefix) {
	const files = await listFiles({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		prefix: prefix,
		getOptions: ['key'],
	});
	return files;
}

const bucketTest = 'test';
const bucketUser = 'user';
const BaseBucketRE =
	process.env.NODE_ENV == 'development' ? bucketTest : bucketUser;
function getBucketUrl(bucket) {
	return `https://storageapi2.fleek.co/0fdd4305-c758-4bda-97be-de16e5307de4-bucket/${bucket}/`;
}
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
	return res;
}

const bucketAllUsersTest = 'AllUsersTest';
const bucketAllUsers = 'AllUsers';
const BaseBucketAllUsers = process.env.NODE_ENV == 'development' ? bucketAllUsersTest : bucketAllUsers;
export function getAllUsersFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllUsers)
	return BaseUrl + userAddress + '.json';
}
export async function getAllUsersListFilesName() {
	const res = await getListFiles(BaseBucketAllUsers);
	return res;
}


const bucketReUsersTest = 'ReUsersTest'
const bucketReUsers = 'ReUsers'
const BaseBucketReUsers = process.env.NODE_ENV == 'development' ? bucketReUsersTest : bucketReUsers;
export function getReUsersFileUrl(userAddress,reAddress) {
	const BaseUrl = getBucketUrl(`${BaseBucketReUsers}/${reAddress}`)
	return BaseUrl + userAddress + '.json';
}
export async function getReUsersListFilesName() {
	const res = await getListFiles(BaseBucketReUsers);
	return res;
}
