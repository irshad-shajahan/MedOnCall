const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const doctorModel = require("./models/doctorModel");
const dotenv = require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccess_key = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccess_key,
  },
  region: bucketRegion,
});

const uploadToS3 = async (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
  }).single("image");

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const fileContent = req.file.buffer;
    const params = {
      Bucket: bucketName,
      Key: req.params.id + ".jpg",
      Body: fileContent,
    };

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      next();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
};

async function getImage(req, res, next) {
  const doc = await doctorModel.findById(req.params.id);
  const getObjectParams = {
    Bucket: bucketName,
    Key: doc.additionalDetails.profileImage,
  };
  try {
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    req.body.url = url
    next()
  } catch (error) {
    res.status(500).send({message:"There was an error while fetching the image from the s3 bucket",success:false})
    console.log(error);
  }
}

module.exports = { uploadToS3, getImage };
