import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

import * as Speech from "expo-speech";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";

export default class StoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          speakerColor: "gray",
          speakerIcon: "volume-high-outline"
        };
    }


    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }

componentDidMount(){
    this._loadFontsAsync();
}
      async initiateTTS(title,moral,story,author){
          const current_color = this.state.speakerColor;
          this.setState({
              speakerColor:current_color === "gray"?"#EE8249":"gray"
          });

          if(current_color === "gray"){
              Speech.speak(title);
              Speech.speak(moral);
              Speech.speak(story);
              Speech.speak(author);
          }
          else{
            speech.stop();
          }
      }
   
      render(){
        if(!this.props.root.params){
            this.props.navigation.navigate("home");
            
        }
        else if(this.state.fontsLoaded){
            SplashScreen.hideAsync();
            return(
                <View style = {styles.container}>

                    <View style = {styles.apptitle}>
                        <View style = {styles.appicon}>
                        <Image 
                        source = {require("../assets/logo.png")}>
                        </Image>
                        </View>
                        <View style = {styles.apptitletextContainer}>
                            <Text style = {styles.apptitletext}></Text>
                        </View>
                    </View>

                    <View style = {styles.storyContainer}>
                        <ScrollView style = {styles.storyCard}>
                            <Image
                            source = {require("../assets/story_image_1.png")}>
                            </Image>

                            <View style = {styles.storyAuthor}>
                                <Text style = {styles.storyAuthorText}></Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.iconContainer}> 
                    <TouchableOpacity 
                     onPress={() =>
                        this.initiateTTS(
                          this.props.route.params.story.title,
                          this.props.route.params.story.author,
                          this.props.route.params.story.story,
                          this.props.route.params.story.moral
                        )
                      }
                      ></TouchableOpacity>
                    </View>
                </View>
            )    
        }
      }
}