var MongoClient= require('mongodb').MongoClient;

var url= 'mongodb://localhost:27017'
var dbname= 'tiendaEllasYNosotras'
var db

function connect(callback){
    console.log("...conectando...")
    // MongoClient.connect(url, { useNewUrlParser: true } , function(err, _db) {
        MongoClient.connect(url, { useUnifiedTopology: true } , function(err, _db) {
        if (err) throw err
        console.log("Mongo DB Connected")
        db=_db.db(dbname)
        callback(db)        
    })
}
function close(){
    db.close()
}
exports.connect=connect;
exports.close=close;
exports.urt=url