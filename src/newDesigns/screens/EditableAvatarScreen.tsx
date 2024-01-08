import React, {useMemo, useRef} from "react";
import WebView from 'react-native-webview';
import {Alert} from 'react-native';




export type BodyType = 'halfbody' | 'fullbody';

export type Language = 'en' | 'en-IE' | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'pt' | 'pt-BR' | 'tr' | 'ja' | 'kr' | 'ch';

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



const useAvatarCreatorUrl = (subdomain: string, config: AvatarCreatorConfig | undefined): string => {
    return useMemo(() => {
        let url = `https://${subdomain || `demo`}.readyplayer.me`;

        if (config?.language) url += `/${config.language}`;

        url += `/avatar?frameApi`;

        if (config?.clearCache) url += '&clearCache';

        if (config?.quickStart) url += '&quickStart';

        if (config?.bodyType) url += `&bodyType=${config?.bodyType}`;

        return url;
    }, [subdomain, config]);
};




const RPM_TARGET = 'readyplayerme';

// Replace with your custom subdomain
const subdomain = "demo";


export default function EditableAvatarScreen() {
    const webView = useRef<WebView | null>();
    const url = useAvatarCreatorUrl(subdomain, {});
    const supportedEvents = {
        'v1.avatar.exported': onAvatarExported,
        'v1.user.set': onUserSet,
        'v1.user.authorized': onUserAuthorized,
        'v1.asset.unlock': onAssetUnlocked,
        'v1.user.updated': onUserUpdated,
        'v1.user.logout': onUserLoggedOut,
    } as Record<string, any>;


    function onAvatarExported(message: any) {
        console.log("32423423message.data?.url4234", message.data?.url);
        
        Alert.alert(`Avatar Exported | Avatar Url = ${message.data?.url}`);
    }

    function onAssetUnlocked(message: any) {
        Alert.alert(`Asset Unlocked | Asset ID = ${message.data?.assetId}`);
    }

    function onUserAuthorized(message: any) {
        Alert.alert(`User Authorized | User ID = ${message.data?.id}`);
    }

    function onUserSet(message: any) {
        Alert.alert(`User Set | User ID = ${message.data?.id}`);
    }

    function onUserUpdated(message: any) {
        // Alert.alert(`User Updated | User ID = ${message.data?.id}`);
    }

    function onUserLoggedOut(message: any) {
        Alert.alert(`User Logged Out`);
    }

    function onWebViewLoaded() {
        webView.current?.postMessage(
            JSON.stringify({
                target: "readyplayerme",
                type: "subscribe",
                eventName: "v1.**",
            })
        );
    }

    function onMessageReceived(message: any) {
        const data = message.nativeEvent.data;
        const event = JSON.parse(data);

        if (event?.source !== RPM_TARGET) {
            return;
        }

        supportedEvents[event.eventName]?.(event);
    }

    return (
        <WebView
            ref={webView}
            style={{marginTop: 30}}
            onLoad={onWebViewLoaded}
            onMessage={onMessageReceived}
            source={{uri: url}}
        />
    );
}