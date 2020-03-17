import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  try {
    const result = await fetch(`${process.env.BO_API_ENDPOINT}/user/${req.query.googleId}/role`);
    const json = await result.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};
