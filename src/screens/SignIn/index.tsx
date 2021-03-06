import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleAnonymous() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }
  async function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Usuário criado com sucesso!');
      })
      .catch(err => {
        console.log(err.code);
        if (err.code === 'auth/email-already-in-use') {
          return Alert.alert('Email não disponível. Escolha outro para cadastrar.')
        }
        if (err.code === 'auth/invalid-email') {
          return Alert.alert('Email invalido.')
        }
        if (err.code === 'auth/weak-password') {
          return Alert.alert('Senha deve ter no minimo 6 dígitos.')
        }
      })
  }
  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert('User not found. Email e/ou password invalid!');
        }
      })
  }
  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Enviamos um link no seu email, para redefinir sua senha.'))
  }
  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}