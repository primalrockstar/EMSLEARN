// Chapter to Module mapping based on your actual PDF structure
export const chapterToModuleMap: { [key: number]: number } = {
  // Module 1: Preparatory (Chapters 1-4)
  1: 1,  // EMS Systems
  2: 1,  // Workforce Safety and Wellness
  3: 1,  // Medical, Legal and Ethical Issues
  4: 1,  // Communications and Documentation
  
  // Module 2: Basic Sciences (Chapters 5-9)
  5: 2,  // Medical Terminology
  6: 2,  // The Human Body
  7: 2,  // Life Span Development
  8: 2,  // Lifting and Moving Patients
  9: 2,  // The Team Approach to Healthcare
  
  // Module 3: Assessment (Chapters 10-12)
  10: 3, // Patient Assessment
  11: 3, // Airway Management
  12: 3, // Principles of Pharmacology
  
  // Module 4: Shock/BLS (Chapters 13-14)
  13: 4, // Shock
  14: 4, // BLS Resuscitation
  
  // Module 5: Medical Emergencies I (Chapters 15-17)
  15: 5, // Medical Overview
  16: 5, // Respiratory Emergencies
  17: 5, // Cardiovascular Emergencies
  
  // Module 6: Medical Emergencies II (Chapters 18-24)
  18: 6, // Neurologic Emergencies
  19: 6, // Gastrointestinal and Urologic Emergencies
  20: 6, // Endocrine and Hematologic Emergencies
  21: 6, // Allergy and Anaphylaxis
  22: 6, // Toxicology
  23: 6, // Behavioral Health Emergencies
  24: 6, // Gynecologic Emergencies
  
  // Module 7: Trauma I (Chapters 25-27)
  25: 7, // Trauma Overview
  26: 7, // Bleeding
  27: 7, // Soft-Tissue Injuries
  
  // Module 8: Trauma II (Chapters 28-33)
  28: 8, // Face and Neck Injuries
  29: 8, // Head and Spine Injuries
  30: 8, // Chest Injuries
  31: 8, // Abdominal and Genitourinary Injuries
  32: 8, // Orthopedic Injuries
  33: 8, // Environmental Emergencies
  
  // Module 9: Special Populations (Chapters 34-37)
  34: 9, // Obstetrics and Neonatal Care
  35: 9, // Pediatric Emergencies
  36: 9, // Geriatric Emergencies
  37: 9, // Special Challenges
  
  // Module 10: Operations (Chapters 38-41)
  38: 10, // Transport Operations
  39: 10, // Vehicle Extrication and Special Rescue
  40: 10, // Incident Management
  41: 10  // Terrorism and Disaster Management
};

export const moduleDefinitions = [
  {
    id: 1,
    title: "Module 1: Preparatory",
    description: "Foundation concepts for EMT practice including EMS systems, workforce safety, medical/legal issues, and communication.",
    chapters: [1, 2, 3, 4]
  },
  {
    id: 2,
    title: "Module 2: Basic Sciences",
    description: "Medical terminology, human body systems, life span development, and patient handling.",
    chapters: [5, 6, 7, 8, 9]
  },
  {
    id: 3,
    title: "Module 3: Assessment",
    description: "Patient assessment, airway management, and pharmacology principles.",
    chapters: [10, 11, 12]
  },
  {
    id: 4,
    title: "Module 4: Shock and BLS",
    description: "Shock management and basic life support resuscitation.",
    chapters: [13, 14]
  },
  {
    id: 5,
    title: "Module 5: Medical Emergencies I",
    description: "Medical overview and respiratory/cardiovascular emergencies.",
    chapters: [15, 16, 17]
  },
  {
    id: 6,
    title: "Module 6: Medical Emergencies II",
    description: "Neurologic, GI, endocrine, allergic, toxicologic, behavioral, and gynecologic emergencies.",
    chapters: [18, 19, 20, 21, 22, 23, 24]
  },
  {
    id: 7,
    title: "Module 7: Trauma I",
    description: "Trauma overview, bleeding, and soft tissue injuries.",
    chapters: [25, 26, 27]
  },
  {
    id: 8,
    title: "Module 8: Trauma II",
    description: "Face/neck, head/spine, chest, abdominal, orthopedic, and environmental injuries.",
    chapters: [28, 29, 30, 31, 32, 33]
  },
  {
    id: 9,
    title: "Module 9: Special Populations",
    description: "Obstetrics, pediatric, geriatric, and special challenge patients.",
    chapters: [34, 35, 36, 37]
  },
  {
    id: 10,
    title: "Module 10: Operations",
    description: "Transport operations, vehicle extrication, incident management, and disaster response.",
    chapters: [38, 39, 40, 41]
  }
];
