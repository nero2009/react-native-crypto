import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Routes, StackNavigationProps } from '../Routes';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { BACKGROUND_COLOR, PieData, TEXT_COLOR, TEXT_COLOR_GRAY, TINT_COLOR } from '../Constants/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BalancePie from './BalancePie';
import BalanceText from './BalanceText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CoinPreview from '../Components/CoinPreview';

const BALANCE_DURATION = 1500;
const BALANCE = 3312.73;
const BARS = 5;

const MARGIN_SIDES = 30;

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const wait = (timeout: number): Promise<number> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Dashboard = ({ navigation }: StackNavigationProps<Routes, 'Dashboard'>): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const balance = useSharedValue(BALANCE * 0.85);
  const [graphicData, setGraphicData] = useState<PieData[]>();
  const [angle, setAngle] = useState(0);
  const [dailyChange, setDailyChange] = useState(1.4);
  const [refreshing, setRefreshing] = React.useState(false);

  const randomizeChart = useCallback(() => {
    const temp: PieData[] = Array.from(new Array(BARS), () => {
      return { y: getRandomInt(10, 200) };
    });

    setGraphicData(temp);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => {
      setRefreshing(false);
      // TODO: shared value necessary?
      balance.value = withTiming(balance.value + 10, { duration: BALANCE_DURATION * 0.35, easing: Easing.out(Easing.exp) });
      randomizeChart();
      //TODO: figure out weird refresh
      const temp = Math.random() * 5 - 3;
      setDailyChange(temp);
    });
  }, [balance, randomizeChart]);

  useEffect(() => {
    // use timeout to animate initial data update
    setAngle(0);
    setTimeout(() => {
      setAngle(360);
    }, 50);
    randomizeChart();
  }, [randomizeChart]);

  useEffect(() => {
    balance.value = withTiming(BALANCE, { duration: BALANCE_DURATION * 0.6, easing: Easing.out(Easing.exp) });
  }, [balance]);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={45}
            tintColor={TINT_COLOR}
            colors={[TINT_COLOR]}
          />
        }>
        <View style={styles.textNameContainer}>
          <Text style={styles.textWelcome}>Welcome,</Text>
          <Text style={styles.textName}>Ben</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Balance</Text>
        </View>
        <BalanceText balance={balance} isRefreshing={refreshing} dailyChange={dailyChange} />
        <BalancePie data={graphicData} isRefreshing={refreshing} angle={angle} />
        <TouchableOpacity style={styles.randomizeContainer} onPress={randomizeChart}>
          <Text style={styles.randomizeText}>Randomize</Text>
        </TouchableOpacity>

        {/* Favs section */}
        <CoinPreview />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomizeContainer: {
    marginTop: 20,
    marginBottom: 5,
    width: 200,
    height: 45,
    borderRadius: 26,
    backgroundColor: 'turquoise',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollView: {
    paddingTop: 25,
  },
  randomizeText: {
    color: TEXT_COLOR,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  textNameContainer: {
    paddingTop: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: MARGIN_SIDES,
  },
  textWelcome: {
    textAlign: 'left',
    fontSize: 20,
    color: 'gray',
    fontFamily: 'SF-Pro-Text-Regular',
  },
  textName: {
    textAlign: 'left',
    fontSize: 26,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  balanceText: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'SF-Pro-Text-Semibold',
    color: TEXT_COLOR,
  },
  balanceContainer: {
    opacity: 0.75,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
