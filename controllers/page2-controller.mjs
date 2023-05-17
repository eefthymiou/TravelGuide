const title = 'fda';
const description = "είναι μια πολύ ωραία παραλία";

export async function createPage2(req, res) {
    // console.log(req.query)
    let id = req.query.id;
    try {
        res.render('page2', {style: 'page2.css'});
    }
    catch (error) {
        res.send(error);
    }
};

