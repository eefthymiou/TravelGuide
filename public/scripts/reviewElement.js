// id -> string 
// user_id -> string
// score -> int
// text -> string
// date -> Date

exports.ReviewElement = function (id, user_id, score=0, text="", date="Σήμερα"){
    this.id = id;
    this.user_id = user_id;
    this.score = score;
    this.text = text;
    this.date = date;
}