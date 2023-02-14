import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';

import { fail, redirect } from '@sveltejs/kit';

const DIR = 'files';

if (!fs.existsSync(DIR)) {
	fs.mkdirSync(DIR, { recursive: true });
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const files = fs.readdirSync(DIR);

	return { files };
}


/** @type {import('./$types').Actions} */
export const actions = {
	async upload(event) {
		const data = await event.request.formData();

		const file = data.get('file');

		if (!file) {
			return fail(400, { error: 'file:missing' });
		}

		if (file instanceof File === false) {
			return fail(400, { error: 'file:invalid' });
		}

		if (file.size === 0) {
			return fail(400, { error: 'file:too_small' });
		}

		// `array.at(-1)` gets the last element of `array`
		const file_extension = file.name.split('.').at(-1);
		const file_name = `${get_random_string()}.${file_extension}`;
		const wstream = fs.createWriteStream(path.join(DIR, file_name));

		// Convert Web `ReadableStream` to a Node.js `Readable` stream
		const web_rstream = file.stream();
		const nodejs_rstream = stream.Readable.fromWeb(web_rstream);
		// Write file to disk
		nodejs_rstream.pipe(wstream);

		throw redirect(303, '/');
	},
	async delete(event) {
		const data = await event.request.formData();

		const file = data.get('file');

		if (!file) {
			return
		}

		const file_path = path.normalize(path.join(DIR, file));

		if (!fs.existsSync(file_path)) {
			return
		}

		fs.unlinkSync(file_path);

		throw redirect(303, '/');
	}
};

// This function uses the Web Crypto API in the browser, Deno and Node.js
function get_random_string(length = 10) {
	let string = '';

	while (string.length < length) {
		const [random] = Array.from(crypto.getRandomValues(new BigUint64Array(1)));
		string += random.toString(36);
	}

	return string.substring(0, length);
}
