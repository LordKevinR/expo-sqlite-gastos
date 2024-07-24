// components/StudentList.js
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useStudentsService from "../services/studentsServices";

const StudentList = () => {
  const { getStudents, addStudent, deleteStudents } = useStudentsService();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await addStudent({
        FirstName: "Kevin",
        LastName: "Sanchez",
        Age: 24,
        Email: "lordkevin@gmail.com",
      });
      const studentsData = await getStudents();
      setStudents(studentsData); 
    };

    fetchData();
  }, []);

  return (
    <View>
      {students.length === 0 ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.boxIndex}>
                <Text style={styles.textIndex}>{item.Id}</Text>
              </View>
              <View>
                <Text style={styles.textTitle}>
                  {item.FirstName} {item.LastName}
                </Text>
                <Text style={styles.textDescription}>{item.Email}</Text>
              </View>
              <View style={{ position: "absolute", right: 30 }}>
                <Text style={{ color: "#0e7490", fontSize: 25 }}>{item.Age}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.Id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 20,
  },
  textDescription: {
    fontSize: 15,
  },
  textIndex: {
    fontSize: 20,
    color: "white",
  },
  boxIndex: {
    flex: 1,
    maxWidth: 40,
    height: 40,
    backgroundColor: "#0e7490",
    justifyContent: "center",
    borderRadius: 100,
    alignItems: "center",
    marginRight: 20,
  },
});

export default StudentList;
