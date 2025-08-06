export interface Medication {
  id: number;
  name: string;
  genericName?: string;
  class: string;
  scope: 'EMT-B' | 'EMT-B*' | 'AEMT' | 'Paramedic';
  indications: string;
  routes: string[];
  contraindications: string[];
  warnings?: string;
  relatedChapters: number[];
}

export const medications: Medication[] = [
  {
    id: 1,
    name: "Acetazolamide",
    genericName: "Diamox",
    class: "Carbonic anhydrase inhibitor",
    scope: "Paramedic",
    indications: "Acute mountain sickness",
    routes: ["PO"],
    contraindications: ["Allergy", "electrolyte imbalance", "liver/kidney disease"],
    relatedChapters: [33] // Environmental Emergencies
  },
  {
    id: 2,
    name: "Acetaminophen",
    genericName: "Tylenol",
    class: "Analgesic / Antipyretic",
    scope: "Paramedic",
    indications: "Pain, fever",
    routes: ["PO", "Rectal", "IV (rare in EMS)"],
    contraindications: ["Allergy", "severe liver disease"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 3,
    name: "Acetic Acid",
    genericName: "Vinegar",
    class: "Topical acidifier",
    scope: "Paramedic",
    indications: "Jellyfish stings (non-U.S.)",
    routes: ["Topical"],
    contraindications: ["May worsen U.S. jellyfish stings"],
    relatedChapters: [33] // Environmental Emergencies
  },
  {
    id: 4,
    name: "Acetylcysteine",
    class: "Antidote",
    scope: "Paramedic",
    indications: "Acetaminophen overdose",
    routes: ["IV", "PO", "Nebulized (rare)"],
    contraindications: ["Acute asthma"],
    warnings: "N/V common orally",
    relatedChapters: [22] // Toxicology
  },
  {
    id: 5,
    name: "Activated Charcoal",
    class: "Adsorbent",
    scope: "AEMT",
    indications: "Toxin/overdose",
    routes: ["PO", "via NG tube"],
    contraindications: ["Unprotected airway", "GI blockage", "caustic ingestion"],
    relatedChapters: [22] // Toxicology
  },
  {
    id: 6,
    name: "Adenosine",
    class: "Antidysrhythmic",
    scope: "Paramedic",
    indications: "SVT",
    routes: ["Rapid IV push"],
    contraindications: ["Allergy", "heart blocks", "flutter/fibrillation"],
    relatedChapters: [17] // Cardiovascular Emergencies
  },
  {
    id: 7,
    name: "Albuterol",
    class: "Beta-2 agonist",
    scope: "EMT-B*",
    indications: "Asthma, COPD",
    routes: ["Nebulized", "MDI"],
    contraindications: ["Allergy", "tachycardia"],
    relatedChapters: [16] // Respiratory Emergencies
  },
  {
    id: 8,
    name: "Amiodarone",
    class: "Class III antidysrhythmic",
    scope: "Paramedic",
    indications: "VT/VF",
    routes: ["IV", "IO"],
    contraindications: ["Allergy", "iodine sensitivity"],
    relatedChapters: [17, 19] // Cardiovascular Emergencies, BLS Resuscitation
  },
  {
    id: 9,
    name: "Calcium Chloride/Gluconate",
    class: "Electrolyte/Antidote",
    scope: "Paramedic",
    indications: "Burns, CCB overdose",
    routes: ["IV", "topical for burns"],
    contraindications: ["Hypercalcemia", "sarcoidosis", "digitalis toxicity"],
    relatedChapters: [22, 23] // Toxicology, Soft-Tissue Injuries
  },
  {
    id: 10,
    name: "Cimetidine",
    class: "H2 blocker",
    scope: "Paramedic",
    indications: "GI bleed, ulcers, allergic reactions",
    routes: ["IV", "PO"],
    contraindications: ["Allergy"],
    relatedChapters: [19, 21] // GI Emergencies, Allergy and Anaphylaxis
  },
  {
    id: 11,
    name: "Dexamethasone",
    class: "Corticosteroid",
    scope: "Paramedic",
    indications: "Croup, altitude sickness, bronchospasm",
    routes: ["IV", "IM", "PO"],
    contraindications: ["Fungal infections", "cerebral malaria"],
    relatedChapters: [16, 33, 35] // Respiratory, Environmental, Pediatric
  },
  {
    id: 12,
    name: "Dextrose",
    genericName: "D50W",
    class: "Carbohydrate",
    scope: "AEMT",
    indications: "Hypoglycemia",
    routes: ["IV"],
    contraindications: ["Hyperglycemia", "intracranial bleed", "dehydration"],
    relatedChapters: [20] // Endocrine and Hematologic Emergencies
  },
  {
    id: 13,
    name: "Diazepam",
    class: "Benzodiazepine",
    scope: "Paramedic",
    indications: "Seizures, sedation",
    routes: ["IV", "IM", "Rectal"],
    contraindications: ["Allergy", "respiratory depression"],
    relatedChapters: [18] // Neurologic Emergencies
  },
  {
    id: 14,
    name: "Diltiazem",
    class: "Calcium channel blocker",
    scope: "Paramedic",
    indications: "Narrow complex tachycardia",
    routes: ["IV"],
    contraindications: ["WPW syndrome", "heart blocks", "hypotension"],
    relatedChapters: [17] // Cardiovascular Emergencies
  },
  {
    id: 15,
    name: "Diphenhydramine",
    class: "Antihistamine",
    scope: "AEMT",
    indications: "Allergies, dystonic reactions",
    routes: ["IM", "IV", "PO"],
    contraindications: ["Allergy", "neonates", "respiratory diseases"],
    relatedChapters: [21] // Allergy and Anaphylaxis
  },
  {
    id: 16,
    name: "Dopamine",
    class: "Vasopressor",
    scope: "Paramedic",
    indications: "Shock",
    routes: ["IV infusion"],
    contraindications: ["Allergy", "pheochromocytoma", "tachydysrhythmias"],
    relatedChapters: [13] // Shock
  },
  {
    id: 17,
    name: "Droperidol",
    class: "Antiemetic / Sedative",
    scope: "Paramedic",
    indications: "Agitation, nausea",
    routes: ["IM", "IV"],
    contraindications: ["Allergy", "prolonged QT"],
    relatedChapters: [23] // Behavioral Health Emergencies
  },
  {
    id: 18,
    name: "Epinephrine",
    class: "Sympathomimetic",
    scope: "EMT-B*",
    indications: "Anaphylaxis, asthma, cardiac arrest",
    routes: ["IM (auto-injector)", "IV", "Nebulized"],
    contraindications: ["Allergy", "hypertrophic cardiomyopathy"],
    relatedChapters: [21, 16, 19] // Allergy, Respiratory, BLS Resuscitation
  },
  {
    id: 19,
    name: "Famotidine",
    class: "H2 blocker",
    scope: "Paramedic",
    indications: "Allergic reactions, ulcers",
    routes: ["PO", "IV"],
    contraindications: ["Allergy"],
    relatedChapters: [19, 21] // GI Emergencies, Allergy
  },
  {
    id: 20,
    name: "Fentanyl",
    class: "Opioid analgesic",
    scope: "Paramedic",
    indications: "Acute pain",
    routes: ["IN", "IV", "IM"],
    contraindications: ["Allergy"],
    warnings: "Caution: elderly, hypotension",
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 21,
    name: "Hydrocortisone Succinate",
    class: "Corticosteroid",
    scope: "Paramedic",
    indications: "Adrenal insufficiency",
    routes: ["IV", "IM"],
    contraindications: ["Serious infection", "allergy"],
    relatedChapters: [20] // Endocrine Emergencies
  },
  {
    id: 22,
    name: "Hydromorphone",
    class: "Opioid analgesic",
    scope: "Paramedic",
    indications: "Severe pain",
    routes: ["IV", "IM"],
    contraindications: ["Allergy"],
    warnings: "Caution: sedatives, head injuries",
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 23,
    name: "Hydroxocobalamin",
    class: "Antidote",
    scope: "Paramedic",
    indications: "Cyanide poisoning",
    routes: ["IV"],
    contraindications: ["Allergy"],
    warnings: "Red discoloration of urine/skin",
    relatedChapters: [22] // Toxicology
  },
  {
    id: 24,
    name: "Ibuprofen",
    class: "NSAID",
    scope: "Paramedic",
    indications: "Pain, fever",
    routes: ["PO"],
    contraindications: ["Allergy", "GI bleed", "pre-op cardiac surgery"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 25,
    name: "Ipratropium",
    class: "Anticholinergic bronchodilator",
    scope: "AEMT",
    indications: "Asthma, COPD",
    routes: ["Nebulized", "MDI"],
    contraindications: ["Allergy to atropine-like compounds"],
    relatedChapters: [16] // Respiratory Emergencies
  },
  {
    id: 26,
    name: "Isopropyl Alcohol",
    class: "Anti-nausea (inhaled)",
    scope: "EMT-B",
    indications: "Nausea/vomiting",
    routes: ["Inhalation via swab"],
    contraindications: ["None listed for EMS use"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 27,
    name: "Ketamine",
    class: "Anesthetic / Sedative",
    scope: "Paramedic",
    indications: "Pain, sedation",
    routes: ["IV", "IM"],
    contraindications: ["Allergy"],
    warnings: "Caution: head injury, hypertension",
    relatedChapters: [15, 23] // Medical Overview, Behavioral Health
  },
  {
    id: 28,
    name: "Ketorolac",
    class: "NSAID",
    scope: "Paramedic",
    indications: "Moderate-severe pain",
    routes: ["IM", "IV"],
    contraindications: ["Allergy", "renal failure", "GI bleed"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 29,
    name: "Labetalol",
    class: "Beta blocker",
    scope: "Paramedic",
    indications: "Hypertensive emergency",
    routes: ["IV"],
    contraindications: ["Allergy", "bradycardia"],
    relatedChapters: [17] // Cardiovascular Emergencies
  },
  {
    id: 30,
    name: "Lidocaine",
    class: "Class Ib antidysrhythmic",
    scope: "Paramedic",
    indications: "VT/VF",
    routes: ["IV", "IO"],
    contraindications: ["Allergy", "heart block"],
    relatedChapters: [17, 19] // Cardiovascular, BLS Resuscitation
  },
  {
    id: 31,
    name: "Lorazepam",
    class: "Benzodiazepine",
    scope: "Paramedic",
    indications: "Seizures, anxiety, hypothermia shivering",
    routes: ["IV", "IM"],
    contraindications: ["Allergy", "glaucoma", "respiratory depression"],
    relatedChapters: [18, 33] // Neurologic, Environmental
  },
  {
    id: 32,
    name: "Magnesium Sulfate",
    class: "Electrolyte / Antidysrhythmic",
    scope: "Paramedic",
    indications: "Torsades, asthma, eclampsia",
    routes: ["IV", "IM"],
    contraindications: ["Heart block", "renal failure"],
    relatedChapters: [17, 16, 34] // Cardiovascular, Respiratory, Obstetrics
  },
  {
    id: 33,
    name: "Methylprednisolone",
    class: "Corticosteroid",
    scope: "Paramedic",
    indications: "Asthma, adrenal insufficiency",
    routes: ["IV"],
    contraindications: ["Infection", "allergy", "brain injury"],
    relatedChapters: [16, 20] // Respiratory, Endocrine
  },
  {
    id: 34,
    name: "Metoclopramide",
    class: "Antiemetic",
    scope: "Paramedic",
    indications: "Nausea, vomiting",
    routes: ["IM", "IV"],
    contraindications: ["GI bleed", "seizures"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 35,
    name: "Metoprolol",
    class: "Beta-1 blocker",
    scope: "Paramedic",
    indications: "Tachycardia",
    routes: ["IV"],
    contraindications: ["Allergy", "heart block", "shock"],
    relatedChapters: [17] // Cardiovascular Emergencies
  },
  {
    id: 36,
    name: "Midazolam",
    class: "Benzodiazepine",
    scope: "Paramedic",
    indications: "Seizures, sedation",
    routes: ["IM", "IV", "IN"],
    contraindications: ["Allergy", "respiratory depression"],
    relatedChapters: [18, 23] // Neurologic, Behavioral Health
  },
  {
    id: 37,
    name: "Morphine Sulfate",
    class: "Opioid analgesic",
    scope: "Paramedic",
    indications: "Severe pain",
    routes: ["IV", "IM"],
    contraindications: ["Allergy", "head injury", "respiratory depression"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 38,
    name: "Naloxone",
    class: "Opioid antagonist",
    scope: "EMT-B",
    indications: "Opioid overdose",
    routes: ["IN", "IV", "IM"],
    contraindications: ["Allergy"],
    warnings: "May cause withdrawal symptoms",
    relatedChapters: [22] // Toxicology
  },
  {
    id: 39,
    name: "Nifedipine",
    class: "Calcium channel blocker",
    scope: "Paramedic",
    indications: "HAPE",
    routes: ["PO (gel cap punctured)"],
    contraindications: ["Allergy", "hypotension"],
    relatedChapters: [33] // Environmental Emergencies
  },
  {
    id: 40,
    name: "Nitrous Oxide",
    class: "Analgesic gas",
    scope: "EMT-B*",
    indications: "Pain, agitation, hypothermia shivering",
    routes: ["Inhaled"],
    contraindications: ["Pneumothorax", "bowel obstruction"],
    relatedChapters: [15, 33] // Medical Overview, Environmental
  },
  {
    id: 41,
    name: "Nitroglycerin",
    class: "Vasodilator",
    scope: "AEMT",
    indications: "Chest pain, pulmonary edema",
    routes: ["SL", "topical", "IV"],
    contraindications: ["Allergy", "hypotension", "recent ED meds"],
    relatedChapters: [17] // Cardiovascular Emergencies
  },
  {
    id: 42,
    name: "Norepinephrine",
    class: "Vasopressor",
    scope: "Paramedic",
    indications: "Shock",
    routes: ["IV infusion"],
    contraindications: ["Allergy", "hypovolemia"],
    relatedChapters: [13] // Shock
  },
  {
    id: 43,
    name: "Olanzapine",
    class: "Antipsychotic",
    scope: "Paramedic",
    indications: "Behavioral emergencies",
    routes: ["IM", "ODT (EMS optional)"],
    contraindications: ["Allergy"],
    warnings: "Coma risk with sedatives",
    relatedChapters: [23] // Behavioral Health Emergencies
  },
  {
    id: 44,
    name: "Ondansetron",
    class: "Antiemetic",
    scope: "AEMT",
    indications: "Nausea, vomiting",
    routes: ["IV", "IM", "PO", "ODT"],
    contraindications: ["Allergy", "QT prolongation"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 45,
    name: "Oxymetazoline",
    class: "Nasal vasoconstrictor",
    scope: "Paramedic",
    indications: "Nosebleeds",
    routes: ["Nasal spray"],
    contraindications: ["Allergy"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 46,
    name: "Potassium Iodide",
    class: "Radiation antidote",
    scope: "Paramedic",
    indications: "Radiation exposure",
    routes: ["PO"],
    contraindications: ["Allergy", "thyroid disease"],
    relatedChapters: [44] // Hazardous Materials
  },
  {
    id: 47,
    name: "Prednisone / Prednisolone",
    class: "Corticosteroid",
    scope: "Paramedic",
    indications: "Inflammation, asthma",
    routes: ["PO"],
    contraindications: ["Infection", "allergy", "chickenpox"],
    relatedChapters: [16] // Respiratory Emergencies
  },
  {
    id: 48,
    name: "Pralidoxime",
    genericName: "2-PAM",
    class: "Antidote",
    scope: "Paramedic",
    indications: "Organophosphate poisoning",
    routes: ["IM", "IV"],
    contraindications: ["Allergy"],
    relatedChapters: [22] // Toxicology
  },
  {
    id: 49,
    name: "Procainamide",
    class: "Antidysrhythmic",
    scope: "Paramedic",
    indications: "Tachycardia",
    routes: ["IV"],
    contraindications: ["Allergy", "heart block", "lupus"],
    relatedChapters: [17] // Cardiovascular Emergencies
  },
  {
    id: 50,
    name: "Prochlorperazine",
    class: "Antiemetic",
    scope: "Paramedic",
    indications: "Nausea, vomiting",
    routes: ["IM", "IV"],
    contraindications: ["Seizures", "coma", "<2 years old"],
    relatedChapters: [15] // Medical Overview
  },
  {
    id: 51,
    name: "Sildenafil",
    class: "Pulmonary vasodilator",
    scope: "Paramedic",
    indications: "HAPE",
    routes: ["PO"],
    contraindications: ["Allergy", "nitrate use"],
    relatedChapters: [33] // Environmental Emergencies
  },
  {
    id: 52,
    name: "Sodium Bicarbonate",
    class: "Alkalinizer / Antidote",
    scope: "Paramedic",
    indications: "Cardiac arrest, overdose",
    routes: ["IV"],
    contraindications: ["Alkalosis", "hypernatremia"],
    relatedChapters: [19, 22] // BLS Resuscitation, Toxicology
  },
  {
    id: 53,
    name: "Sodium Nitrite / Thiosulfate",
    class: "Cyanide antidote",
    scope: "Paramedic",
    indications: "Cyanide toxicity",
    routes: ["IV"],
    contraindications: ["Allergy"],
    warnings: "Hypotension risk",
    relatedChapters: [22] // Toxicology
  },
  {
    id: 54,
    name: "Sorbitol",
    class: "Cathartic",
    scope: "Paramedic",
    indications: "Toxic ingestion",
    routes: ["PO"],
    contraindications: ["GI pain", "allergy"],
    warnings: "No longer recommended with charcoal",
    relatedChapters: [22] // Toxicology
  },
  {
    id: 55,
    name: "Ziprasidone",
    class: "Antipsychotic",
    scope: "Paramedic",
    indications: "Agitation, psychosis",
    routes: ["IM"],
    contraindications: ["Allergy", "QT prolongation"],
    relatedChapters: [23] // Behavioral Health Emergencies
  }
];
