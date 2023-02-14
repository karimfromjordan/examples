import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';

const DIR = 'files';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const file_path = path.normalize(path.join(DIR, params.name));

	if (!fs.existsSync(file_path)) {
		return new Response('not found', { status: 404 });
	}

	const stats = fs.statSync(file_path);

	const headers = {
		'Content-Type': mimes.lookup(file_path),
		'Content-Length': stats.size,
		'Last-Modified': stats.mtime.toUTCString(),
		'Cache-Control': 'max-age=31536000, must-revalidate, immutable'
	};

	const body = stream.Readable.toWeb(fs.createReadStream(file_path));

	return new Response(body, { headers });
}

const mimes = {
	// Text
	txt: 'text/plain',
	pdf: 'application/pdf',
	// Images
	webp: 'image/webp',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	avif: 'image/avif',
	// Audio
	mp3: 'audio/mp3',
	// Video
	webm: 'video/webm',
	mp4: 'video/mp4',

	lookup(string) {
		const ext = string.trim().toLowerCase().split('.').at(-1);
		return this[ext] ?? 'application/octet-stream';
	}
};
