# File Storage Service

A lightweight Serverless-based file management service built on **AWS Lambda**, **API Gateway**, **DynamoDB** and **S3**.  
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
- **DynamoDB** - Stores files metadata.
- **Amazon S3** — Stores uploaded files.
- **API Gateway (HTTP API)** — Provides REST endpoints.
- **IAM Roles** — Controls access to S3 resources.

## Functions

| Function | Path          | Method | Handler | Description |
|-----------|---------------|---------|----------|--------------|
| **file-create** | `/files`      | `POST` | `src/functions/file-create.handler` | Uploads a new file to S3 |
| **file-list** | `/files`      | `GET` | `src/functions/file-list.handler` | Lists all files in the bucket |
| **file-delete** | `/files/{id}` | `DELETE` | `src/functions/file-delete.handler` | Deletes a specific file by name |

## Resources

### DynamoDB Table
A DynamoDB table named `${self:service}-${sls:stage}-files` to store metadata.

### S3 Bucket
Creates an S3 bucket named `${self:service}-${sls:stage}-files` with relaxed public access settings for development environments.

### Bucket Policies
- **Public Read**: Allows `s3:GetObject` for all users (for testing; disable in production)
- **List Access**: Allows `s3:ListBucket`

## Example Usage

### Upload a File
```bash
curl -X POST   -H "Content-Type: multipart/form-data"   -F "file=@example.txt"   https://{api-id}.execute-api.{region}.amazonaws.com/files
```

### List Files
```bash
curl https://{api-id}.execute-api.{region}.amazonaws.com/files
```

### Delete a File
```bash
curl -X DELETE https://{api-id}.execute-api.{region}.amazonaws.com/files/{file-id}
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
