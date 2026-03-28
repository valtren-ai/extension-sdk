export default async function register(app) {
  app.get('/health', async () => ({
    ok: true,
    service: '__NAME__',
  }));

  app.post('/review', async (request) => {
    return {
      ok: true,
      extension: '__NAME__',
      message: 'Replace this placeholder with your org-specific proof-of-concept logic.',
      input: request.body || null,
    };
  });
}
