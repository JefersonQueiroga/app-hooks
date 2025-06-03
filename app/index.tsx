import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🪝 Top 5 Hooks Mais Usados</Text>
      
      <UseStateExample />
      <UseEffectExample />
      <UseRefExample />
      <UseMemoExample />
      <UseCallbackExample />
    </ScrollView>
  );
}

// 1. useState - Para guardar dados
function UseStateExample() {
  const [contador, setContador] = useState(0);
  const [nome, setNome] = useState('');

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>1. useState</Text>
      <Text style={styles.descricao}>Guarda informações que podem mudar</Text>
      
      <Text style={styles.numero}>Contador: {contador}</Text>
      
      <View style={styles.botoes}>
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => setContador(contador - 1)}
        >
          <Text style={styles.textoBotao}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => setContador(contador + 1)}
        >
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />
      
      {nome && <Text>Oi, {nome}! 👋</Text>}
    </View>
  );
}

// 2. useEffect - Para fazer coisas quando algo muda
function UseEffectExample() {
  const [segundos, setSegundos] = useState(0);
  const [ligado, setLigado] = useState(false);

  useEffect(() => {
    let timer: number | null = null;
    
    if (ligado) {
      timer = setInterval(() => {
        setSegundos(s => s + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [ligado]);

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>2. useEffect</Text>
      <Text style={styles.descricao}>Faz algo quando as coisas mudam</Text>
      
      <Text style={styles.numero}>⏰ {segundos} segundos</Text>
      
      <TouchableOpacity 
        style={[styles.botao, { backgroundColor: ligado ? '#FF3B30' : '#34C759' }]}
        onPress={() => setLigado(!ligado)}
      >
        <Text style={styles.textoBotao}>
          {ligado ? 'Parar' : 'Começar'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.botao}
        onPress={() => setSegundos(0)}
      >
        <Text style={styles.textoBotao}>Zerar</Text>
      </TouchableOpacity>
    </View>
  );
}

// 3. useRef - Para acessar elementos diretamente
function UseRefExample() {
  const [texto, setTexto] = useState('');
  const inputRef = useRef<TextInput>(null);
  const contadorRef = useRef(0);

  const focarInput = () => {
    inputRef.current?.focus();
  };

  const contarCliques = () => {
    contadorRef.current += 1;
    Alert.alert('Cliques', `Você clicou ${contadorRef.current} vezes!`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>3. useRef</Text>
      <Text style={styles.descricao}>Acessa elementos e guarda valores sem re-renderizar</Text>
      
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Digite algo"
        value={texto}
        onChangeText={setTexto}
      />
      
      <TouchableOpacity style={styles.botao} onPress={focarInput}>
        <Text style={styles.textoBotao}>Focar Input</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.botao} onPress={contarCliques}>
        <Text style={styles.textoBotao}>Contar Clique</Text>
      </TouchableOpacity>
      
      {texto && <Text>Você digitou: {texto}</Text>}
    </View>
  );
}

// 4. useMemo - Para otimizar cálculos pesados
function UseMemoExample() {
  const [numero, setNumero] = useState(5);
  const [toggle, setToggle] = useState(false);

  // Cálculo pesado que só roda quando 'numero' muda
  const calculoPesado = useMemo(() => {
    console.log('🔄 Calculando...');
    let resultado = 0;
    for (let i = 0; i < numero * 1000000; i++) {
      resultado += i;
    }
    return resultado;
  }, [numero]);

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>4. useMemo</Text>
      <Text style={styles.descricao}>Evita cálculos desnecessários</Text>
      
      <Text>Número: {numero}</Text>
      
      <View style={styles.botoes}>
        <TouchableOpacity 
          style={styles.botao}
          onPress={() => setNumero(numero - 1)}
        >
          <Text style={styles.textoBotao}>-1</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botao}
          onPress={() => setNumero(numero + 1)}
        >
          <Text style={styles.textoBotao}>+1</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.resultado}>Resultado: {calculoPesado}</Text>
      
      <TouchableOpacity 
        style={[styles.botao, { backgroundColor: toggle ? '#FF9500' : '#007AFF' }]}
        onPress={() => setToggle(!toggle)}
      >
        <Text style={styles.textoBotao}>
          Toggle: {toggle ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.dica}>
        💡 Mudando o toggle não recalcula!
      </Text>
    </View>
  );
}

// 5. useCallback - Para otimizar funções
function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  // Função otimizada que só muda quando count muda
  const mostrarCount = useCallback(() => {
    Alert.alert('Valor Atual', `Count: ${count}`);
  }, [count]);

  const incrementar = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>5. useCallback</Text>
      <Text style={styles.descricao}>Evita recriar funções desnecessariamente</Text>
      
      <Text style={styles.numero}>Count: {count}</Text>
      
      <TouchableOpacity style={styles.botao} onPress={incrementar}>
        <Text style={styles.textoBotao}>+1</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.botao} onPress={mostrarCount}>
        <Text style={styles.textoBotao}>Mostrar Valor</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.botao, { backgroundColor: toggle ? '#FF9500' : '#007AFF' }]}
        onPress={() => setToggle(!toggle)}
      >
        <Text style={styles.textoBotao}>
          Toggle: {toggle ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.dica}>
        💡 Funções são memorizadas corretamente!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  numero: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
  },
  botoes: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    margin: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    width: 200,
    textAlign: 'center',
    fontSize: 16,
  },
  resultado: {
    fontSize: 12,
    color: '#333',
    marginVertical: 5,
    textAlign: 'center',
  },
  dica: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default App;