//Image Storage Engine

// Importing multer for handling file uploads
const multer = require('multer')

// Importing path module for working with file paths
const path = require('path')

// Configuring disk storage engine for multer
const storage = multer.diskStorage({
    // Destination where uploaded files will be stored
    destination: "./Upload/images",
    // Generating a unique filename for uploaded files
    filename: (req, file, cb) => {
        // Constructing filename with the field name, current timestamp, and original file extension
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Creating an upload instance with the configured storage engine
const upload = multer({ storage: storage });

// Exporting the upload instance to be used elsewhere in the application
module.exports = upload;
