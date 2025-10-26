# File Storage Service

A lightweight Serverless-based file management service built on **AWS Lambda**, **API Gateway**, and **S3**.  
It enables file upload and listing capabilities with public access support, ideal for use in microservice ecosystems.

## Overview

The **File Storage Service** provides a simple RESTful API to manage files stored in an S3 bucket.  
It allows:
- **Uploading** files via HTTP POST
- **Listing** existing files via HTTP GET
- **Deleting** files via HTTP DELETE

## Architecture

The service leverages AWS-managed infrastructure for scalability and security:

- **AWS Lambda (Node.js 20)** — Processes upload and list requests.
- **Amazon S3** — Stores uploaded files.
- **API Gateway (HTTP API)** — Provides REST endpoints.
- **IAM Roles** — Controls access to S3 resources.

## Functions

| Function | Path | Method | Handler | Description |
|-----------|------|---------|----------|--------------|
| **file-create** | `/` | `POST` | `src/functions/file-create.handler` | Uploads a new file to S3 |
| **file-list** | `/` | `GET` | `src/functions/file-list.handler` | Lists all files in the bucket |
| **file-delete** | `/{fileName}` | `DELETE` | `src/functions/file-delete.handler` | Deletes a specific file by name |

## Resources

### S3 Bucket
Creates an S3 bucket named `${self:service}-${sls:stage}-files` with relaxed public access settings for development environments.

### Bucket Policies
- **Public Read**: Allows `s3:GetObject` for all users (for testing; disable in production)
- **List Access**: Allows `s3:ListBucket`

## Example Usage

### Upload a File
```bash
curl -X POST   -H "Content-Type: multipart/form-data"   -F "file=@example.txt"   https://{api-id}.execute-api.{region}.amazonaws.com/
```

### List Files
```bash
curl https://{api-id}.execute-api.{region}.amazonaws.com/
```

**Example Response:**
```json
[
  {
    "fileName": "example.txt",
    "LastModified": "2025-10-26T19:22:15.000Z",
    "Size": 1234
  }
]
```

### Delete a File
```bash
curl -X DELETE https://{api-id}.execute-api.{region}.amazonaws.com/example.txt
```

**Response:**
```json
{
  "message": "File 'example.txt' deleted successfully"
}
```

## Deployment

To deploy the service:

```bash
serverless deploy
```

To remove all resources (including S3 bucket):

```bash
serverless remove
```

## Notes

- The S3 bucket is deleted automatically with the stack (`DeletionPolicy: Delete`).
- Public access is enabled only for `GetObject` (for demo purposes).
- Use the `stage` variable (`dev`, `prod`, etc.) to isolate environments.
- Ensure you secure the DELETE endpoint in production (e.g., via Cognito or IAM).
