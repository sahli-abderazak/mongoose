const express = require('express');
const connectDB = require("./DB/connectDB");
const Person = require("./Model/model")


// Create and Save a Record of a Model
let rzouga= new Person({
    name: "rzouga",
    age: 19,
    favoriteFoods: ["Pizzaaa"],
  });
  const createAndSavePerson = async () => {
    try {
      await rzouga.save();
    } catch (err) {
      handleError(err);
    }
  };

createAndSavePerson()


// Create Many Records with model.create()

let arrayOfPeople = [
    {
      name: "arij",
      age: 19,
      favoriteFoods: [ "Pie"],
    },
    {
      name: "azzabi",
      age: 19,
      favoriteFoods: [ "mlokhiya"],
    },
    {
      name: "wadie",
      age: 28,
      favoriteFoods: [ "kaftaji"],
    },
   
  ];
  const createManyPeople = async () => {
    try {
      await Person.create(arrayOfPeople);
    } catch (err) {
      handleError(err);
    }
  };
  createManyPeople()
  


  // Use model.find() to Search Your Database
  const search = async () => {
    try {
      const data = await Person.find({ name:"arij"});
      console.log(data);
    } catch (err) {
      handleError(err);
    }
  };
  search()


  // Use model.findOne() to Return a Single Matching Document from Your Database
const searchByFood = async () => {
    try {
      const data = await Person.findOne({
        favoriteFoods: ["pizza"] });
      
      console.log(data);
    } catch (err) {
      handleError(err);
    }
  };
  searchByFood()

  // Use model.findById() to Search Your Database By _id
  const searchById = async () => {
    try {
      const data = await Person.findById("625a0ec75268bb72ab67ff72");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
searchById()
// Perform Classic Updates by Running Find, Edit, then Save
const updatePerson = async () => {
    try {
      const data = await Person.findById("625c994cb68349da0e5516a6");
      data.favoriteFoods.push("hamburger");
      data.save();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  updatePerson()
  // Perform New Updates on a Document Using model.findOneAndUpdate()
  const newUpdatePerson = async () => {
    try {
      const data = await Person.findOneAndUpdate({name:"wadie"}, {age: 20}, {new: true});
      console.log(data);
    } catch (err) {
      handleError(err);
    }
  };
  newUpdatePerson()

  // Delete One Document Using model.findByIdAndRemove

const removePerson = async () => {
    try {
      const data = await Person.findByIdAndDelete("625a0ec75268bb72ab67ff72");
      console.log(data);
    } catch (err) {
      handleError(err);
    }
  };
removePerson()

// MongoDB and Mongoose - Delete Many Documents with model.remove()

  const removeManyPeople = async () => {
    try {
      const data = await Person.remove({name:"wadie"});
      console.log(data);
    } catch (err) {
      handleError(err);
    }
  };
removeManyPeople()



// Chain Search Query Helpers to Narrow Search Results
const queryChain = async () => {
  try {
   const data = await Person.find({favoriteFoods: {$all: ["burrito"]}})
   .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec()
  console.log(data);
  } catch (error) {
    handleError(err);
  }}
  queryChain()






connectDB()
const app = express();

const PORT = 3000;

app.listen (PORT,(err) =>{
    err?
    console.log(err)
    :console.log(`server is running in ${PORT}...`);
})


