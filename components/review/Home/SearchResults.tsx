import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";
import { GetAllRepairServices } from "../../../services/api"; 

interface SearchResultsProps {
  query: string;
}

interface RepairService {
  Id: string;       
  Image: string;    
  Name: string;     
  Description: string;
  Price: number;    
  Active: boolean;  
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [services, setServices] = useState<RepairService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await GetAllRepairServices({
          PageNumber: 1,
          PageSize: 10,
          SearchName: query || null, // Nếu query trống thì truyền null
        });
        setServices(data.Data); // Giả định rằng dữ liệu nằm trong `data.Data`
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Luôn gọi API khi component được mount hoặc query thay đổi
    fetchServices();
  }, [query]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : services.length > 0 ? (
        <FlatList
          data={services}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => (
            <View style={styles.serviceItem}>
              <Image source={{ uri: item.Image }} style={styles.serviceImage} />
              <View style={styles.serviceDetails}>
                <Text style={styles.serviceName}>{item.Name}</Text>
                <Text style={styles.serviceDescription}>{item.Description}</Text>
                <Text style={styles.servicePrice}>Price: {item.Price} VND</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found for "{query}"</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
  },
  serviceItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  serviceImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  serviceDetails: {
    flex: 1,
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: "#333",
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
  },
});

export default SearchResults;
