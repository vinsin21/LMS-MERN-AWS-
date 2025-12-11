import { S3Client, PutObjectCommand, } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { S3ImagePrefix } from '../constants.js'
import { ApiError } from './ApiError.js'


const s3 = new S3Client({
    region: process.env.AWS_REGION,
})

export const uploadToS3Avatar = async (mimeType) => {
    try {
        const prefix = S3ImagePrefix.AVATAR;

        let ext = 'jpg';
        if (mimeType === 'image/png') ext = 'png';
        if (mimeType === 'image/jpeg') ext = 'jpg';
        if (mimeType === 'image/webp') ext = 'webp';

        const id = crypto.randomUUID();

        const key = `${prefix}/${id}.${ext}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            ContentType: mimeType,
        })

        const uploadUrl = await getSignedUrl(s3, command, {
            expiresIn: 60
        })

        return {
            uploadUrl,
            key
        }

    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while uploading to S3", error);
    }
}



// https://github.com/ed-roh/learning-management/tree/master/server
/*
cors for s3 bucket
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>https://your-frontend-domain.com</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <ExposeHeader>ETag</ExposeHeader>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>



While developing locally, you can temporarily use:
<AllowedOrigin>http://localhost:5173</AllowedOrigin>

*/