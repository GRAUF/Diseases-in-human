#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { table } from 'console';
import moment from 'moment';

// Define a list of diseases and their medications
const diseases = [
  { name:  "Asthma", medication: 'Albuterol' },
  { name: 'Bronchitis', medication: 'Rondec- C, Suduri' },
  { name: 'Cholera', medication: 'Galzin, Zincate' },
  { name: 'Diabetes-STG-1', medication: 'Metformin' },
  { name: 'Diabetes-STG-2', medication: 'Inhaled insulin begins working' },
  { name: 'Diarrhea', medication: 'Dimenhydrinate,Dimenhydrinate' },
  { name: 'Dysmenorrhea', medication: 'Loratadine' },
  { name: 'Migraine', medication: 'Tylenol,Advil ' },
  { name: 'Heart Disease', medication: 'Aspirin,Statins' },
  { name: 'Alzheimers Disease', medication: 'Donepezil,Memantine' },
  { name: 'Gastroenteritis', medication: ''},
  { name: 'Gonorrhea', medication: 'Ciprofloxacin' },
  { name: 'Hepatitis-A', medication: 'Vaccination,' },
  { name: 'Hepatitis-B', medication: 'Vaccination,' },
  { name: 'Hepatitis-C', medication: 'Vaccination,' },
  { name: 'Hepatitis-D', medication: 'Vaccination,' },
  { name: 'Hepatitis-E', medication: 'Vaccination,' },
  { name: 'Influenza', medication: 'Typifix,Amoxil' },
  { name: 'Jaundice', medication: 'Vaccination,' },
  { name: 'Kidney Stones', medication: 'Chlorhexidine,tamsulosin' },
  { name: 'Leprosy', medication: 'Cubicin, dapsone' },
  { name: 'Malaria', medication: 'Mefloquine,Arakoda' },
  { name: 'Nephritis', medication: 'natures bounty b12 tablets ' },
  { name: 'Osteoporosis', medication: 'Osteoporosis,Chlorhexidine' },
  { name: 'Pneumonia', medication: 'azomax 250 capsules 250mg' },
  { name: 'Quinsy', medication: 'penicillin' },
  { name: 'Rabies', medication: 'osnate-d tablets ' },
  { name: 'Scabies', medication: 'lotrix lotion 60ml' },
  { name: 'Tuberculosis', medication: 'danzen ds tablets 10mg' },
  { name: 'Ulcer', medication: 'nexum capsules 20mg' },
  { name: 'Varicella', medication: 'velora capsules 500mg' },
  { name: 'Whooping cough', medication: 'acefyl cough syrup 125ml' },
  { name: 'Xerophthalmia', medication: 'xefecta tablets 400mg' },
  { name: 'Yellow fever', medication: 'Vaccination,' },
  { name: 'Zika virus', medication: 'arinac forte tablets' },
  { name: 'Epilepsy',medication: 'teril tablets 200mg '},
  { name: 'Piles',medication: 'doxium capsules ,hemokit oral drops'}

  // ... add more diseases up to 100
];

// Function to print the patient slip
function printPatientSlip(patient: any) {
  console.log(chalk.green('--- Patient Slip ---'));
  console.log(`Name: ${patient.name}`);
  console.log(`Age: ${patient.age}`);
  console.log(`Disease: ${patient.disease}`);
  console.log(`Medication: ${patient.medication}`);
  console.log(`Doctor: ${patient.doctor}`);
  console.log(`Date: ${patient.date}`);
  console.log(chalk.green('---------------------'));
}

// Function to ask patient details
async function askPatientDetails() {
  const patientDetails = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter patient name:'
    },
    {
      type: 'input',
      name: 'age',
      message: 'Enter patient age:'
    },
    {
      type: 'list',
      name: 'disease',
      message: 'Select patient disease:',
      choices: ["Asthma",
  "Bronchitis",
  "Cholera",
  "Diabetes-STG-1",
  "Diabetes-STG-2",
  "Diarrhea",
  "Dysmenorrhea",
  "Migraine",
  "Heart Disease",
  "Alzheimers Disease",
  "Gastroenteritis",
  "Gonorrhea",
  "Hepatitis-A",
  "Hepatitis-B",
  "Hepatitis-C",
  "Hepatitis-D",
  "Hepatitis-E",
  "Influenza",
  "Jaundice",
  "Kidney stones",
  "Leprosy",
  "Malaria",
  "Nephritis",
  "Osteoporosis",
  "Pneumonia",
  "Quinsy",
  "Rabies",
  "Scabies",
  "Tuberculosis",
  "Ulcer",
  "Varicella",
  "Whooping cough",
  "Xerophthalmia",
  "Yellow fever",
  "Zika virus",
  "Epilepsy",
  "Piles",
]
    },
    {
      type: 'input',
      name: 'doctor',
      message: 'Enter doctor name:'
    }
  ]);

  const selectedDisease = diseases.find(d => d.name === patientDetails.disease);
  const date = moment().format('YYYY-MM-DD HH:mm:ss');

  return {
    ...patientDetails,
    medication: selectedDisease?.medication || 'N/A',
    date
  };
}

// Function to show menu and handle user choices
async function showMenu() {
  let continueRunning = true;
  const patientData: any[] = [];

  while (continueRunning) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Enter patient details', 'Print patient details', 'Exit']
      }
    ]);

    switch (answers.action) {
      case 'Enter patient details':
        const patient = await askPatientDetails();
        patientData.push(patient);
        printPatientSlip(patient);
        break;
      case 'Print patient details':
        console.log(chalk.blue('--- All Patient Details ---'));
        table(patientData);
        break;
      case 'Exit':
        continueRunning = false;
        break;
    }
  }
}

// Start the program
showMenu();