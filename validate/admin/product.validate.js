module.exports.createPost = async (req,res) => {
    if(!req.body.title){
        req.flash("error","Tiêu đề không được để trống!");
        res.redirect("back");
        return;
    }
}