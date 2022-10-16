import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { BearStatus, BearItem } from '../models/BearModel';

import bearLogo from '../assets/bear-picture.png';
import coinLogo from '../assets/coins.jpg'
import itemData from '../assets/items';

const MiniCard = (
  { item, coinCount, setCoins, bearStatus, setBearStatus }: 
  { item: BearItem, coinCount: number, setCoins: React.Dispatch<React.SetStateAction<number>>, bearStatus: BearStatus, setBearStatus: React.Dispatch<React.SetStateAction<BearStatus>>}
  ) => {

  return (
    <View>
      <Image source={item.imagePath} style={styles.smallLogo} />
      <Text>Cost: {item.cost}</Text>
      <TouchableOpacity
        onPress={() => {
          if (coinCount > item.cost) {
            const category = item.category as keyof BearStatus
            setCoins(coinCount - item.cost);
            setBearStatus({...bearStatus, [category]: bearStatus[category] + item.points});
          } else {
            alert("Not enough coins!");
          }}
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add {item.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const PedoView = ({ callback }: {callback: (increaseBy: number) => void}) => {
  const [currentStepCount, setCurrentStepCount] = useState(0)
  const [pastStepCount, setPastStepCount] = useState(0)

  useEffect(() => {
    Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps)
      callback(result.steps - currentStepCount)
    })

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount(result.steps);
      },
    error => {
      setPastStepCount(-1);
      console.error(error)
    }
  )
  }, []);

  return (
    <View>
      <Text>Steps taken in the past 24 hours: {pastStepCount}</Text>
      <Text>Current steps: {currentStepCount}</Text>
    </View>
  )
}

const BearStatusBars = ({bearStatus}: {bearStatus: BearStatus}) => {
  return (
    <View>
      {Object.entries(bearStatus).map(([key, value]) => {
        return <Text key={key}>{key}: {value}</Text>
      })}
    </View>
  )
}

const RootScreen = () => {
  const [coins, setCoins] = useState(0)
  const [bearStatus, setBearStatus] = useState<BearStatus>({'food': 50, 'social': 50})

  const pedoCallback = (increaseBy: number) => {
    setCoins(coins + increaseBy);
  }
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text>{coins}</Text>
        <Image source={coinLogo} style={styles.smallLogo} />
      </View>

      <Image source={bearLogo} style={styles.logo}/>
      
      <View style={{flexDirection: 'row'}}>
        {
          itemData.map((item: BearItem) => {
            return <MiniCard
              key={item.id}
              item={item}
              coinCount={coins}
              setCoins={setCoins}
              bearStatus={bearStatus}
              setBearStatus={setBearStatus}
            />
          })
        }
      </View>

      <PedoView callback={pedoCallback} />

      <BearStatusBars bearStatus={bearStatus} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 255,
    height: 238 
  },

  smallLogo: {
    width: 50,
    height: 50
  },

  instructions: {
    color: '#888',
    fontSize: 18
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5
  },

  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default RootScreen;