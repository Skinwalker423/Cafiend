

export default function iLoveDogs (req,res) {
    const dataBody = req.query.breed;
    console.log(dataBody);
    res.status(200).json({message: `I love ${dataBody}`})
}