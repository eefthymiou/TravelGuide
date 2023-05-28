const model = await import('../model/mongodb/mongodb.mjs');

export async function createPage1(req, res){
    let category = req.query.category;
    let title;
    if (category === 'beaches') { title = 'Παραλίες';}  
    else if (category === 'sights') { title = 'Αξιοθέατα';}
    else if (category === 'accomm') { title = 'Διαμονή';}
    else if (category === 'transport') { title = 'Μετακινήσεις';}
    else if (category === 'food') { title = 'Φαγητό';}
    
    try {
      let locations = await model.getLocations(category);
      let admin = false;
      if (req.session.user != null) {
        admin = await model.isAdmin(req.session.user);
      }
      res.render('page1', {username:req.session.username, admin:admin, title: title, cards: locations, style: 'page1.css' ,category: category});
    }
    catch (error) {
      res.send(error);
    }
};
