import Aes from 'react-native-aes-crypto';

export const encrypt = async () => {
  const apiKey = 'API_KEY';
  const key = await Aes.randomKey(16);
  const iv = await Aes.randomKey(16);
  const data = await Aes.encrypt(apiKey, key, iv, 'aes-128-cbc');
  console.log({ data, key, iv, apiKey });
};

export const decrypt = async (apiKey: string) => {
  try {
    const [key, iv, data] = apiKey.split(':');
    const result = await Aes.decrypt(data, key, iv, 'aes-128-cbc');
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const hashCity = async (city: {
  name: string;
  lat: number;
  lon: number;
  country: string;
}) => {
  try {
    const hash = await Aes.sha1(
      `${city.name}${city.lat}${city.lon}${city.country}`,
    );
    return hash;
  } catch (error) {
    return null;
  }
};
