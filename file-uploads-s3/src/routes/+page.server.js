import { S3Client, ListBucketsCommand, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ACCOUNT_ID = '5eb629e1dd87f836923d20a3bea21935'
const ACCESS_KEY_ID = '222719c83a888b8a708d0323ec161a2f'
const SECRET_ACCESS_KEY = '3073a918bf1ae4e23a64287d8ef044bf5804942034cf20762f12e90bb65ee12a'

const S3 = new S3Client({
	region: "auto",
	endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
	},
});

const BUCKET = 'temp'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const bucket = await S3.send(new ListObjectsV2Command({ Bucket: BUCKET }));

	return { objects: bucket.Contents ?? [] };
}

/** @type {import('./$types').Actions} */
export const actions = {
	async delete(event) {
		const data = await event.request.formData();

		const file = data.get('file');

		if (!file) {
			return
		}
	}
};
