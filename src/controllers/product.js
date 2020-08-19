const Product = require("../models/product");
const Detail = require("../models/details");
const { populate } = require("../models/product");

module.exports = {
// Pido consulta a la base de datos, de manera asincrona y cuando termine,
//le pido que asigne el resultado a la constante "products"
index: async (req, res, next) => {
    const products = await Product.find({});
    res.status(200).json(products);
},

//Post para agregar productos
newProduct: async (req, res, next) => {
    try{
    console.log(req.body)
    const newProduct = new Product({
      nombre: req.body.nombre,
      precio: req.body.precio,
      oferta: req.body.oferta,
      cantidad: req.body.cantidad,
      descripcion: req.body.descripcion,
      details: req.body.details 
    })
    const product = await newProduct.save();
    res.status(200).json(product);
    }catch(e){
    console.log("catch",e)
    next(e)
    }
},

  //Get consulta por Id
getProduct: async (req, res, next) => {
    const { productId } = req.params; // Desde req.params obtengo el ID
    const product = await Product.findById(productId);
    res.status(200).json(product);
},

  //Put -Reemplazo todo un producto-
replaceProduct: async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;
    const oldProduct = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ success: true });
},

  //Patch -Actualizo solo un campo del producto-
updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;
    const oldProduct = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ success: true });
},

  //Delete
deleteProduct: async (req, res, next) => {
    const { productId } = req.params;
    await Product.findByIdAndRemove(productId);
    res.status(200).json({ success: true });
},

  //Se busca por nº Id del producto + /details (no nº id del detalle)
getProductsDetails: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("details");
    res.status(200).json(product);
},

  //Se postea por nº Id del producto, + /details (no nº id del detalle)
  newProductDetail: async (req, res, next) => {
    const { productId } = req.params;
    const newDetail = new Detail(req.body);
    const product = await Product.findById(productId);
    newDetail.seller = product;
    await newDetail.save();
    product.details.push(newDetail);
    await product.save();
    res.status(201).json(newDetail);
},
};

