import s3 from '../utils/s3';
import response from '../utils/response';

exports.handler = async (event) => {
    try {
        const fileName = event.pathParameters.fileName;

        await s3.deleteFile(fileName);

        return response.noContent();
    } catch (error) {
        return response.serverError(error);
    }
};
