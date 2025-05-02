import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Pressable } from "react-native";
import { ScheduleStackList } from "./ScheduleStack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<ScheduleStackList, 'Schedule'>;
type Task = {
   id: string;
   task: string;
   link: string;
   repeatable: boolean;
   startTime: string;
   endTime: string;
};

const Schedule: React.FC<Props> = ({ navigation }) => {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [taskConfigVisible, setTaskConfigVisible] = useState<boolean>(false);
   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
   
   const loadTasks = async () => {
      try {
         const stored = await AsyncStorage.getItem('tasks');
         if (stored) {
            setTasks(JSON.parse(stored));
         } else {
            setTasks([]);
         }
      } catch (error) {
         console.error("Failed to load tasks:", error);
      }
   };
   
   const taskConfigPopUp = () => {
      if (!selectedTask) return null;
  
      return (
         <Modal
            animationType="fade"
            transparent={true}
            visible={taskConfigVisible}
            onRequestClose={() => setTaskConfigVisible(false)}
         >
            <View style={styles.modalOverlay}>
               <View style={styles.modalContent}>
               {/* Edit Button */}
               <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                     setTaskConfigVisible(false);
                     navigation.navigate("EditTask", { task: selectedTask });
                  }}
               >
                  <Text style={styles.editText}>Edit</Text>
               </TouchableOpacity>
   
               {/* Delete Button */}
               <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                     setTaskConfigVisible(false);
                     navigation.navigate("DeleteTask", { task: selectedTask });
                  }}
               >
                  <Text style={styles.deleteText}>Delete</Text>
               </TouchableOpacity>
               </View>
            </View>
         </Modal>
      );
    };
   
   
   useFocusEffect(
      useCallback(() => {
         loadTasks();
      }, [])
   );

   return(
      <View style={styles.container}>
         <Text>Schedule Page</Text>
         <FlatList
            data={tasks}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
               <View style={styles.taskItem}>
                  <View style={{ flex: 1 }}>
                  <Text style={styles.taskTitle}>{item.task}</Text>
                  <Text>
                     {item.startTime} - {item.endTime}
                  </Text>
                  <Text>{item.repeatable ? "Repeatable" : "One-time"}</Text>
                  {item.link ? <Text style={styles.link}>{item.link}</Text> : null}
                  </View>

                  <TouchableOpacity
                  onPress={() => {
                     setSelectedTask(item);
                     setTaskConfigVisible(true);
                  }}
                  >
                  <Ionicons
                     name="ellipsis-vertical-outline"
                     size={24}
                     color="black"
                  />
                  </TouchableOpacity>
               </View>
            )}
            ListEmptyComponent={<Text>No tasks found.</Text>}
         />


         {/* Add Button */}
         <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('AddTask')}
         >
            <Ionicons name="add" size={30} color="#fff" />
         </TouchableOpacity>

         {taskConfigPopUp()}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 20,
   },
   fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: '#4F46E5',
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      zIndex: 10,
   },
   taskItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      elevation: 1,
   },
   deleteButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
   },
   deleteText: {
      color: 'white',
      fontWeight: 'bold',
   },
   editButton: {
      backgroundColor: 'green',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
   },
   editText: {
      color: 'white',
      fontWeight: 'bold',
   },
   taskTitle: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   link: {
      color: 'blue',
      marginTop: 5,
   },
   modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
});

export default Schedule;