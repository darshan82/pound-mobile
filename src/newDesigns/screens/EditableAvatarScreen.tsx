import React, { useMemo, useRef } from 'react';
import WebView from 'react-native-webview';
import { Alert, View, ScrollView } from 'react-native';
import { useGlobalDataContext } from '../../context';
import axios, { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';

export type BodyType = 'halfbody' | 'fullbody';

export type Language =
  | 'en'
  | 'en-IE'
  | 'de'
  | 'fr'
  | 'es'
  | 'es-MX'
  | 'it'
  | 'pt'
  | 'pt-BR'
  | 'tr'
  | 'ja'
  | 'kr'
  | 'ch';

export type AvatarCreatorConfig = {
  clearCache?: boolean;
  bodyType?: BodyType;
  quickStart?: boolean;
  language?: Language;
};

export type IFrameEvent<TPayload> = {
  eventName?: string;
  source?: string;
  data: TPayload;
};

const useAvatarCreatorUrl = (
  subdomain: string,
  config: AvatarCreatorConfig | undefined,
): string => {
  return useMemo(() => {
    let url = `https://pound-gaming.readyplayer.me`;

    if (config?.language) {
      url += `/${config.language}`;
    }

    url += '?frameApi';

    if (config?.clearCache) {
      url += '&clearCache';
    }

    if (config?.quickStart) {
      url += '&quickStart';
    }

    if (config?.bodyType) {
      url += `&bodyType=${config?.bodyType}`;
    }
    console.log("url", url)
    return url;
  }, [subdomain, config]);
};

const RPM_TARGET = 'readyplayerme';

// Replace with your custom subdomain
const subdomain = 'demo';

export default function EditableAvatarScreen() {
  const webView = useRef<WebView | null>();
  const navigation = useNavigation();
  const url = useAvatarCreatorUrl(subdomain, {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "en",
  });
  const supportedEvents = {
    'v1.avatar.exported': onAvatarExported,
    'v1.user.set': onUserSet,
    'v1.user.authorized': onUserAuthorized,
    'v1.asset.unlock': onAssetUnlocked,
    'v1.user.updated': onUserUpdated,
    'v1.user.logout': onUserLoggedOut,
  } as Record<string, any>;

  const { data, setData } = useGlobalDataContext();

  function onAvatarExported(message: any) {
    console.log('onAvatarExported --->', message);
  }

  async function onMessageReceived(message: any) {
    const msgData = JSON.parse(message.nativeEvent.data);
    console.log('msgData.action -->', msgData.data?.url);
    if (msgData.data?.url) {
      const avatarUrl = msgData.data?.url;
      await createAvatar(avatarUrl);
    }

    if (msgData.source !== RPM_TARGET) {
      return;
    }

    supportedEvents[msgData.eventName]?.(msgData);
  }

  const createAvatar = async (avatarUrl: string) => {
    console.log('Create Avatar Function Call');
    try {
      const apiUrl = 'http://18.217.10.162/api/users/create-avatar';
      const response = await axios.post(apiUrl, { avatar: avatarUrl });
      console.log('response of createAvatarAPI', response.data);
      setData(prevData => ({
        ...prevData,
        token: response.data.token,
        avatarURL: response.data.data.avatar,
      }));
      navigation.navigate('PlayerTagScreen');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError)
      console.error('Error:', axiosError.response?.data);
    }
  };

  function onAssetUnlocked(message: any) {
    console.log(`Asset Unlocked | Asset ID = ${message.data?.assetId}`);
  }

  function onUserAuthorized(message: any) {
    console.log(`User Authorized | User ID = ${message.data?.id}`);
  }

  function onUserSet(message: any) {
    console.log(`User Set | User ID = ${message.data?.id}`);
  }

  function onUserUpdated(message: any) {
    // Alert.alert(`User Updated | User ID = ${message.data?.id}`);
  }

  function onUserLoggedOut(message: any) {
    Alert.alert('User Logged Out', 'Please Login Again');
  }

  function onWebViewLoaded() {
    webView.current?.postMessage(
      JSON.stringify({
        target: 'readyplayerme',
        type: 'subscribe',
        eventName: 'v1.**',
      }),
    );
  }

  return (
    <View
      style={{ flex: 1, }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WebView
          ref={webView}
          onLoad={onWebViewLoaded}
          onMessage={onMessageReceived}
          source={{ uri: url }}
          setDisplayZoomControls
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </ScrollView>
    </View>

  );
}
