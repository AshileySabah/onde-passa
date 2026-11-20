require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
  params: {
    language: 'pt-BR',
  },
});

function simplificarFilme(filme) {
  return {
    id: filme.id,
    titulo: filme.title,
    ano: filme.release_date ? filme.release_date.substring(0, 4) : null,
    nota: Math.round(filme.vote_average * 10) / 10,
    poster: filme.poster_path
      ? `https://image.tmdb.org/t/p/w342${filme.poster_path}`
      : null,
  };
}

function simplificarProvedores(lista) {
  return (lista || []).map((provedor) => ({
    nome: provedor.provider_name,
    logo: `https://image.tmdb.org/t/p/w92${provedor.logo_path}`,
  }));
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ app: 'OndePassa', status: 'online' });
});

app.get('/em-alta', async (req, res) => {
  try {
    const resposta = await tmdbClient.get('/trending/movie/week');
    res.json(resposta.data.results.map(simplificarFilme));
  } catch (erro) {
    console.error(erro);
    res
      .status(502)
      .json({ mensagem: 'Não foi possível consultar o catálogo de filmes.' });
  }
});

app.get('/filmes', async (req, res) => {
  const busca = (req.query.busca || '').trim();

  if (!busca) {
    return res.status(400).json({ mensagem: 'Informe o título de um filme.' });
  }

  console.log(`Busca: ${busca}`);

  try {
    const resposta = await tmdbClient.get('/search/movie', {
      params: { query: busca, include_adult: false },
    });
    res.json(resposta.data.results.map(simplificarFilme));
  } catch (erro) {
    console.error(erro);
    res
      .status(502)
      .json({ mensagem: 'Não foi possível consultar o catálogo de filmes.' });
  }
});

app.get('/filme', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ mensagem: 'Informe o id do filme.' });
  }

  try {
    const resposta = await tmdbClient.get(`/movie/${id}`, {
      params: { append_to_response: 'watch/providers' },
    });
    const filme = resposta.data;
    const brasil = filme['watch/providers']?.results?.BR;

    res.json({
      ...simplificarFilme(filme),
      duracao: filme.runtime || null,
      generos: (filme.genres || []).map((genero) => genero.name),
      sinopse: filme.overview || null,
      fundo: filme.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${filme.backdrop_path}`
        : null,
      ondeAssistir: {
        assinatura: simplificarProvedores(brasil?.flatrate),
        aluguel: simplificarProvedores(brasil?.rent),
        compra: simplificarProvedores(brasil?.buy),
      },
    });
  } catch (erro) {
    if (erro.response?.status === 404) {
      return res.status(404).json({ mensagem: 'Filme não encontrado.' });
    }
    console.error(erro);
    res
      .status(502)
      .json({ mensagem: 'Não foi possível consultar o catálogo de filmes.' });
  }
});

app.listen(3000, () => {
  console.log('Backend do OndePassa no ar. Porta: 3000');
});
