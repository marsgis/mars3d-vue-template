/**
 * 工具模块
 */
import crypto from 'crypto';

// 从数据中获取需要的参数，默认获取_id
export const selection = (data, params) => {
  const result = [];

  if (params && params.length > 0) {
    data.forEach((item) => {
      params.forEach((param) => {
        result.push({
          id: item.id,
          param: item[param]
        });
      }, this);
    }, this);
  } else {
    data.forEach((item) => {
      result.push(item.id);
    }, this);
  }

  return result;
};

/**
 * 读取localStorage
 * @param {String} key 为需要读取的Storage的key
 * @param {Object} type 读取出错时需要返回的数据类型
 */
export const getStorage = (key, type) => {
  try {
    const result = JSON.parse(localStorage.getItem(key));

    if (result === null || result === '') {
      return type;
    }

    return result;
  } catch (error) {
    console.error(new Error('读取缓存数据错误:', error));

    return type;
  }
};

/**
 * MD5加密
 * @param {String} data 需要加密的数据
 * @returns {String} 加密后的密文
 * @returns {Error} 加密出错时报错的信息
 */
export function encryptMD5(data) {
  try {
    const md5 = crypto.createHash('md5');
    md5.update(data);

    return md5.digest('hex');
  } catch (error) {
    console.error(error);

    return null;
  }
}

/**
 * 加密数据
 * @param {String} encodeParam.algorithm 算法
 * @param {String} encodeParam.plaintext 需要加密的数据
 * @param {String} encodeParam.password 秘钥
 * @param {Boolean} encodeParam.autoPadding 是否自动添加
 * @param {Number} encodeParam.iv 偏移量
 * @param {String} encodeParam.inputEncoding 加密前明文的编码，默认utf8
 * @param {String} encodeParam.outputEncoding 加密后密文的编码，默认hex
 * @returns {String} 加密后的密文
 * @returns {Error} 加密出错时报错的信息
 */
export function cryptoEncode(encodeParam) {
  try {
    const plain = encodeParam.plaintext.toString();
    const cipher = crypto.createCipheriv(encodeParam.algorithm, encodeParam.key, encodeParam.iv);

    cipher.setAutoPadding(encodeParam.autoPadding);

    let ciphertext = cipher.update(plain, encodeParam.inputEncoding || 'utf8', encodeParam.outputEncoding || 'hex');
    ciphertext += cipher.final(encodeParam.outputEncoding || 'hex');

    return ciphertext;
  } catch (error) {
    console.error(error);

    return null;
  }
}

/**
 * 解密数据
 * @param {String} decodeParam.algorithm 算法
 * @param {String} decodeParam.ciphertext 需要解密的数据
 * @param {String} decodeParam.key 秘钥
 * @param {Boolean} decodeParam.autoPadding 是否自动添加
 * @param {Number} decodeParam.iv 偏移量
 * @param {String} encodeParam.inputEncoding 解密前密文的编码，默认hex
 * @param {String} encodeParam.outputEncoding 解密后明文的编码，默认utf8
 * @returns {String} 加密后的密文
 * @returns {Error} 加密出错时报错的信息
 */
export function decryptDecode(decodeParam) {
  try {
    const ciphertext = ((decodeParam || {}).ciphertext || '').toString();
    const decipher = crypto.createDecipheriv(decodeParam.algorithm, decodeParam.key, decodeParam.iv);

    decipher.setAutoPadding(decodeParam.autoPadding);

    let plaintext = decipher.update(ciphertext, decodeParam.inputEncoding || 'hex', decodeParam.outputEncoding || 'utf8');

    plaintext += decipher.final(decodeParam.outputEncoding || 'utf8');

    return plaintext;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 去除左右空格
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 删除左边的空格
export function ltrim(str) {
  return str.replace(/(^\s*)/g, '');
}

// 删除右边的空格
export function rtrim(str) {
  return str.replace(/(\s*$)/g, '');
}

/**
 * 校验是否是手机号码
 * @param {String} value 需要校验的字符串
 * @return {Boolean} 校验是否通过
 */
export function isTelphoneNumber(value) {
  return /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(value);
}

/**
 * 格式化数字、金额
 * @param {Number} data 需要格式化的数字
 * @param {Number} decimals 保留几位小数
 * @param {String} decPoint 小数点符号
 * @param {String} thousandsSep 千分位符号
 * @return {String} 格式化后的金额
 */
export function formatMoney(data, decimals, decPoint, thousandsSep) {
  const numer = data.toString().replace(/[^0-9+-Ee.]/g, '');

  const n = !Number.isFinite(+numer) ? 0 : +numer;
  const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
  let s = '';

  function toFixedFix(numCal, precCal) {
    const k = 10 ** precCal;
    return (Math.ceil(numCal * k) / k).toString();
  }

  s = (prec ? toFixedFix(n, prec) : Math.round(n).toString()).split('.');

  const re = /(-?\d+)(\d{3})/;

  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
}

/**
 * 格式化数字，小于10补0
 * @param {Number || String} n 需要格式化的数字
 * @returns {String} 格式化后的数字
 */
export function formatNumber(n) {
  const number = n.toString();

  return number[1] ? number : `0${number}`;
}

/**
 * 格式化日期
 * @param {String | Date} 需要格式化的时间，若为空取当前时间
 * @param {String} format 格式化的结构
 */
export function formatDate(date, format) {
  const dateType = Object.prototype.toString.call(date);

  if (dateType !== '[object String]' && dateType !== '[object Date]' && dateType !== '[object Number]') {
    date = new Date();
  } else {
    date = new Date(date);

    // date无效
    if (Number.isNaN(date.getTime())) {
      date = new Date();
    }
  }

  const args = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
  }

  if (/(w+)/i.test(format)) {
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    format = format.replace(RegExp.$1, week[date.getDay()]);
  }

  Object.getOwnPropertyNames(args).forEach((key) => {
    if (new RegExp(`(${key})`, 'i').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? item : (`00${args[key]}`).substr(args[key].toString().length));
    }
  });

  return format;
}

/**
 * 函数节流
 * @description 高频事件时，规定时间(delay)内只执行一次要执行的事件(fn)
 * @param {Function} fn 需要执行的函数
 * @param {Number} delay 冷却的时间，毫秒
 */
export function throttle(fn, delay) {
  const timer = null;

  return function () {
    const _this = this;
    const _args = arguments;

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(_this, _args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 函数防抖
 * @description 高频事件时，在规定时间(delay)后出发一次要执行的事件(fn)
 * @param {Function} fn 需要执行的函数
 * @param {Number} delay 延迟时间，毫秒
 */
export function debounce(fn, delay) {
  let timer = null;

  // 返回函数对debounce作用域形成闭包
  return function () {
    // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
    const context = this; const
      args = arguments;

    // 如果事件被触发，清除timer并重新开始计时
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
