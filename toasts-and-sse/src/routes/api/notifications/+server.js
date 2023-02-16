function create_message(message) {
  return Object.entries(message).map(([key, value]) => `${key}: ${value}`).join("\n") + "\n\n";
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  let interval;

  const body = new ReadableStream({
    start(controller) {
      interval = setInterval(() => {
        const message = create_message({
          data: JSON.stringify({ type: 'success', text: 'Server Sent Events are fun! 🎉' }),
        });

        controller.enqueue(message);
      }, 5000);
    },
    cancel() {
      clearInterval(interval);
    }
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}