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

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Limpa e valida os inputs
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            Alert.alert('Erro', 'Por favor, insira um email válido');
            return;
        }

        setLoading(true);

        try {
            // Configuração do timeout (8 segundos)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const response = await fetch('http://192.168.1.87/backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: trimmedEmail,
                    password: trimmedPassword
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Verifica o content-type antes de parsear
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Resposta inválida: ${text.substring(0, 50)}...`);
            }

            const data = await response.json();

            if (!response.ok) {
                // Mapeamento de códigos de status para mensagens
                const errorMessages = {
                    400: 'Dados inválidos',
                    401: 'Credenciais incorretas',
                    404: 'Usuário não encontrado',
                    500: 'Erro interno do servidor'
                };

                throw new Error(
                    data.message ||
                    errorMessages[response.status] ||
                    `Erro ${response.status}`
                );
            }

            // Login bem-sucedido - navega para MainApp (Tabs Navigator)
            navigation.navigate('MainApp', {
                screen: 'HomeTab',
                params: { user: data.user }
            });

            // Limpa os campos
            setEmail('');
            setPassword('');

        } catch (error) {
            console.error('Erro no login:', error);

            // Mensagens específicas por tipo de erro
            let errorMessage = 'Ocorreu um erro durante o login';

            if (error.name === 'AbortError') {
                errorMessage = 'Tempo de conexão esgotado';
            } else if (error.message.includes('Network request failed')) {
                errorMessage = 'Sem conexão com o servidor';
            } else if (error.message) {
                errorMessage = error.message;
            }

            Alert.alert(
                'Erro',
                errorMessage,
                error.name === 'AbortError' ? [
                    { text: 'Tentar novamente', onPress: handleLogin }
                ] : null
            );

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
                <Text style={styles.title}>Bem-vindo</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>

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

                <TouchableOpacity
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.forgotPassword}
                    disabled={loading}
                    onPress={() => Alert.alert('Ajuda', 'Entre em contato com o suporte para redefinir sua senha')}
                >
                    <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerLink}
                    disabled={loading}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

// ... (os estyles permanecem os mesmos) ...
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
    forgotPassword: {
        marginTop: 20,
        alignSelf: 'center',
    },
    forgotPasswordText: {
        color: '#6200ee',
        fontSize: 14,
    },
    registerLink: {
        marginTop: 15,
        alignSelf: 'center',
    },
    registerText: {
        color: '#6200ee',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default LoginScreen;