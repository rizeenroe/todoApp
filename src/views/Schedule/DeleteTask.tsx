import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { ScheduleStackList } from "./ScheduleStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

type Props = NativeStackScreenProps<ScheduleStackList, 'DeleteTask'>;
type Task = {
   id: string
   task: string;
   startTime: string;
   endTime: string;
   repeatable: boolean;
};

const DeleteTask: React.FC<Props> = ({ navigation, route }) => {
   const [modalVisible, setModalVisible] = useState<boolean>(true);

   const handleDelete = async () => {
      const task = route.params?.task;
      const storedTasks = await AsyncStorage.getItem("tasks");
      let tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      tasks = tasks.filter((t: Task) => t.id !== task?.id);
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setModalVisible(false);
      navigation.goBack();
   };

   return (
      <View style={styles.centeredView}>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.centeredView}>
               <View style={styles.modalView}>
               <Text style={styles.modalText}>Are you sure you want to delete this task?</Text>
               <Pressable style={[styles.button, styles.buttonClose]} onPress={handleDelete}>
                  <Text style={styles.textStyle}>Yes, Delete</Text>
               </Pressable>
               <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Cancel</Text>
               </Pressable>
               </View>
            </View>
         </Modal>
      </View>
   );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF3B30",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});

export default DeleteTask;
