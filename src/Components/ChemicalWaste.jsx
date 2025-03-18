import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button, Image } from "react-native";
import { router } from 'expo-router';

const chemicalWasteTypes = [
  { name: "Acidic Waste", steps: [
      { title: "Identify the Acidic Waste", 
        description: "Ensure that the waste is identified as acidic, using the appropriate chemical classification methods and referring to the Material Safety Data Sheet (MSDS).",
        image: require('../assets/acidicidentify.png')
      },
      { title: "Segregate Properly", 
        description: "Separate acidic waste from other types of waste, especially from incompatible substances like bases, metals, or organic materials that may react with acids.",
        image: require('../assets/acidicsegregate.png') 
      },
      { title: "Neutralize if Necessary", 
        description: "If required and safe, neutralize the acidic waste using a suitable neutralizing agent (e.g., sodium bicarbonate) to reduce its hazardous nature before disposal.",
        image: require('../assets/acidicneutralize.png')
      },
      { title: "Label the Waste", 
        description: "Label the containers with clear, accurate hazard symbols, such as the corrosive symbol, along with the type of acid, concentration, and any special handling instructions.",
        image: require('../assets/acidiclabel.png') 
      },
      { title: "Store in Approved Containers", 
        description: "Place the acidic waste in containers that are certified and resistant to acids. Ensure the containers are tightly sealed to prevent leaks or spills.",
        image: require('../assets/acidicstore.png') 
      },
  ] },
   { name: "Alkaline Waste", steps: [
    { title: "Identify the Alkaline Waste", description: "Classify the waste as alkaline, ensuring it is properly identified, even though it may not be classified as hazardous, using appropriate classification methods." },
    { title: "Segregate Properly", description: "Separate alkaline waste from other types of waste, especially from hazardous materials, to prevent contamination or undesirable reactions." },
    { title: "Neutralize if Necessary", description: "If needed, neutralize the alkaline waste to reduce its potential impact, especially if it is concentrated or reactive with other substances." },
    { title: "Label the Waste", description: "Clearly label the waste containers with appropriate symbols and descriptions for easy identification. Include any necessary handling instructions." },
    { title: "Store in Approved Containers", description: "Store the alkaline waste in suitable containers that are designed to handle such materials safely and prevent leakage or contamination." },
] },
{ name: "Solvent Waste", steps: [
    { title: "Identify Biohazardous Waste", description: "Classify the solvent waste correctly, ensuring that it is identified as hazardous, based on its chemical properties or any risks associated with it." },
    { title: "Segregate Properly", description: "Separate solvent waste from other types of waste, particularly from incompatible materials that may cause reactions or fires when mixed with solvents." },
    { title: "Neutralize if Necessary", description: "If applicable, neutralize solvent waste using proper neutralizing agents or treatment methods to make it safer for disposal." },
    { title: "Label the Waste", description: "Clearly label the containers with appropriate hazard symbols (e.g., flammable, toxic) and include details about the solvent type and any necessary precautions." },
    { title: "Store in Approved Containers", description: "Use certified, appropriate containers designed for solvent waste, ensuring they are securely sealed to avoid leaks or exposure." },
] },
];

const ChemicalWaste: React.FC = () => {
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<any[]>([]);

  const handleSelectWasteType = (type: string) => {
    const wasteType = chemicalWasteTypes.find((waste) => waste.name === type);
    if (wasteType) {
      setSteps(wasteType.steps);
      setSelectedWasteType(type);
      setCurrentStep(0); 
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderSuggestion = () => {
    if (currentStep === steps.length - 1) {
      return (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Good Job!</Text>
          <Text style={styles.suggestionText}>You have completed all the steps for proper chemical waste disposal. Please follow the suggested guidelines and ensure compliance with local regulations.</Text>
        </View>
      );
    }
    return null;
  };

  const handleMapNavigation = () => {
    router.replace('/map');
  };

  return (
    <ScrollView style={styles.container}>
      {selectedWasteType === null ? (
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Select Waste Type:</Text>
          {chemicalWasteTypes.map((type) => (
            <TouchableOpacity key={type.name} style={styles.option} onPress={() => handleSelectWasteType(type.name)}>
              <Text style={styles.optionText}>{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <Text style={styles.stepText}>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </Text>
          <View style={styles.card}>
            <Text style={styles.title}>{steps[currentStep].title}</Text>
            <Image source={steps[currentStep].image} style={styles.image} />
            <Text style={styles.description}>{steps[currentStep].description}</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, styles.prevButton]} onPress={handlePrevStep} disabled={currentStep === 0}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNextStep} disabled={currentStep === steps.length - 1}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>

            {renderSuggestion()}

            {currentStep === steps.length - 1 && (
              <TouchableOpacity style={styles.mapButton} onPress={handleMapNavigation}>
                <Text style={styles.mapButtonText}>View Disposal Map</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',  // Light background color
  },
  selectionContainer: {
    flexDirection: 'column',
    marginTop: 30,
  },
  selectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  optionText: {
    fontSize: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
  },
  prevButton: {
    backgroundColor: '#e74c3c',
  },
  nextButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  mapButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggestionContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  suggestionText: {
    fontSize: 16,
    color: '#004d40',
  },
});

export default ChemicalWaste;
