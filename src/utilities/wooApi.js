// import config
import apiConfig from '../config/apiConfig';
import axios from 'axios';

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

const postApi = async (path, data, type = 'notAuth') => {
  const auth = new Buffer(
    apiConfig.consumerKey + ':' + apiConfig.consumerSecret
  ).toString('base64');

  const headersWithOutBasicAuth = {
    'Content-Type': 'application/json'
  };

  const headersWithBasicAuth = {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios({
      method: 'post',
      headers:
        type === 'notAuth' ? headersWithBasicAuth : headersWithOutBasicAuth,
      data,
      url: `https://shopinhands.com/wp${path}`
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export { getApi, postApi };
