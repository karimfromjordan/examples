/** @type {import('./$types').Actions} */
export const actions = {
  async create(event) {
    const data = await event.request.formData();

    const text = data.get('text');

    console.log(text);

    return { success: true }
  }
};