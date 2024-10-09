const getHome =(req, res) => {
  //  dbDebug("db debug")
    res.send("hello from Hediyeh Naderi");
  
  }
const getHomePost =(req, res) => {
    console.log(req.body)
    res.send("hello from Hediyeh Naderi");
  
  }
module.exports = {getHome , getHomePost}