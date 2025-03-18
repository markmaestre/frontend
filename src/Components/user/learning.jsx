import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Link } from 'expo-router';


const images = {
  chemical_waste: require('../assets/chemical_waste.png'),
  e_waste: require('../assets/e_waste.png'),
  battery_disposal: require('../assets/battery_disposal.png'),
  medical_waste: require('../assets/medical_waste.png'),
  oil_grease: require('../assets/oil_grease.png'),
  recycling_paper: require('../assets/recycling_paper.png'),
  recycling_plastic: require('../assets/recycling_plastic.jpg'),
  recycling_glass: require('../assets/recycling_glass.jpg'),
  recycling_metal: require('../assets/recycling_metal.jpg'),
};

const Learning = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<null | { title: string; details: string; image: any; link: string }>(null);

  const materials = {
    'Hazardous Materials': [
      { title: 'Handling Chemical Waste', details: 'Separate waste into flammable, toxic, and corrosive categories.', image: images.chemical_waste, link: '/screens/ChemicalWaste' },
      { title: 'E-Waste Recycling', details: 'Erase all personal data before recycling electronics.', image: images.e_waste, link: '/screens/EWasteRecycling' },
      { title: 'Disposing of Batteries', details: 'Use dedicated recycling bins for batteries.', image: images.battery_disposal, link: '/screens/BatteryDisposal' },
      { title: 'Medical Waste Management', details: 'Medical waste must be incinerated properly.', image: images.medical_waste, link: '/screens/MedicalWaste' },
      { title: 'Oil and Grease Disposal', details: 'Collect used oil and take it to a recycling facility.', image: images.oil_grease, link: '/screens/OilGreaseDisposal' },
    ],
    'Non-Hazardous Materials': [
      { title: 'Recycling Paper', details: 'Ensure paper is clean before recycling.', image: images.recycling_paper, link: '/screens/RecyclingPaper' },
      { title: 'Recycling Plastic Bottles', details: 'Rinse plastic bottles before recycling.', image: images.recycling_plastic, link: '/screens/RecyclingPlastic' },
      { title: 'Recycling Glass', details: 'Remove caps and rinse glass bottles before recycling.', image: images.recycling_glass, link: '/screens/RecyclingGlass' },
      { title: 'Recycling Metal Cans', details: 'Rinse and remove labels from cans before recycling.', image: images.recycling_metal, link: '/screens/RecyclingMetal' },
    ],
  };

  const handleMaterialSelect = (material: { title: string; details: string; image: any; link: string }) => {
    setSelectedMaterial(selectedMaterial?.title === material.title ? null : material);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Waste Management Guide</Text>
      {Object.entries(materials).map(([category, items]) => (
        <View key={category} style={styles.section}>
          <Text style={styles.sectionHeader}>{category}</Text>
          <Text style={styles.subHeader}>Learn how to properly handle and dispose of materials</Text>
          {items.map((material) => (
            <View key={material.title} style={styles.card}>
              <Link href={material.link} style={styles.link}>
                <Image source={material.image} style={styles.materialImage} />
                <Text style={styles.title}>{material.title}</Text>
              </Link>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleMaterialSelect(material)}
              >
                <Text style={styles.buttonText}>
                  {selectedMaterial?.title === material.title ? 'Hide Details' : 'Learn More'}
                </Text>
              </TouchableOpacity>
              {selectedMaterial?.title === material.title && (
                <Text style={styles.extraDetails}>{material.details}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e67e22',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  link: {
    textDecorationLine: 'none',
  },
  materialImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e67e22',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  extraDetails: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default Learning;
