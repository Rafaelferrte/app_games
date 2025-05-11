import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validações básicas
    if (!nome || !email || !password || !confirmPassword) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem');
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        Alert.alert('Erro', 'Por favor, insira um email válido');
        return;
    }

    if (password.length < 6) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch('http://192.168.1.87/backend/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                password: password,
            }),
        });

        const textResponse = await response.text();
        const data = JSON.parse(textResponse);
        
        if (!response.ok) {
            // Tratamento específico para email já cadastrado
            if (response.status === 409) {
                throw new Error(data.message || 'Este email já está cadastrado');
            }
            throw new Error(data.message || 'Erro ao cadastrar');
        }

        Alert.alert('Sucesso', data.message || 'Cadastro realizado com sucesso!', [
            { 
                text: 'OK', 
                onPress: () => navigation.navigate('Login', { email: email.trim().toLowerCase() }) 
            }
        ]);

    } catch (error) {
        console.error("Erro completo:", error);
        Alert.alert('Erro', error.message || 'Ocorreu um erro durante o cadastro');
    } finally {
        setLoading(false);
    }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados para se registrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          disabled={loading}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RegisterScreen;