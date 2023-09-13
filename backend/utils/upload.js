
const multer=require('multer');
const {GridFsStorage}=require('multer-gridfs-storage');
const dotenv=require('dotenv');
dotenv.config();
const Username=process.env.DB_USERNAME;
const Password=process.env.DB_PASSWORD;
const url = `mongodb+srv://${Username}:${Password}@cluster0.lzpkgz9.mongodb.net/`;
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
      const match=['image/jpeg'];
        if(match.indexOf(file.mimetype)===-1){
            const filename=`${Date.now()}-chatgram-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: 'photos',
            filename: `${Date.now()}-chatgram-${file.originalname}`
            };
    }
  });
  const upload = multer({ storage });
module.exports={upload};