import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatarNota } from '../utils/formatacao';

export default function CartaoFilme({ titulo, ano, nota, poster, onSelecionar }) {
  return (
    <Pressable style={styles.container} onPress={onSelecionar}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.semPoster]}>
          <Text style={styles.semPosterTexto}>Sem pôster</Text>
        </View>
      )}
      <View style={styles.informacoes}>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        {ano && <Text style={styles.ano}>{ano}</Text>}
        <Text style={styles.nota}>{formatarNota(nota)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1e1e2a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  poster: {
    width: 70,
    height: 105,
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
  informacoes: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ano: {
    fontSize: 14,
    color: '#9a9aa8',
    marginTop: 4,
  },
  nota: {
    fontSize: 14,
    color: '#f5c518',
    marginTop: 4,
  },
});
