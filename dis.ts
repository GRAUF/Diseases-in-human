#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { table } from 'console';
import moment from 'moment';

// Define a list of diseases and their medications
const diseases = [
  { name:  "Asthma", medication: 'Albuterol,Metaproterenol,Terbutaline' },
  { name: 'Bronchitis', medication: 'Amoxil,Ceftin,Rondec- C,Suduri' },
  { name: 'Diabetes-STG-1', medication: 'Metformin,Insulin, insulin(Fiasp, NovoLog)glulisine (Apidra),lispro(Admelog, Humalog, Lyumjev)' },
  { name: `Diabetes-STG-2`, medication: 'Inhaled insulin begins working within 12 to 15 minutes, peaks by 30 minutes, and is out of your system in 180 minutes. Types: Technosphere insulin-inhalation system Afrezza' },
  { name: 'Migraine', medication: 'Tylenol,Advil, Motrin IB,Migranal, Trudhesa,Maxalt, Maxalt-MLT ' },
  { name: 'Heart Disease', medication: 'Aspirin,Statins,Amlodipine ,Norvasc,Diltiazem ,Cardizem, Tiazac,Plendil,Adalat' },
  { name: 'Alzheimers Disease', medication: 'Donepezil,Memantine' },
  { name: 'Influenza', medication: 'Typifix,Amoxil' },
  { name: 'Kidney Stones', medication: 'Chlorhexidine,tamsulosin Flomax,nifedipine (Adalat , Procardia)' },
  { name: 'Leprosy', medication: 'Cubicin, dapsone, rifampin, clofazimine.' },
  { name: 'Malaria', medication: 'Mefloquine,Arakoda, Kozenis, Krintafel,Primaquine:' },
  { name: 'Nephritis', medication: 'natures bounty b12 tablets ,natures bounty boncal plus tablets ,natures bounty fish, flax & borage softgels 1200mg ,natures bounty e softgels 180mg,natures bounty hair, skin & nails softgels 3000mcg,' },
  { name: 'Osteoporosis', medication: 'Osteoporosis,Chlorhexidine' },
  { name: 'Pneumonia', medication: 'azomax 250 capsules 250mg ,novidat tablets 500mg,' },
  { name: 'Quinsy', medication: 'penicillin, amoxicillin, cephalosporin,clindamycin.' },
  { name: 'Rabies', medication: 'osnate-d tablets ,multi bies syrup,zyrtec 60ml syrup 5mg,shield baby wipes ,panadol 30ml oral drops 80mg/0.8ml ' },
  { name: 'Scabies', medication: 'lotrix lotion 60ml,polyfax skin ointment 20g' },
  { name: 'Tuberculosis', medication: 'danzen ds tablets 10mg' },
  { name: 'Ulcer', medication: 'nexum capsules 20mg,risek capsules 20mg ,somogel gel 20g,vonnp tablets 10mg,' },
  { name: 'Varicella', medication: 'velora capsules 500mg,vita care soap 75g,vita-6 tablets 50mg ,voniza tablets 20mg' },
  { name: 'Whooping cough', medication: 'acefyl cough syrup 125ml' },
  { name: 'Xerophthalmia', medication: 'xefecta tablets 400mg,xifaxa tablets 550mg,xika rapid tablets 8mg,xilica capsules 150mg' },
  { name: 'Yellow fever', medication: 'Vaccination,' },
  { name: 'Zika virus', medication: 'arinac forte tablets ,ansaid tablets 100mg,calpol 6 plus 90ml suspension' },
  { name:  `Epilepsy`,medication: `lamnet tablets 50mg,lalap tablets 50mg ,teril tablets 200mg,epival tablets 250mg `}
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
  "Diabetes",
  "Ebola",
  "Flu",
  "Gastroenteritis",
  "Hepatitis",
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
