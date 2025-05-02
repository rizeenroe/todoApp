import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TextInput, StyleSheet, Switch, Button } from "react-native"
import { ScheduleStackList } from "./ScheduleStack";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

type Props = NativeStackScreenProps<ScheduleStackList, 'AddTask'>;

const AddSchedule: React.FC<Props> = ({ navigation }) => {
   const [id, setId] = useState<string>('');
   const [task, setTask] = useState<string>('');
   const [link, setLink] = useState<string>('');
   const [repeatable, setRepeatable] = useState<boolean>(false);
   const [startTime, setStartTime] = useState<string>('1:00');
   const [endTime, setEndTime] = useState<string>('2:00');

   const timeOptions = Array.from({ length: 24 }, (_, i) => {
      const hour = i + 1;
      return {
         label: `${hour < 10 ? '0' : ''}${hour}:00`, 
         value: `${hour}:00`
      };
   });

   const handleSave = async() => {
      const newId = uuid.v4(); // call the function
      setId(newId);
      const newTask = {
         id: newId,
         task,
         startTime,
         endTime,
         repeatable
      };
       

      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      tasks.push(newTask)
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      console.log("Stored tasks:", storedTasks);
      navigation.navigate('Schedule')
      
   }

   return(
      <View>
         <Text>AddTask page</Text>
         <TextInput 
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholder="Enter Task"
         />
         <TextInput 
            style={styles.input}
            onChangeText={setLink}
            value={link}
            placeholder="Enter Link"
         />
         <View style={styles.switchContainer}>
            <Text style={styles.label}>Repeatable</Text>
            <Switch 
               value={repeatable}
               onValueChange={setRepeatable}
            />
         </View>
         <View style={styles.container}>
            <Text style={styles.title}>Select Time:</Text>
            <Dropdown
            data={timeOptions}
            labelField="label"
            valueField="value"
            value={startTime}
            onChange={(item) => setStartTime(item.value)}
            style={styles.dropdown}
            placeholder="Start time"
            />
            <Text>Selected: {startTime}</Text>
         </View>
         <View style={styles.container}>
            <Text style={styles.title}>Select Time:</Text>
            <Dropdown
               data={timeOptions}
               labelField="label"
               valueField="value"
               value={endTime}
               onChange={(item) => setEndTime(item.value)}
               style={styles.dropdown}
               placeholder="End time"
            />
            <Text>Selected: {endTime}</Text>
         </View>
         <View>
            <Button title="save" onPress={handleSave}></Button>
         </View>


      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
   },
   title: {
      fontSize: 18,
      marginBottom: 10,
   },
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
   },
   switchContainer: {
      flexDirection: 'row',
      alignItems: 'center'
   },
      label: {
      marginRight: 10,
      fontSize: 16
   },
   dropdown: {
      width: "100%",
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
    },
})

export default AddSchedule;