import { S3 } from 'aws-sdk';

export const envVariables = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  AWS: {
    publicKey: process.env.ACCESS_KEY_ID,
    privateKey: process.env.PRIVATE_KEY_ID,
    bucketName: process.env.BUCKET_NAME,
  },
  uploads: {
    path: process.env.UPLOADS_PATH,
  },
});

export const S3Options: S3.Types.ClientConfiguration = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.PRIVATE_KEY_ID,
};
