// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   findDocuments(db, function() {
//      client.close();
//    });
// });
//
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([
//     {
//       name : "apple",
//       score:8,
//       review: "Great fruit"
//     },
//     {
//        name : "Orange",
//        score: 6,
//        review: "Kinda sour"
//     },
//     {
//        name : "Banana",
//        score: 9,
//        review:"Great stuff!"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
//
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits)
//     callback(fruits);
//   });
// }

//, {useNewUrlParser: true, useUnifiedTopology: true}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
   name: {
     type:String,
     required:[true,"please give name"]
   },
   rating: {
     type:Number,
     min: 1,
     max: 10
   },
   review: String
 });

 const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({             //creating a document using the above model Fruit(collections)  which follows a schema which is saved inside the fruitsdb(database)
  // name : "apple",
  rating:10,
   review: "Great fruit"
 });

// fruit.save()

// const kiwi = new Fruit({
//    name : "kiwi",
//    rating:8,
//     review: "Great fruit"
// });
//
// const orange = new Fruit({
//     name : "orange",
//     rating:7,
//      review: "Great fruit"
// });
//
// const banana = new Fruit({
//     name : "banana",
//     rating:3,
//      review: "Great fruit"
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if (err){
//     console.log(err);
//   } else{
//     console.log("Successfully saved all the fruits to fruits db");
//   }
// })


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const strawberry = new Fruit({
  name: "Strawberry",
  rating:9,
  review: "Great Pineapple"
})

// strawberry.save()

// const person = new Person({
//   name:"Shreya",
//   age:22,
//   favoriteFruit:pineapple
// });

// person.save();

Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  } else{
    // console.log(fruits);
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
    mongoose.connection.close();
  }
});

Person.updateOne({name:"Aarya"}, {favoriteFruit:strawberry}, function(err){
  if (err){
    console.log(err);
  } else{
    console.log("Successfully Updated")
  }
})

// Fruit.deleteOne({name:"Peach"}, function(err){
//   if (err){
//     console.log(err);
//   } else{
//     console.log("Successfully Deleted")
//   }
// })

// Person.deleteMany({name:"Aarya"}, function(err){
//   if (err){
//     console.log(err);
//   } else{
//     console.log("Successfully Deleted")
//   }
// })
