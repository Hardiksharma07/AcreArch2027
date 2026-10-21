const Property=require('../models/Property');const{listGoogleDriveMedia}=require('../utils/googleDrive');
async function getPropertyMedia(req,res,next){try{const property=await Property.findOne({id:req.params.id}).select('googleDriveFolderUrl').lean();if(!property)return res.status(404).json({success:false,message:'Property not found'});if(!property.googleDriveFolderUrl)return res.json({success:true,data:[]});res.json({success:true,data:await listGoogleDriveMedia(property.googleDriveFolderUrl)})}catch(error){next(error)}}
async function previewGoogleDriveMedia(req,res,next){try{res.json({success:true,data:await listGoogleDriveMedia(req.body?.folderUrl)})}catch(error){next(error)}}
module.exports={getPropertyMedia,previewGoogleDriveMedia};
