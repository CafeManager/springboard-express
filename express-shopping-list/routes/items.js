const express = require("express");
const router = new express.Router();
const items = require("../fakeDB");
const ExpressError = require("../expressError");

router.get("/", function(req, res) {
    return res.json(items)
})

router.get("/:name", function(req, res, next) {
    try{     
        for(itemIndex in items){
            if(items[itemIndex].name == req.params.name){
                return res.json(items[itemIndex])
            }
        
        }
        throw new ExpressError("No match found!", 404)}
    catch (err){
        next(err)
    } 
})

router.post("/", function(req, res, next) {
    try{ 
        items.push({
        "name": req.body.name,
        "price": req.body.price
        })
    } catch (err) {
        next(new ExpressError(err))
    }
    return res.json({"added": {
        "name": req.body.name,
        "price": req.body.price
    }})
})

router.patch("/:name", function(req, res, next) {
    
    for(itemIndex in items){
        if(items[itemIndex]["name"] == req.params.name){
            items.splice(itemIndex, 1, req.body)
            return res.json({"updated" : items[itemIndex]})
        }
    }
    throw new ExpressError("Item not found", 404)
})

router.delete("/:name", function(req, res, next) {
    try{
    for(itemIndex in items){
        if(items[itemIndex]["name"] == req.params.name){
            items.splice(itemIndex, 1)
            return res.json({"message": "Deleted"})
        } 
    }
    throw new ExpressError("Item not in database", 404)}
     catch (err) {
        next(new ExpressError(err))
    
    }
})


module.exports = router