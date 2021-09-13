const Products = require('../models/productModel')
class ApiFeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObject = {...this.queryString}
        console.log({before: queryObject})

        const excludedFields = ['page','sort','limit']
        excludedFields.forEach(el=>delete(queryObject[el]))

        let queryStr= JSON.stringify(queryObject)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=> '$' + match)

        console.log({queryStr})
        this.query.find(JSON.parse(queryStr))
        
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort(('-createdAt'))
        }
        return this
    }
    paginating(){
        const page = this.queryString.page *1||1
        const limit = this.queryString.page *1||9
        const skip = (page-1)*limit;
        this.query=this.query.skip(skip).limit(limit)
        return this
    }
}
const productCtrl = {
    getProduct: async (req,res) => {
        try {
            const features = new ApiFeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const product = await features.query
            res.json({
                status:"success",
                result: product.length,
                products: product})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    createProduct: async (req,res) => {
        try {
            const {product_id,title,price,description,content,images,category} = req.body;
            if(!images) return res.status(400).json({msg:"No images uploaded"})

            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg:"Product already exist"})

            const newProduct = new Products({
                images,
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                category
            })
            await newProduct.save()
            res.json({msg:'Created a product'})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    updateProduct: async (req,res) => {
        try {
            const {title,price,description,content,images,category} = req.body;
            if(!images) return res.status(400).json({msg:'Image not uploaded'})

            await Products.findByIdAndUpdate({_id: req.params.id},{title: title.toLowerCase(),price,description,content,images,category})
            res.json({msg:'Updated the product'})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    deleteProduct: async (req,res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:'Deleted a product'})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = productCtrl