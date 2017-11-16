var express=require("express");
var app=express();

var mongojs=require("mongojs");
var db=mongojs('contactlist', ['contactlist']);

var bodyParser=require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function (req, res) {
   console.log("Received GET Request");
   db.contactlist.find(function (err, docs) {
   res.json(docs);
   })
});

app.post('/contactList', function (req, res) {
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    })
});

app.delete('/contactList/:id', function (req, res) {
   var id=req.params.id;
    db.contactlist.remove({ _id : mongojs.ObjectId(id)}, function (err, doc){
       res.json(doc);
   })
});

app.get('/contactList/:id', function (req, res) {
    var id=req.params.id;
    db.contactlist.findOne({ _id : mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    })
});

app.put('/contactList/:id', function (req, res) {
    var id=req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify(
        {
         query:
            {_id: mongojs.ObjectId(id)},
         update:
            {$set:
                {name: req.body.name, email: req.body.email, number: req.body.number}
            },
         new:true
        },
        function (err, doc) {
            res.json(doc);
        });
});

app.listen(3000);
console.log("Server Running at Localhost:3000");