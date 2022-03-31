import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Data from './data/Data';

import Parametres from './vues/Parametres';
import Calendrier from './vues/Calendrier';
import Aujourdhui from './vues/Aujourdhui';
import Taches from './vues/Taches';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Onglets({ navigation })
{
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
			  tabBarIcon: ({ focus, couleur, taille }) => {
			    let icone;
			    if (route.name === "Aujourd'hui") 
			    {
				    return <MaterialCommunityIcons name="target" size={taille} color={couleur}/>
			    } 
			    else if (route.name === "Calendrier") 
			    {
			      icone = focus ? 'md-calendar' : 'md-calendar-outline';
			    }
			    else if (route.name === "Taches") 
			    {
			      icone = focus ? 'checkmark-done-circle' : 'checkmark-done-circle-outline';
			    }
			    return <Ionicons name={icone} size={taille} color={couleur} />;
			  },
			  tabBarActiveTintColor: 'tomato',
			  tabBarInactiveTintColor: 'gray',
			})}
		>
			<Tab.Screen name="Calendrier" component={Calendrier} />
			<Tab.Screen name="Aujourd'hui" component={Aujourdhui} />
			<Tab.Screen name="Taches" component={Taches} />
	      	</Tab.Navigator>
	);
}

export default class App extends React.Component<IProps, iState> {
  
  componentDidMount()
  {
  	Data.init();
  }

  render() { return (
  	<NavigationContainer>
  		<Stack.Navigator>
	  		<Stack.Screen
	  			name="Onglets"
	  			component={Onglets}
	  			options={({ navigation, route }) => ({
	  				title: "Agent A",
	  				headerRight: () => (
				    		<Ionicons
				    			name="settings"
				    			size={24}
				    			color="black"
				      			onPress={() => { navigation.navigate("Paramètres"); }}
				    		/>
				  	),
	  			})}
	  		/>
	      		<Stack.Screen name="Paramètres" component={Parametres} />
  		</Stack.Navigator>
	</NavigationContainer>
  )};
}
