function homeController(){
    return {//home is a function we does not need to mention the function key word inside return
        home(req,res) {
            res.render('home/home')
        }
    }
}

module.exports = homeController;