import AWS from 'aws-sdk';

const client = new AWS.S3();

export default {
    uploadFile: (data) => {
        const params = {
            Bucket: process.env.FILE_BUCKET,
            Key: data.files[0].filename,
            ContentType: data.files[0].contentType,
            Body: data.files[0].content
        };
        return client.upload(params).promise();
    },
    listFiles: () => {
        const params = {
            Bucket: process.env.FILE_BUCKET
        };
        return client.listObjects(params).promise();
    },
    deleteFile: (filename) => {
        const params = {
            Bucket: process.env.FILE_BUCKET,
            Key: filename
        };
        return client.deleteObject(params).promise();
    }
};
