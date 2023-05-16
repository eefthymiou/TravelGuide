const title = 'fda';
const description = "είναι μια πολύ ωραία παραλία";

const createPage2 = (req, res) => {
    // console.log(req.query)
    let id = req.query.id;

    res.render('page2', {title: title, description: description, style: 'page2.css' });
};

export default { createPage2 };