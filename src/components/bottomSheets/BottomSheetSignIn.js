import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CText from '../CText';
import Container from '../Container';
import { COLOR, SPACING, TEXT } from '../../configs/styles';
import CInput from '../CInput';
import { HEART_IMG, SEARCH_IMG } from '../../configs/source';
import * as authApi from '../../apis/auth.api';
import ModalLoading from '../modal/ModalLoading';

const BottomSheetSignIn = () => {
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleClickLogin = async () => {
    try {
      setShowModal(false);
      const result = await authApi.signIn(txtEmail, txtPassword);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(true);
    }
  };

  return (
    <Container
      backgroundColor={COLOR.WHITE}
      justifyContent="center"
      alignItems="center">
      {showModal && <ModalLoading visible={showModal} />}
      <CText text={TEXT.H1} textAlign="center" marginVertical={SPACING.S2}>
        Login
      </CText>
      <Container marginVertical={SPACING.S2} width="100%">
        <CInput
          iconLeft={HEART_IMG}
          placeholder="Email"
          onChangeText={text => setTxtEmail(text)}
          keyboardType="email-address"
        />
      </Container>
      <Container marginVertical={SPACING.S2} width="100%">
        <CInput
          secureTextEntry={true}
          placeholder="Password"
          iconLeft={HEART_IMG}
          onChangeText={text => setTxtPassword(text)}
          iconRight={SEARCH_IMG}
          onPressIconRight={() => console.log('password eye')}
        />
      </Container>

      <TouchableOpacity onPress={handleClickLogin}>
        <Container padding={SPACING.S2} width="100%">
          <CText>Đăng nhập</CText>
        </Container>
      </TouchableOpacity>
    </Container>
  );
};

export default BottomSheetSignIn;

const styles = StyleSheet.create({});
