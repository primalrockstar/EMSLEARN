export interface Calculator {
  id: number;
  name: string;
  category: string;
  description: string;
  inputs: CalculatorInput[];
  formula: string;
  interpretation: string;
  relatedChapters: number[];
  scope: 'EMT-B' | 'AEMT' | 'Paramedic';
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select';
  unit?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  required: boolean;
}

export const calculators: Calculator[] = [
  {
    id: 1,
    name: "Pediatric Weight Estimation",
    category: "Pediatric",
    description: "Estimates pediatric weight based on age (Broselow method)",
    inputs: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        min: 1,
        max: 10,
        required: true
      }
    ],
    formula: "Weight (kg) = (Age × 2) + 8",
    interpretation: "Estimated weight for medication dosing and equipment sizing",
    relatedChapters: [35], // Pediatric Emergencies
    scope: "EMT-B"
  },
  {
    id: 2,
    name: "Glasgow Coma Scale",
    category: "Neurological",
    description: "Assesses level of consciousness",
    inputs: [
      {
        id: "eyeOpening",
        label: "Eye Opening",
        type: "select",
        options: [
          { value: "4", label: "4 - Spontaneous" },
          { value: "3", label: "3 - To speech" },
          { value: "2", label: "2 - To pain" },
          { value: "1", label: "1 - None" }
        ],
        required: true
      },
      {
        id: "verbalResponse",
        label: "Verbal Response",
        type: "select",
        options: [
          { value: "5", label: "5 - Oriented" },
          { value: "4", label: "4 - Confused" },
          { value: "3", label: "3 - Inappropriate words" },
          { value: "2", label: "2 - Incomprehensible sounds" },
          { value: "1", label: "1 - None" }
        ],
        required: true
      },
      {
        id: "motorResponse",
        label: "Motor Response",
        type: "select",
        options: [
          { value: "6", label: "6 - Obeys commands" },
          { value: "5", label: "5 - Localizes pain" },
          { value: "4", label: "4 - Withdraws from pain" },
          { value: "3", label: "3 - Flexion to pain" },
          { value: "2", label: "2 - Extension to pain" },
          { value: "1", label: "1 - None" }
        ],
        required: true
      }
    ],
    formula: "GCS = Eye Opening + Verbal Response + Motor Response",
    interpretation: "15 = Normal, 13-14 = Mild injury, 9-12 = Moderate injury, 3-8 = Severe injury",
    relatedChapters: [18, 29], // Neurologic Emergencies, Head and Spine Injuries
    scope: "EMT-B"
  },
  {
    id: 3,
    name: "Body Surface Area (Burns)",
    category: "Trauma",
    description: "Calculates percentage of body surface area burned (Rule of Nines)",
    inputs: [
      {
        id: "head",
        label: "Head",
        type: "number",
        unit: "%",
        min: 0,
        max: 9,
        required: false
      },
      {
        id: "armLeft",
        label: "Left Arm",
        type: "number",
        unit: "%",
        min: 0,
        max: 9,
        required: false
      },
      {
        id: "armRight",
        label: "Right Arm",
        type: "number",
        unit: "%",
        min: 0,
        max: 9,
        required: false
      },
      {
        id: "chestFront",
        label: "Chest (Front)",
        type: "number",
        unit: "%",
        min: 0,
        max: 18,
        required: false
      },
      {
        id: "backUpper",
        label: "Back (Upper)",
        type: "number",
        unit: "%",
        min: 0,
        max: 18,
        required: false
      },
      {
        id: "legLeft",
        label: "Left Leg",
        type: "number",
        unit: "%",
        min: 0,
        max: 18,
        required: false
      },
      {
        id: "legRight",
        label: "Right Leg",
        type: "number",
        unit: "%",
        min: 0,
        max: 18,
        required: false
      }
    ],
    formula: "Total BSA = Sum of all affected areas",
    interpretation: "<10% = Minor burn, 10-20% = Moderate burn, >20% = Major burn",
    relatedChapters: [23], // Soft-Tissue Injuries
    scope: "EMT-B"
  },
  {
    id: 4,
    name: "Revised Trauma Score",
    category: "Trauma",
    description: "Physiologic scoring system for trauma patients",
    inputs: [
      {
        id: "gcs",
        label: "Glasgow Coma Scale",
        type: "number",
        min: 3,
        max: 15,
        required: true
      },
      {
        id: "sbp",
        label: "Systolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        min: 0,
        max: 300,
        required: true
      },
      {
        id: "rr",
        label: "Respiratory Rate",
        type: "number",
        unit: "per min",
        min: 0,
        max: 60,
        required: true
      }
    ],
    formula: "RTS = 0.9368(GCS coded) + 0.7326(SBP coded) + 0.2908(RR coded)",
    interpretation: "Higher scores indicate better prognosis. Used for trauma triage.",
    relatedChapters: [21, 11], // Trauma Overview, Patient Assessment
    scope: "EMT-B"
  },
  {
    id: 5,
    name: "Fluid Resuscitation (Parkland Formula)",
    category: "Trauma",
    description: "Calculates fluid requirements for burn patients",
    inputs: [
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        min: 1,
        max: 200,
        required: true
      },
      {
        id: "bsaBurned",
        label: "Body Surface Area Burned",
        type: "number",
        unit: "%",
        min: 0,
        max: 100,
        required: true
      }
    ],
    formula: "Fluid (mL) = 4 × Weight (kg) × BSA burned (%)",
    interpretation: "Total fluid over 24 hours. Give half in first 8 hours.",
    relatedChapters: [23], // Soft-Tissue Injuries
    scope: "AEMT"
  }
];
