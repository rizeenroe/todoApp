import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Switch, Button } from "react-native"
import { ScheduleStackList } from "./ScheduleStack";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<ScheduleStackList, 'EditTask'>;
type Task = {
   id: string
   task: string;
   startTime: string;
   endTime: string;
   repeatable: boolean;
};

const EditTask: React.FC<Props> = ({ navigation, route }) => {
   const taskParam = route.params?.task;

   const [id, setId] = useState<string>(taskParam?.id ?? '');
   const [task, setTask] = useState<string>(taskParam?.task ?? '');
   const [link, setLink] = useState<string>(taskParam?.task ?? '');
   const [startTime, setStartTime] = useState<string>(taskParam?.startTime ?? '1:00');
   const [endTime, setEndTime] = useState<string>(taskParam?.endTime ?? '2:00');
   const [repeatable, setRepeatable] = useState<boolean>(taskParam?.repeatable ?? false);

   const timeOptions = Array.from({ length: 24 }, (_, i) => {
      const hour = i + 1;
      return {
         label: `${hour < 10 ? '0' : ''}${hour}:00`, 
         value: `${hour}:00`
      };
   });

   const handleSave = async () => {
      const updatedTask = {
        id,
        task,
        startTime,
        endTime,
        repeatable
      };
    
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
        const updatedTasks = tasks.map(t => (t.id === id ? updatedTask : t));
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
        console.log("Updated tasks:", updatedTasks);
        navigation.navigate('Schedule');
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };
    
    
   return(
      <View>
         <Text>EditTask page</Text>
         <TextInput 
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholder={task}
         />
         <TextInput 
            style={styles.input}
            onChangeText={setLink}
            value={link}
            placeholder={link}
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

export default EditTask;