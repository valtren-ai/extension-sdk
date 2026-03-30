export default async function register({ app }) {
  app.get('/api/ext/__NAME__/health', async () => ({
    ok: true,
    service: '__NAME__',
  }));

  app.post('/api/ext/__NAME__/review', async (request) => {
    return {
      ok: true,
      extension: '__NAME__',
      message: 'Replace this placeholder with your org-specific proof-of-concept logic.',
      input: request.body || null,
    };
  });
}
