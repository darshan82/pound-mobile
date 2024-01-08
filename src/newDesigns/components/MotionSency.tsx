import React, {useEffect, useState} from 'react';
import {ActivityIndicator, NativeModules, Pressable, StyleSheet, Text, View,} from 'react-native';

// const {RNSencyMotionWorkoutModule} = NativeModules;

const MotionSency = () => {
//     const [loading, setLoading] = useState(false);
//     const [authSuccess, setAuthSuccess] = useState(false);

//     const auth = async () => {
//         if (!authSuccess) {
//             let authKey = 'public_live_5QZnK*5WLN4LR76%';

//             console.log("setApiPublicKey");
//             RNSencyMotionWorkoutModule.setApiPublicKey(authKey);

//             console.log("configure");
//             const configure = await RNSencyMotionWorkoutModule.configure();
//             console.log(configure);
//             console.log("configure: " + configure);
//             setAuthSuccess(true);
//         }
//     };

//     const customWorkoutJson = {
//         introduction: null,
//         soundtrack: null,
//         exercises: [
//             {
//                 instruction: null,
//                 totalSeconds: 20,
//                 totalReps: 10,
//                 uiElements: ['gaugeOfMotion', 'repsCounter', 'timer'],
//                 type: 'HighKnees',
//                 named: '',
//             },
//             {
//                 instruction: null,
//                 totalSeconds: 10,
//                 type: 'Rest',
//             },
//             {
//                 instruction: null,
//                 totalSeconds: 15,
//                 totalReps: null,
//                 uiElements: ['gaugeOfMotion', 'timer'],
//                 type: 'SquatRegularStatic',
//                 named: '',
//             },
//             {
//                 instruction: null,
//                 totalSeconds: 5,
//                 type: 'Cooldown',
//             },
//         ],
//     };

//     const startWorkoutOnPress = async () => {
//         try {
//             console.log("startWorkoutOnPress");
//             setLoading(true);
//             await auth();

//             const customWorkout = JSON.stringify(customWorkoutJson)
//             console.log("customWorkout: " + customWorkout);
//             const workoutResult = await RNSencyMotionWorkoutModule.startCustomWorkout(customWorkout, null);
//             setLoading(false);
//             console.log("Workout result is: <" + workoutResult + ">");
//         } catch (e) {
//             console.error(e);
//             setLoading(false);
//         }
//     };

//     useEffect(()=>{
//         startWorkoutOnPress();
//     },[])

//     return (
//         <View style={styles.sdk}>
//              <ActivityIndicator size="large" color="#00ff00" animating={loading} />
//         </View>
//     );
}

// const styles = StyleSheet.create({
//     sdk: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//         marginHorizontal: 40,
//     },
//     button: {
//         padding: 20,
//         elevation: 2,
//     },
//     buttonStart: {
//         flex: 2,
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'normal',
//         textAlign: 'center',
//         fontSize: 18,
//         fontStyle: 'normal',
//     },
// });

export default MotionSency;
