import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from 'moment';
class WorkTimeCalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      daysInMonth: "",
      monthStartsAt: "",
      daysArr: [],
      weeksCount: [],
      arrayChunks: {},
      objectKeys: [],
    };
  }
  
  componentWillMount() {
    let howMuchDays = moment().daysInMonth();
    let day = moment().startOf('month').day();
    let dayInted = parseInt(day) - 1;
    let arrayCreator = [...Array(parseInt(howMuchDays))].map(
      (item, count) => count + 1
    );
    let arrayEmptyFiller = [...Array(parseInt(dayInted)||0)].map(item => 0);
    arrayCreator.unshift(...arrayEmptyFiller);
    let arrayChunks = {};
    let counter = 0;
    arrayCreator.map((item, index) => {
        if(index == 0 || index % 7 == 0) { 
          counter++; 
          arrayChunks[counter] = [];
          arrayChunks[counter].push(item); 
        } else { 
          arrayChunks[counter].push(item);
        }
    });

    let objectKeys = Object.keys(arrayChunks);
    if(arrayChunks[objectKeys.length].length < 7) {
      let itemsNumber = 7 - arrayChunks[objectKeys.length].length;
      arrayChunks[objectKeys.length].push(...[...Array(itemsNumber)])
    }
    let startWeeksCount = arrayCreator.length / 7;
    let weeksCount = [...Array(Math.ceil(startWeeksCount))].map(item => item);
    this.setState({
      monthStartsAt: day,
      daysInMonth: howMuchDays,
      daysArr: arrayCreator,
      weeksCount,
      arrayChunks,
      objectKeys,
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 4,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 10
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              PON
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              UTO
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              SRE
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              ČET
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              PET
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              SUB
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              NED
            </Text>
          </View>
        </View>
        {this.state.weeksCount.length
          ? this.state.objectKeys.map((chunkNumber, key) => (
              <View
                key={key}
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                }}
              >
                {this.state.arrayChunks[chunkNumber].length
                  ? this.state.arrayChunks[chunkNumber].map((item, count) => (
                      <TouchableOpacity
                        key={count}
                        onPress={() => {
                          if(item != 0 || typeof item != 'undefined') {
                            console.log("TERT ", item)
                          } else {
                            console.log("NE ");
                          }
                         
                        }}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#fff"
                          }}>
                          {item == "0" || typeof item == 'undefined' ? "" : item}
                        </Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            ))
          : null}
      </View>
    );
  }
}

export default WorkTimeCalendarContainer;