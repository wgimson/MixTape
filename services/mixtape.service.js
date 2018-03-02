// Gettign the Newly created Mongoose Model we just created
var MixTape = require("../models/mixtape.model");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getMixTapes = async function(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit
  };

  // Try Catch the awaited promise to handle the error

  try {
    var mixtapes = await MixTape.paginate(query, options);

    // Return the mixtape list that was retured by the mongoose promise
    return mixtapes;
  } catch (e) {
    // return a Error message describing the reason
    throw Error("Error while Paginating mixtape");
  }
};

exports.createMixTape = async function(mixtape) {
  // Creating a new Mongoose Object by using the new keyword
  var newMixTape = new MixTape({
    title: mixtape.title,
    description: mixtape.description,
    date: new Date(),
    status: mixtape.status
  });

  try {
    // Saving the mixtape
    var savedMixTape = await newMixTape.save();

    return newMixTape;
  } catch (e) {
    // return a Error message describing the reason
    throw Error("Error while Creating mixtape");
  }
};

exports.updateMixTape = async function(mixtape) {
  var id = mixtape.id;

  try {
    //Find the old mixtape Object by the Id

    var oldMixTape = await MixTape.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the mixtape");
  }

  // If no old mixtape Object exists return false
  if (!oldMixTape) {
    return false;
  }

  console.log(oldMixTape);

  //Edit the mixtape Object
  oldMixTape.title = mixtape.title;
  oldMixTape.description = mixtape.description;
  oldMixTape.status = mixtape.status;

  console.log(oldMixTape);

  try {
    var savedMixTape = await oldMixTape.save();
    return savedMixTape;
  } catch (e) {
    throw Error("And Error occured while updating the mixtape");
  }
};

exports.deleteMixTape = async function(id) {
  // Delete the mixtape
  try {
    var deleted = await MixTape.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("mixtape Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the mixtape");
  }
};
