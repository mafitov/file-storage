import s3 from '../utils/s3';
import response from '../utils/response';
import dynamodb from "../utils/dynamodb";

exports.handler = async (event) => {
    try {
        const id = event.pathParameters.id;

        const fileResult = await dynamodb.getFile(id);
        if (!fileResult.Item) {
            return response.notFoundError('File not found');
        }

        await dynamodb.deleteFile(fileResult.Item.id);
        await s3.deleteFile(fileResult.Item.fileName);

        return response.noContent();
    } catch (error) {
        return response.serverError(error);
    }
};
