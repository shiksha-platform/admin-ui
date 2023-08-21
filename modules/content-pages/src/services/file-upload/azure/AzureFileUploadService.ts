//to upload an image

import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class AzureFileUploadService {

    //member definitions
    private blobServiceClient: BlobServiceClient;
    private containerClient: ContainerClient;

    constructor() {
        this.blobServiceClient = new BlobServiceClient(process.env.REACT_APP_AZURE_SAS_URL as string);
        this.containerClient = this.blobServiceClient.getContainerClient(process.env.REACT_APP_AZURE_CONTAINER_NAME as string);
    }

    uploadFile = async (file: File) => {
        try {
            const fileName = `${new Date().getTime().toString()}.${file.name.split('.').pop()}`;
            const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);

            await blockBlobClient.uploadBrowserData(file);
            const blobUrl = `https://${blockBlobClient.accountName}.blob.core.windows.net/${blockBlobClient.containerName}/${fileName}`;
            return blobUrl;
        }
        catch (error: any) {
            throw new Error(error);
        }
    }
}
