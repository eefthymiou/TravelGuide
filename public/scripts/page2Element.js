// Δημιουργός constructor ενός αντικειμένου τύπου Page2

// id -> string
// category -> string [beach, accommodation, food, sights, transportatino]
// name -> string
// description -> string
// images -> array of strings
// info -> array of strings
// location -> string
// reviews -> array of strings

exports.Page2Element = function (id, title="", description="", images=[], info=[], location="", reviews=[]){
    this.id = id;
    this.title = title;
    this.description = description;
    this.images = images;
    this.info = info;
    this.location = location;
    this.reviews = reviews;
}
