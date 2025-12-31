export default {
  async fetch(request, env) {
    return new Response('Worker deployed — static site available from the `site.bucket`.', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    })
  }
}
