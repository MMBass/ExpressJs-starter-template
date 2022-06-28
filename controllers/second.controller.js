
const get = async (req, res) => {
    try {
        res.send('success');
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

}

module.exports = { get };