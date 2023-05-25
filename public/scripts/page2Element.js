// Δημιουργός constructor ενός αντικειμένου τύπου Page2

const { get } = require("mongoose");

// id -> string
// category -> string [beach, accommodation, food, sights, transportatino]
// name -> string
// description -> string
// images -> array of strings
// info -> array of strings
// location -> string
// reviews -> array of strings

exports.Page2Element = function (
        id, 
        title="", 
        description="", 
        images=[], 
        info=[], 
        map="https://maps.google.com/maps?q=$Κουφονήσια&t=&z=13&ie=UTF8&iwloc=&output=embed",
        reviews=[], 
        avgRating=0)
    {

    this.id = id;
    this.title = title;
    this.description = description;
    this.images = images;
    this.info = info;
    this.map = map;
    this.reviews = reviews;
    this.avgRating = avgRating;
}
