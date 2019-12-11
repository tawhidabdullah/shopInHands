// import config
import apiConfig from '../config/apiConfig';

const getApi = async path => {
  const auth = new Buffer(
    apiConfig.consumerKey + ':' + apiConfig.consumerSecret
  ).toString('base64');

  try {
    const response = await fetch(`https://shopinhands.com/wp${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  } catch (err) {
    return err;
  }
};

const postApi = async (path, data) => {
  const auth = new Buffer(
    apiConfig.consumerKey + ':' + apiConfig.consumerSecret
  ).toString('base64');

  try {
    const response = await fetch(`https://shopinhands.com/wp${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response.json();
  } catch (err) {
    return err;
  }
};

export { getApi, postApi };
