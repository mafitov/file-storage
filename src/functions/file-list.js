import s3 from '../utils/s3';
import response from '../utils/response';

exports.handler = async () => {
    try {
        const result = await s3.listFiles();
        return response.success(
            result.Contents.map((file) => ({
                file: file.Key,
                lastModified: file.LastModified,
                size: file.Size
            }))
        );
    } catch (error) {
        return response.serverError(error);
    }
};
