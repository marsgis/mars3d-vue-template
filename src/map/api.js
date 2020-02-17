// 图层
import axios from 'axios';


export function getMapConfig(){
	const url = 'config/config.json';
	const data = '';
	return axios.get(url, {
		params: data
	}).then(res => {
		return Promise.resolve(res.data);
	});
}


export function getPoint(){
	const url = 'http://data.marsgis.cn/file/apidemo/qiye/point.json';
	const data = '';
	return axios.get(url, {
		params: data
	}).then(res => {
		return Promise.resolve(res.data);
	});
}
