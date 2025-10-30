import parser from 'lambda-multipart-parser';
import s3 from '../utils/s3';
import response from '../utils/response';
import dynamodb from "../utils/dynamodb";

exports.handler = async (event) => {
    try {
        const data = await parser.parse(event);

        if (data.files[0].content.byteLength > 5000000) {
            return response.validationError('File size exceeded 5Mb');
        }

        const file = await s3.uploadFile(data);
        const resultItem = await dynamodb.createFile(file);

        return response.created(resultItem.Item);
    } catch (error) {
        return response.serverError(error);
    }
};
