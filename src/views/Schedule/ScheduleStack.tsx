import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Schedule from "./Schedule";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

type Task = {
   id: string;
   task: string;
   startTime: string;
   endTime: string;
   repeatable: boolean;
   link?: string; 
};

export type ScheduleStackList ={
   Schedule: undefined;
   AddTask: undefined;
   DeleteTask: {task? : Task}
   EditTask: {task? : Task};
}

const Stack = createNativeStackNavigator<ScheduleStackList>();

const ScheduleStack = () =>{
   return(
      <Stack.Navigator
         screenOptions={{
            headerShown: false
         }}
      >
         <Stack.Screen name="Schedule" component={Schedule} />
         <Stack.Screen name="AddTask" component={AddTask} />
         <Stack.Screen name="DeleteTask" component={DeleteTask} />
         <Stack.Screen name="EditTask" component={EditTask} />
      </Stack.Navigator>
   );
}
export default ScheduleStack;