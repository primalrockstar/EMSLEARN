export interface Calculator {
  id: string
  title: string
  description: string
  formula: string
  tags: string[]
  relatedProtocols: string[]
  relatedMedications: string[]
  relatedChapters: string[]
}

export const calculators: Calculator[] = [
  {
    id: 'apgar',
    title: 'APGAR Score',
    description: 'Newborn assessment calculator',
    formula: 'Sum Appearance, Pulse, Grimace, Activity, Respiration scores',
    tags: ['Neonatal', 'Assessment'],
    relatedProtocols: ['Neonatal Resuscitation'],
    relatedMedications: [],
    relatedChapters: ['Pediatrics']
  },
  {
    id: 'gcs',
    title: 'Glasgow Coma Scale',
    description: 'Neurological assessment',
    formula: 'Sum Eye, Verbal, Motor responses scores',
    tags: ['Neuro', 'Assessment'],
    relatedProtocols: ['Altered Mental Status'],
    relatedMedications: [],
    relatedChapters: ['Neurology']
  },
  {
    id: 'pedDose',
    title: 'Pediatric Dosing',
    description: 'Weight-based medication calculations',
    formula: 'Dose = weight (kg) × dose per kg',
    tags: ['Pediatric', 'Medication'],
    relatedProtocols: ['Pediatric Medication'],
    relatedMedications: ['Epinephrine', 'Atropine'],
    relatedChapters: ['Pharmacology', 'Pediatrics']
  },
  {
    id: 'ivFlow',
    title: 'IV Flow Rate',
    description: 'Drip rate calculator for IV fluids',
    formula: 'Flow Rate = (Volume × Drop Factor) / Time',
    tags: ['IV', 'Fluid'],
    relatedProtocols: ['Shock', 'Fluid Management'],
    relatedMedications: [],
    relatedChapters: ['Shock', 'IV Therapy']
  },
  {
    id: 'parkland',
    title: 'Parkland Formula',
    description: 'Burn resuscitation fluid calculator',
    formula: 'Fluid = 4 mL × body weight (kg) × %TBSA burned',
    tags: ['Burns', 'Fluid', 'Pediatrics'],
    relatedProtocols: ['Burn Management'],
    relatedMedications: [],
    relatedChapters: ['Burns', 'Trauma']
  },
  {
    id: 'rsidosing',
    title: 'RSI Medication Dosing',
    description: 'Rapid Sequence Intubation medication dose calculator',
    formula: 'Dose = weight (kg) × mg/kg for agent',
    tags: ['Airway', 'Pharmacology', 'RSI'],
    relatedProtocols: ['Airway Management', 'RSI'],
    relatedMedications: ['Etomidate', 'Succinylcholine'],
    relatedChapters: ['Airway', 'Pharmacology']
  },
  {
    id: 'aclsDose',
    title: 'Adult Cardiac Life Support (ACLS) Drug Dosing',
    description: 'ACLS drug dosing calculator for cardiac arrest',
    formula: 'Dose per protocol for drug/weight',
    tags: ['Cardiac', 'Medication', 'ACLS'],
    relatedProtocols: ['Cardiac Arrest'],
    relatedMedications: ['Epinephrine', 'Amiodarone'],
    relatedChapters: ['Cardiology', 'Pharmacology']
  },
  {
    id: 'pedResus',
    title: 'Pediatric Resuscitation Dosing',
    description: 'Calculates fluid, medication, and shock doses for children',
    formula: 'Dose = weight-based, varies by protocol',
    tags: ['Pediatric', 'Resuscitation'],
    relatedProtocols: ['Pediatric Arrest', 'Pediatric Shock'],
    relatedMedications: ['Epinephrine', 'Fluid'],
    relatedChapters: ['Pediatrics', 'Shock']
  },
  {
    id: 'traumaScore',
    title: 'Revised Trauma Score',
    description: 'Trauma severity assessment calculator',
    formula: 'RTS = coded GCS + coded SBP + coded RR',
    tags: ['Trauma', 'Assessment'],
    relatedProtocols: ['Trauma Triage'],
    relatedMedications: [],
    relatedChapters: ['Trauma']
  },
  {
    id: 'strokeScale',
    title: 'Cincinnati Stroke Scale',
    description: 'Stroke assessment tool',
    formula: 'Assessment of facial droop, arm drift, speech',
    tags: ['Neurology', 'Assessment'],
    relatedProtocols: ['Stroke'],
    relatedMedications: [],
    relatedChapters: ['Neurology']
  },
  {
    id: 'chadsvasc',
    title: 'CHA₂DS₂-VASc Score',
    description: 'Atrial fibrillation stroke risk calculator',
    formula: 'Score based on age, sex, comorbidities',
    tags: ['Cardiac', 'Assessment'],
    relatedProtocols: ['Atrial Fibrillation'],
    relatedMedications: [],
    relatedChapters: ['Cardiology']
  },
  {
    id: 'map',
    title: 'Mean Arterial Pressure',
    description: 'Calculates average arterial pressure',
    formula: 'MAP = (2 × diastolic + systolic) / 3',
    tags: ['Cardiac', 'Vitals'],
    relatedProtocols: ['Shock', 'Critical Care'],
    relatedMedications: [],
    relatedChapters: ['Cardiology', 'Shock']
  },
  {
    id: 'bmi',
    title: 'Body Mass Index',
    description: 'BMI calculator for adults',
    formula: 'BMI = weight (kg) / height (m)^2',
    tags: ['General', 'Vitals'],
    relatedProtocols: [],
    relatedMedications: [],
    relatedChapters: ['Assessment']
  },
  {
    id: 'anionGap',
    title: 'Anion Gap',
    description: 'Electrolyte imbalance assessment',
    formula: 'Anion Gap = Na - (Cl + HCO3)',
    tags: ['Metabolic', 'Assessment'],
    relatedProtocols: ['Metabolic Acidosis'],
    relatedMedications: [],
    relatedChapters: ['Metabolism']
  },
  {
    id: 'correctedNa',
    title: 'Corrected Sodium',
    description: 'Adjusts sodium for hyperglycemia',
    formula: 'Corrected Na = measured Na + 1.6 × ((glucose - 100)/100)',
    tags: ['Metabolic', 'Assessment'],
    relatedProtocols: ['Diabetic Emergencies'],
    relatedMedications: [],
    relatedChapters: ['Metabolism']
  },
  {
    id: 'fluidBolus',
    title: 'Fluid Bolus Calculator',
    description: 'IV fluid bolus for shock',
    formula: 'Bolus = weight (kg) × 20 mL/kg',
    tags: ['Shock', 'Fluid'],
    relatedProtocols: ['Shock', 'Sepsis'],
    relatedMedications: ['Normal Saline'],
    relatedChapters: ['Shock', 'IV Therapy']
  },
  {
    id: 'bsa',
    title: 'Body Surface Area (BSA)',
    description: 'Burn area calculator for adults/peds',
    formula: 'BSA = sqrt((height (cm) × weight (kg))/3600)',
    tags: ['Burns', 'Assessment'],
    relatedProtocols: ['Burn Management'],
    relatedMedications: [],
    relatedChapters: ['Burns']
  },
  {
    id: 'naca',
    title: 'NACA Score',
    description: 'Severity scoring for prehospital patients',
    formula: 'Scored 0–7 based on severity/urgency',
    tags: ['Assessment', 'Trauma'],
    relatedProtocols: ['Trauma Triage'],
    relatedMedications: [],
    relatedChapters: ['Trauma']
  }
]

// Utility: Find calculator by ID
export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find(calc => calc.id === id)
}

// Utility: Search calculators by keyword
export function searchCalculators(term: string): Calculator[] {
  const lc = term.toLowerCase()
  return calculators.filter(calc =>
    calc.title.toLowerCase().includes(lc) ||
    calc.description.toLowerCase().includes(lc) ||
    calc.tags.some(tag => tag.toLowerCase().includes(lc))
  )
}