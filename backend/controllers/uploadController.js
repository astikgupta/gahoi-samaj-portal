const cloudinary = require('../utils/cloudinary');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert buffer to base64
        const fileStr = req.file.buffer.toString('base64');
        const fileType = req.file.mimetype;
        const base64File = `data:${fileType};base64,${fileStr}`;

        const uploadResponse = await cloudinary.uploader.upload(base64File, {
            folder: 'gahoi_samaj_connect',
            resource_type: 'auto'
        });

        res.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

module.exports = { uploadFile };
