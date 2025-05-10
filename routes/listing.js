const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })

const listingController=require("../controllers/listings.js");

router
  .route("/")
   .get(wrapAsync(listingController.index))//index route
    .post(
      isLoggedIn,
      upload.single('listing[image]'),
      validateListing,
     wrapAsync(listingController.createListing))//Create route
      
//new route
router.get("/new",isLoggedIn,
    wrapAsync(listingController.renderNewForm)
);

router
    .route("/:id")
     .get(wrapAsync(listingController.showListing))//show route
     .put(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        isOwner,
        wrapAsync(listingController.updateListing))//update route

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//delete route
router.delete("/:id",isLoggedIn,wrapAsync(listingController.destroyListing));

module.exports= router;