
// const upload=require('./../utils/upload.js');
const grid=require('gridfs-stream');
const mongoose=require('mongoose');

const conn=mongoose.connection;
let gfs,gridFSBucket;
conn.once('open',()=>{
    gridFSBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs',
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection("fs");
});

const url="http://localhost:8000";
const uploadFile=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:"Please upload a file"});
        }
        const imgUrl=`${url}/file/${req.file.filename}`;
        return res.status(200).json(imgUrl);
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const getImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        const file = await gfs.files.findOne({ filename: filename });
        
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        
        const readStream = gridFSBucket.openDownloadStream(file._id); // Use gridFSBucket here
        readStream.pipe(res);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports={uploadFile,getImage};