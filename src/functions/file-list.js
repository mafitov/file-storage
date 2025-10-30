import response from '../utils/response';
import dynamodb from "../utils/dynamodb";

exports.handler = async () => {
    try {
        const result = await dynamodb.getFiles();
        return response.success(result.Items);
    } catch (error) {
        return response.serverError(error);
    }
};
