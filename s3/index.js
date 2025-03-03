const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


/**
 * Create a new user = "nodejs" that has no aws console access and their is no other access, create a access key and secretkey for "nodejs" user. => means api call is can make on behalf of "nodejs" user
 */
const client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'nodejs-xyz',
        secretAccessKey: 'nodejs-x1y'
    }
})

async function getObject(key) {
    const command = new GetObjectCommand({
        Bucket: 'private.s3.aws.com',
        Key: key
    });

    const url = await getSignedUrl(S3Client, command);
    return url;
}

async function putObject(filename, contentType) {
    const command = new PutObjectCommand({
        Bucket: "private.s3.aws.com",
        Key: `/upload/video/${filename}`,
        ContentType: contentType

    });

    const url = await getSignedUrl(S3Client, command);
    return url;
}

async function init() {
    // console.log("Url for home.png : ", await getObject('home.png'));
    console.log("Url for upload image/video: ", await putObject(`imgae-${Date.now()}.jpeg`, 'image/jpeg'));
}

init();

// start : node s3/inde.js
// url :                   => remember this, this url is only accessible if "nodejs" user has acces to s3
