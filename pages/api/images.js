import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

import { getQueryString } from '../../src/utils/helpers';

const { publicRuntimeConfig } = getConfig();

export default async (req, res) => {
  try {
    const queryString = getQueryString(req.query);
    const url = `${publicRuntimeConfig.BO_API_ENDPOINT}/images?${queryString}`;
    const result = await fetch(url);
    const json = await result.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};
