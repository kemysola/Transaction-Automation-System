import * as aesjs from 'aes-js';

function hexToBase64(hexstring) {
  return btoa(
    hexstring
      .match(/\w{2}/g)
      .map(function (a) {
        return String.fromCharCode(parseInt(a, 16));
      })
      .join('')
  );
}

function base64ToHex(str) {
  const hex = [];
  const bin = atob(str.replace(/[ \r\n]+$/, ''));
  for (let i = 0; i < bin.length; i += 1) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) {
      tmp = '0' + tmp;
    }
    hex.push(tmp);
  }
  return hex.join('');
}

export const encryptData = (data) => {
  const iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const key = aesjs.utils.utf8.toBytes(process.env.REACT_APP_ENCRYPTION_KEY || '');

  const text = JSON.stringify(data);
  const textBytes = aesjs.utils.utf8.toBytes(text);

  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptedBytes = aesCbc.encrypt(aesjs.padding.pkcs7.pad(textBytes));

  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  const encryptedBase64 = hexToBase64(encryptedHex);
  const user_data3 = { encryptedData: encryptedBase64 };

  return user_data3;
};

export function decryptData(data) {
  try {
    const iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const key = aesjs.utils.utf8.toBytes('6B58703273357638792F423F4528472B');

    const encryptedBytes = aesjs.utils.hex.toBytes(base64ToHex(data));

    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const decryptedBytes = aesjs.padding.pkcs7.strip(aesCbc.decrypt(encryptedBytes));
    const decrytpedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return JSON.parse(decrytpedText) ;
  } catch (error) {
    console.log({ error });
  }
}
