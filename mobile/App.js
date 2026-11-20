import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import Carregando from './src/components/Carregando';
import Busca from './src/components/Busca';
import ListaFilmes from './src/components/ListaFilmes';
import DetalhesFilme from './src/components/DetalhesFilme';
import backendClient from './src/utils/backendClient';

export default function App() {
  const [emAlta, setEmAlta] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termo, setTermo] = useState('');
  const [termoBuscado, setTermoBuscado] = useState('');
  const [resultados, setResultados] = useState(null);
  const [mensagemCarregando, setMensagemCarregando] = useState('Buscando os filmes em alta...');
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  useEffect(() => {
    backendClient
      .get('/em-alta')
      .then((resposta) => {
        setEmAlta(resposta.data);
        setCarregando(false);
      })
      .catch((falha) => {
        console.error(falha);
        setCarregando(false);
        setErro('Não foi possível carregar os filmes. Verifique se o backend está no ar.');
      });
  }, []);

  function buscar() {
    const termoPesquisado = termo;
    setMensagemCarregando('Procurando filmes...');
    setCarregando(true);
    backendClient
      .get('/filmes', { params: { busca: termoPesquisado } })
      .then((resposta) => {
        setResultados(resposta.data);
        setTermoBuscado(termoPesquisado);
        setErro(null);
        setCarregando(false);
      })
      .catch((falha) => {
        setErro(falha.response?.data?.mensagem || 'Não foi possível buscar os filmes.');
        setCarregando(false);
      });
  }

  function limpar() {
    setTermo('');
    setResultados(null);
    setErro(null);
  }

  function renderizarConteudo() {
    if (carregando) {
      return <Carregando mensagem={mensagemCarregando} />;
    }
    if (erro) {
      return <Text style={styles.mensagem}>{erro}</Text>;
    }
    if (resultados === null) {
      return (
        <ListaFilmes
          titulo="Em alta nesta semana"
          filmes={emAlta}
          onSelecionar={setFilmeSelecionado}
        />
      );
    }
    if (resultados.length === 0) {
      return (
        <Text style={styles.mensagem}>
          Nenhum filme encontrado para “{termoBuscado}”.
        </Text>
      );
    }
    return (
      <ListaFilmes
        titulo={`Resultados para “${termoBuscado}”`}
        filmes={resultados}
        onSelecionar={setFilmeSelecionado}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        {filmeSelecionado === null ? (
          <View style={styles.conteudo}>
            <Busca
              termo={termo}
              onTermoAlterado={setTermo}
              onBuscar={buscar}
              onLimpar={limpar}
            />
            {renderizarConteudo()}
          </View>
        ) : (
          <DetalhesFilme id={filmeSelecionado} onVoltar={() => setFilmeSelecionado(null)} />
        )}
        <Creditos />
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121a',
  },
  conteudo: {
    flex: 1,
  },
  mensagem: {
    color: '#c8c8d4',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
