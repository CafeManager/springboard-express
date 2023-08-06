const express = require('express')

const app = express()
app.use(express.json())
app.get('/mean', (req, res) => {
    const nums = req.query.nums.split(",")
    const nums_length = nums.length
    let nums_total = 0
    for(let x of nums){
        nums_total += Number(x)
    }
    mean = nums_total/nums_length
    return res.json({response:{ operation: "mean", value: mean}})
})

app.get('/median', (req, res) => {
    const nums = req.query.nums.split(",")
    const nums_length = nums.length
    const isEven = nums_length % 2 == 0 ? true : false 
    let middle;
    if(isEven){
        middle =( Number(nums[nums_length/2]) + Number(nums[((nums_length/2) - 1)]))/2
    } else {
        console.log(nums[nums_length/2])
        middle = Number(nums[Math.ceil((nums_length/2)-1)])
    }
    return res.json({response:{ operation: "median", value: middle}})
})

app.get('/mode', (req, res) => {
    const nums = req.query.nums.split(",")
    const nums_length = nums.length
    let nums_total = 0
    let totals = {}
    let mode = nums[0];

    for(let x in nums){
        convertNum = nums[x]
        if(!totals[convertNum]){
            totals[convertNum] = 1
        } else {
            totals[convertNum] += 1
        }
    }

    for(let curr in totals){
       if(totals[curr] > mode ){
            mode = curr
       } 
    } 

    return res.json({response:{ operation: "mode", value: mode}})
})

app.listen(3002, () => {
    console.log("Now listening on port 3002")
})