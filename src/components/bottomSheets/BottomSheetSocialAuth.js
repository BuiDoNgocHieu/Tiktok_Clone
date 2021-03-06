import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../Icon';
import {
  APPLE_ICON,
  CLOSE_IMG,
  FACEBOOK_ICON,
  GOOGLE_ICON,
  INSTAGRAM_ICON,
  KAKAOTALK_ICON,
  USER_IMG,
} from '../../configs/source';
import Container from '../Container';
import CText from '../CText';
import { BORDER, COLOR, SPACING, TEXT } from '../../configs/styles';
import BottomSheet from './BottomSheet';
import { HEIGHT } from '../../configs/constant';
import { setBottomSheetSignIn } from '../../store/indexSlice';
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSignUp';
import Animated, {
  LightSpeedInRight,
  LightSpeedInLeft,
  LightSpeedOutRight,
  LightSpeedOutLeft,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

const BottomSheetSocialAuth = () => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef();

  const [currentForm, setCurrentForm] = useState(0); //0 social, 1 login, 2 register

  const [dataSocial, setDataSocial] = useState([]);

  const bottomSheetSignIn = useSelector(state => state.index.bottomSheetSignIn);

  useEffect(() => {
    if (bottomSheetSignIn) {
      const heightLayout = bottomSheetRef?.current?.heightLayoutCurrent();
      bottomSheetRef?.current?.scrollTo(-heightLayout);
      setTimeout(() => {
        setDataSocial(dataSignInWithSocial);
      }, 300);
    }
  }, [bottomSheetSignIn, dataSignInWithSocial]);

  const handleClickClose = useCallback(() => {
    bottomSheetRef?.current?.scrollTo(0);
    setDataSocial([]);
  }, []);

  const closeBottomSheet = () => {
    dispatch(setBottomSheetSignIn(false));
    setDataSocial([]);
  };

  const handleClickText = () => {
    setCurrentForm(currentForm === 1 ? 2 : 1);
  };

  const backToScreenSocial = useCallback(() => {
    setDataSocial(dataSignInWithSocial);
  }, [dataSignInWithSocial]);

  const dataSignInWithSocial = useMemo(
    () => [
      {
        icon: USER_IMG,
        using: 'S??? d???ng s??? ??i???n tho???i ho???c email',
        color: COLOR.BLACK,
        onPress: () => {
          setDataSocial([]);
          setCurrentForm(2); // naviga to register
        },
      },
      {
        icon: FACEBOOK_ICON,
        using: 'Ti???p t???c v???i Facebook',
      },
      {
        icon: GOOGLE_ICON,
        using: 'Ti???p t???c v???i Google',
      },
      //   {
      //     icon: TWITTER_ICON,
      //     using: 'Ti???p t???c v???i Twitter',
      //   },
      //   {
      //     icon: LINE_ICON,
      //     using: 'Ti???p t???c v???i Line',
      //   },
      {
        icon: KAKAOTALK_ICON,
        using: 'Ti???p t???c v???i KakaoTalk',
      },
      {
        icon: APPLE_ICON,
        using: 'Ti???p t???c v???i Apple',
      },
      {
        icon: INSTAGRAM_ICON,
        using: 'Ti???p t???c v???i Instagram',
      },
    ],
    [],
  );

  const ItemSignIn = ({ index, icon, using, color, onPress }) => {
    return (
      <Animated.View
        entering={
          index % 2
            ? LightSpeedInRight.duration(1000)
            : LightSpeedInLeft.duration(1000)
        }
        exiting={
          index % 2
            ? LightSpeedOutRight.duration(1000)
            : LightSpeedOutLeft.duration(1000)
        }>
        <Pressable onPress={onPress}>
          <Container
            flexDirection="row"
            borderRadius={BORDER.SMALL}
            borderWidth={1}
            borderColor={COLOR.LIGHT_GRAY}
            justifyContent="center"
            alignItems="center"
            padding={SPACING.S2}
            marginVertical={SPACING.S2}>
            <Icon source={icon} tintColor={color} />
            <Container flexGrow={1} justifyContent="center" alignItems="center">
              <CText text={TEXT.STRONG} fontSize={16}>
                {using}
              </CText>
            </Container>
          </Container>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <BottomSheet ref={bottomSheetRef} closeBottomSheet={closeBottomSheet}>
      <Container paddingTop={SPACING.S5} height={HEIGHT - 48}>
        <Container
          paddingHorizontal={SPACING.S4}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Icon source={CLOSE_IMG} onPress={handleClickClose} />
          <CText
            width={20}
            height={20}
            borderRadius={BORDER.PILL}
            color={COLOR.GRAY}
            borderWidth={1}
            borderColor={COLOR.GRAY}
            justifyContent="center"
            alignItems="center"
            textAlign="center">
            ?
          </CText>
        </Container>
        <Container
          flex={1}
          paddingHorizontal={SPACING.S5}
          marginTop={SPACING.S10}
          marginBottom={SPACING.S5}
          flexDirection="column"
          justifyContent="space-between">
          {currentForm === 0 ? (
            <Animated.View
              entering={FadeIn.duration(600)}
              exiting={FadeOut.duration(600)}>
              <Container height={'100%'}>
                <Container>
                  <CText
                    text={TEXT.H1}
                    textAlign="center"
                    marginVertical={SPACING.S2}>
                    ????ng k?? TikTok
                  </CText>
                  <CText
                    text={TEXT.REGULAR}
                    color={COLOR.GRAY}
                    textAlign="center"
                    marginVertical={SPACING.S2}>
                    T???o h??? s??, theo d??i c??c t??i kho???n kh??c, quay video {'\n'}{' '}
                    c???a ch??nh b???n, v.v.
                  </CText>
                </Container>
                <Container marginTop={SPACING.S5} flexGrow={1}>
                  {dataSocial.map((item, index) => {
                    console.log(dataSocial.length);
                    return (
                      <ItemSignIn
                        onPress={item.onPress}
                        index={index}
                        key={index.toString()}
                        icon={item.icon}
                        using={item.using}
                        color={item.color}
                      />
                    );
                  })}
                </Container>
                <Container marginBottom={80}>
                  <CText textAlign="center" color={COLOR.GRAY} fontSize={12}>
                    B???ng c??ch ti???p t???c, b???n ?????ng ?? v???i{' '}
                    <CText text={TEXT.STRONG} fontSize={12}>
                      ??i???u kho???ng D???ch v???
                    </CText>{' '}
                    c???a ch??ng t??i v?? th???a nh???n r???ng b???n ???? ?????c{' '}
                    <CText text={TEXT.STRONG} fontSize={12}>
                      Ch??nh s??ch Quy???n Ri??ng t??
                    </CText>{' '}
                    ????? t??m hi???u c??ch ch??ng t??i thu th???p, s??? d???ng v?? chia s??? d???
                    li???u c???a b???n
                  </CText>
                </Container>
              </Container>
            </Animated.View>
          ) : currentForm === 1 ? (
            <FormSignIn
              setCurrentForm={setCurrentForm}
              handleClickClose={handleClickClose}
            />
          ) : (
            <FormSignUp
              setCurrentForm={setCurrentForm}
              backToScreenSocial={backToScreenSocial}
            />
          )}
        </Container>
        <Container
          backgroundColor={COLOR.LIGHT_GRAY2}
          padding={SPACING.S5}
          position="absolute"
          bottom={0}
          left={0}
          right={0}>
          <CText textAlign="center" fontSize={16}>
            {currentForm === 1
              ? 'B???n ch??a c?? t??i kho???ng?'
              : 'B???n ???? c?? t??i kho???ng?'}{' '}
            <CText
              text={TEXT.STRONG}
              color={COLOR.DANGER2}
              fontSize={16}
              onPress={handleClickText}>
              {currentForm === 1 ? '????ng k??' : '????ng nh???p'}
            </CText>
          </CText>
        </Container>
      </Container>
    </BottomSheet>
  );
};

export default React.memo(BottomSheetSocialAuth);
