
async function testapi(req,res){
    return res.json({msg:"worked"})
};

module.exports = {
    testapi,
}