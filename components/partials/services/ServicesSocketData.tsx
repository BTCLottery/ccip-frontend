import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  LotteryAddress,
  LotteryDefaultConfig,
  LotteryInterface,
  LotteryRoundStatus,
  LotteryWinnerStatus,
} from '@/utils/types/history';
import { NETWORK_CHAINID } from '@/constants/networks';
import useGlobalState from '@/store/globalState';

const ServicesSocketData = ({ lotteryAddress }: LotteryAddress) => {
  const router = useRouter();

  const [, setUserInfo] = useGlobalState('user');
  const [, setClaimInfo] = useGlobalState('claim');
  const [, setRounds] = useGlobalState('rounds');
  const [, setMyGamesRounds] = useGlobalState('myGamesRounds');

  const [, setRoundStatus] = useGlobalState('roundStatus');
  const [, setRoundWinners] = useGlobalState('roundWinners');

  const [, setRoundConfig] = useGlobalState('roundConfig');
  const [, setChainConfig] = useGlobalState('chainConfig');
  const [globalSocket] = useGlobalState('globalSocket');

  useEffect(() => {
    if (globalSocket) {
      // console.log('globalSocket', globalSocket)
      // console.log('router.asPath', router.asPath);

      // globalSocket.on('connect', () => {
      //   console.log('Connected to globalSocket.io server');
      globalSocket.emit('getConfig', lotteryAddress);
      globalSocket.emit('getRoundStatus', lotteryAddress);
      // globalSocket.emit('getRounds', lotteryAddress);
      // globalSocket.emit(
      //   'getMyGames',
      //   account?.address ?? ZERO_ADDRESS,
      //   lotteryAddress
      // );
      globalSocket.emit('getChainConfig', NETWORK_CHAINID);
      // });

      // if (connectedChain && Number(connectedChain.id) !== NETWORK_CHAINID) {
      //   triggerToast('ERROR', 'Please connect to the Polygon Mumbai Network');
      //   return;
      // }

      // Listen for any errors
      // globalSocket.on('error', err => {
      //   console.log('socketIO error', err);
      // });

      globalSocket.on('getRankings', data => {
        const {
          top10Leaderboard,
          top100Leaderboard,
          activeUserProfile,
          userRankings,
        } = data;
        console.log('getRankings', data);
        // setChainConfig(data);
        // setUserInfo(data.user);
        // setClaimInfo(data.claim);
      });

      globalSocket.on('configData', data => {
        console.log('configData', data);
        setChainConfig(data);
        // setUserInfo(data.user);
        // setClaimInfo(data.claim);
      });

      globalSocket.on('userWallet', data => {
        // console.log('userWallet', data);
        setUserInfo(data.user);
        setClaimInfo(data.claim);
      });

      globalSocket.on('winners', (data: LotteryWinnerStatus) => {
        // console.log('winners', data);
        setRoundWinners(data);
      });

      globalSocket.on('roundStatus', (data: LotteryRoundStatus) => {
        console.log('roundStatus', data);
        setRoundStatus(data);
      });

      globalSocket.on('config', (data: LotteryDefaultConfig[]) => {
        // console.log('config', data);
        setRoundConfig(data.flat());
      });

      globalSocket.on('rounds', (data: LotteryInterface[]) => {
        // console.log('roundsssssss', data);
        // console.log('roundsssssss', data);
        setRounds(data);
      });

      globalSocket.on('myGamesRounds', (data: LotteryInterface[]) => {
        // console.log('myGamesRounds', data);
        setMyGamesRounds(data);
      });
    }
    // return () => {
    //   if(globalSocket){
    //     globalSocket.disconnect();
    //   }
    // };
  }, [
    globalSocket,
    router.asPath,
    lotteryAddress,
    setUserInfo,
    setClaimInfo,
    setRounds,
    setMyGamesRounds,
    setRoundStatus,
    setRoundWinners,
    setRoundConfig,
    setChainConfig,
  ]);

  // console.log('globalSocket', globalSocket)
  // console.log('roundStatus', roundStatus)
  return null;
};

export default ServicesSocketData;
