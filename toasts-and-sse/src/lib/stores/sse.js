import { writable } from "svelte/store";

function create_sse_store() {
  const { subscribe, set } = writable();

  let event_source;

  return {
    subscribe,

    connect(endpoint = '/api/notifications') {
      event_source = new EventSource(endpoint);
      
      event_source.onmessage = (event) => {    
        set(JSON.parse(event.data));
      }
    }
  }
}

const sse_store = create_sse_store();

export default sse_store;