function errorHandler(err, req, res, next) {
  console.error('Erro:', err.message);

  if (err.name === 'MulterError') {
    return res.status(400).json({ error: `Upload invalido: ${err.message}` });
  }

  if (
    err.message?.includes('openrouter') ||
    err.message?.includes('gpt-image') ||
    err.message?.includes('OpenAI') ||
    err.message?.includes('image')
  ) {
    return res.status(502).json({
      error: 'Erro no servico de geracao de imagem. Tente novamente.',
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Erro interno do servidor',
    timestamp: new Date(),
  });
}

module.exports = errorHandler;