import fs from 'fs';
import S3 from 'aws-sdk/clients/s3.js';

const bucketName = "materialbuy"
const region = "ap-south-1"
const accessKeyId = " AKIATWA37OUIBRGVJG6T"
const secretAccessKey = "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"

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
export const uploadFile = (file) => {
    console.log(file.path)
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}


// downloads a file from s3
export const getFileStream = (fileKey) => {
    console.log(fileKey);
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
