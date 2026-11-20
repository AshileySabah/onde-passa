import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carregando from './Carregando';
import backendClient from '../utils/backendClient';
import { formatarDuracao, formatarNota } from '../utils/formatacao';

export default function DetalhesFilme({ id, onVoltar }) {
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    backendClient
      .get('/filme', { params: { id } })
      .then((resposta) => {
        setFilme(resposta.data);
        setCarregando(false);
      })
      .catch((falha) => {
        setErro(falha.response?.data?.mensagem || 'Não foi possível carregar os detalhes.');
        setCarregando(false);
      });
  }, [id]);

  function renderizarConteudo() {
    if (carregando) {
      return <Carregando mensagem="Carregando os detalhes..." />;
    }
    if (erro) {
      return <Text style={styles.erro}>{erro}</Text>;
    }

    const informacoes = [filme.ano, formatarDuracao(filme.duracao), ...filme.generos]
      .filter((informacao) => informacao)
      .join(' · ');

    return (
      <ScrollView contentContainerStyle={styles.rolagem}>
        {filme.fundo && <Image source={{ uri: filme.fundo }} style={styles.fundo} />}
        <View style={styles.corpo}>
          {filme.poster ? (
            <Image source={{ uri: filme.poster }} style={styles.poster} />
          ) : (
            <View style={[styles.poster, styles.semPoster]}>
              <Text style={styles.semPosterTexto}>Sem pôster</Text>
            </View>
          )}
          <Text style={styles.titulo}>{filme.titulo}</Text>
          <Text style={styles.informacoes}>{informacoes}</Text>
          <Text style={styles.nota}>{formatarNota(filme.nota)}</Text>
          <Text style={styles.secao}>Sinopse</Text>
          <Text style={styles.sinopse}>{filme.sinopse || 'Sinopse indisponível.'}</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.voltar} onPress={onVoltar}>
        <Text style={styles.voltarTexto}>‹ Voltar</Text>
      </Pressable>
      {renderizarConteudo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  voltar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  voltarTexto: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
  },
  erro: {
    color: '#ff6b6b',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  rolagem: {
    paddingBottom: 16,
  },
  fundo: {
    width: '100%',
    height: 180,
  },
  corpo: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
  semPoster: {
    backgroundColor: '#555560',
    alignItems: 'center',
    justifyContent: 'center',
  },
  semPosterTexto: {
    color: '#e0e0e8',
    fontSize: 11,
    textAlign: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  informacoes: {
    fontSize: 14,
    color: '#9a9aa8',
    marginTop: 6,
  },
  nota: {
    fontSize: 15,
    color: '#f5c518',
    marginTop: 6,
  },
  secao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 6,
  },
  sinopse: {
    fontSize: 14,
    color: '#c8c8d4',
    lineHeight: 20,
  },
});
