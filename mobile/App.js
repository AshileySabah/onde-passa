import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import Carregando from './src/components/Carregando';
import ListaFilmes from './src/components/ListaFilmes';
import backendClient from './src/utils/backendClient';

export default function App() {
  const [emAlta, setEmAlta] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

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

  function renderizarConteudo() {
    if (carregando) {
      return <Carregando mensagem="Buscando os filmes em alta..." />;
    }
    if (erro) {
      return <Text style={styles.erro}>{erro}</Text>;
    }
    return <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        <View style={styles.conteudo}>{renderizarConteudo()}</View>
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
  erro: {
    color: '#ff6b6b',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
