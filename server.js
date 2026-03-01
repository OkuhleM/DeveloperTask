const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/sort-word', (req,res)=> {

    const {data} = req.body;
    console.log('data', data)
    if(!data) {
        console.log('data', data)
        return res.status(400).json({error: "Missing Data Field"})
    }

    if(typeof data !== "string"){
        console.log('data', data)
       return res.status(400).json({Error: " 'data' must be string "})
    }

      const charArray = data.split("");
      console.log('charArray', charArray)

      const sortArray = charArray.sort((a,b) => a.localeCompare(b))

      return res.status(200).json({word: sortArray});

})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})