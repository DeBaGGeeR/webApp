const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//upload image
router.post('/upload',auth, authAdmin, (req, res) => {
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length===0)
            return res.status(400).json({msg:'No files were uploaded'})

        const file = req.files.file;
        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:'File size limit exceeded'})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:'File format is incorrect'})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath,{folder: "ecommerce"}, async (err,result) =>{
            if(err) throw err;
            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
})

router.post('/destroy',auth, authAdmin,(req,res) =>{
    try {
        const {public_id} =req.body
        if(!public_id) return res.status(400).json({msg:'No images selected'})
        cloudinary.v2.uploader.destroy(public_id, async (err,result)=>{
            if(err) throw err

            res.json({msg:'image deleted'})
        })
    }catch (err) {
        return res.status(500).json({msg:err.message})
    }
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err
    })
}
module.exports = router