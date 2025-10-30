import AWS from 'aws-sdk';
import ShortUniqueId from 'short-unique-id';

const client = new AWS.DynamoDB.DocumentClient();

export default {
    createFile: async (file) => {
        const id = new ShortUniqueId({length: 10});
        const params = {
            TableName: process.env.FILE_TABLE,
            Item: {
                id: id.rnd(),
                fileName: file.Key,
                location: file.Location
            }
        };
        await client.put(params).promise();
        return params;
    },
    getFiles: () => {
        return client
            .scan({
                TableName: process.env.FILE_TABLE
            })
            .promise();
    },
    getFile: (id) => {
        return client
            .get({
                TableName: process.env.FILE_TABLE,
                Key: {
                    id: id
                }
            })
            .promise();
    },
    deleteFile: (id) => {
        return client
            .delete({
                TableName: process.env.FILE_TABLE,
                Key: {
                    id: id
                }
            })
            .promise();
    }
};
