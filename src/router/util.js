import $router from "./index.js"
import { deepClone } from '@/utils/tools';

function toName(name, parameter={}) {
	if (!name) {
		return;
	}
	const params = deepClone(parameter);
	console.log("params", params);
	return $router.push({
		"name": name,
		"params": params
	});
}

function toPath(path, parameter={}) {
	if (!path) {
		return;
	}
	const query = deepClone(parameter);
	console.log("query", query);
	return $router.push({
		"path": path,
		"query": query
	});
}
// const functions = {
// 	toName:toName,
// 	toPath:toPath,
// }

export {
	// ...functions,
	toName,
	toPath
}
