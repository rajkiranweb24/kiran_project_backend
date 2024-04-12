const Firm = require('../model/Firm');
const Vendor = require('../model/Vendor')
const multer = require('multer')


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where uploaded files will be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate a unique name for the uploaded file
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {

    try {
        const { firmName, area, category, region, offer } = req.body
        const image = req.file ? req.file.filename : undefined


        const vendor = await Vendor.findById(req.vendorId)
        if (!vendor) {
            return res.status(404).json({ message: "vendor not found" })
        }
        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        const savedFirm = await firm.save()
        vendor.firm.push(savedFirm)
        await vendor.save()
        return res.status(200).json({ message: "Firm Added Successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }


}

module.exports = {
    addFirm: [upload.single('image'), addFirm]
}