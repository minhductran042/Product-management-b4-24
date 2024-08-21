const Setting = require("../../models/setting.model");
// [GET] /admin/setting/general
module.exports.general = async (req,res) => {

    const setting = await Setting.findOne({});

    console.log(setting);

    res.render("admin/pages/setting/general", {
        pageTitle: "Cài đặt chung"
    });
}

// [PATCH] /admin/setting/general
module.exports.generalPatch = async (req,res) => {

    const setting = await Setting.findOne({});

    if(setting) {
        await Setting.updateOne({
            _id: setting.id,
        }, req.body);
    } else {
        const record = new Setting(req.body);
        await record.save();
    }
    res.redirect(`back`);
};
