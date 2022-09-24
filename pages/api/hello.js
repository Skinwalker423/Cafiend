// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const dataBody = req.query;
  console.log("this is a test", dataBody);
  res.status(200).json({ name: 'John Doe'})
}
