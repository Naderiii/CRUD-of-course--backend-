const authentication = ((req, res, next) => {
    console.log("authentication");
    next();
})
