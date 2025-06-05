// lib/parts-data.js

import { Bird, Car, Target, Zap } from "lucide-react";

/**
 * Mock data for car models.
 */
export const carsData = [
  {
    id: "car-001",
    name: "Falcon",
    logo: Bird,
    modelCode: "FAL-2022",
    imageUrl: "https://placehold.co/400x300/007ACC/FFFFFF.png?text=Falcon",
    shortDescription: "2022, combining performance with advanced aerodynamics.",
    category: "Electric",
  },
  {
    id: "car-002",
    name: "Terra Explorer",
    modelCode: "TRX-2024",
    logo: Car,
    imageUrl:
      "https://placehold.co/400x300/5CB85C/FFFFFF.png?text=Terra+Explorer",
    shortDescription:
      "A rugged and reliable SUV designed for off-road adventures and family trips alike.",
    category: "Petrol",
  },
  {
    id: "car-003",
    name: "CityHopper EV",
    modelCode: "CHEV-2025",
    logo: Target,
    imageUrl:
      "https://placehold.co/400x300/F0AD4E/000000.png?text=CityHopper+EV",
    shortDescription:
      "Compact and efficient electric vehicle, perfect for navigating urban environments.",
    category: "Electric",
  },
  {
    id: "car-004",
    name: "Stallion V8",
    modelCode: "STLN-V8-CLASSIC",
    imageUrl: "",
    logo: Zap,
    shortDescription:
      "Classic American muscle with a roaring V8 engine, delivering raw power.",
    category: "Petrol",
  },
];

/**
 * Helper function to get all cars.
 */
export function getAllCars() {
  return carsData;
}

/**
 * Mock data for the knowledge archive.
 */
export const partsData = [
  // Mechanical > Heat Dissipation
  {
    id: "mech-hd-001",
    carId: ["car-001", "car-002", "car-003", "car-004"],
    name: "Radiator X1000",
    department: "Mechanical",
    subDepartment: "Heat Dissipation",
    shortDescription: "High-performance engine radiator.",
    description:
      "The Radiator X1000 is designed for optimal heat exchange in high-performance internal combustion engines. It features a lightweight aluminum core and durable plastic tanks.",
    partNumber: "RD-X1000-01",
    imageUrl:
      "https://placehold.co/600x400/E2E8F0/4A5568.png?text=Radiator+X1000",
    galleryImages: [
      "https://placehold.co/800x600/E2E8F0/4A5568.png?text=Radiator+View+1",
      "https://placehold.co/400x300/E2E8F0/4A5568.png?text=Radiator+View+2",
      "https://placehold.co/400x300/E2E8F0/4A5568.png?text=Radiator+Detail",
    ],
    specifications: {
      Material: "Aluminum Core, Polymer Tanks",
      Weight: "5.2 kg",
      Manufacturer: "CoolSys Inc.",
      Designer: "Dr. Eva Thermal",
      VersionNumber: "1.3",
      Status: "In Production",
      FlowRate: "150 L/min",
      HeatRejection: "60 kW @ 80°C DeltaT",
    },
    designFiles: [
      { name: "CAD Model X1000.step", url: "#/files/radiator_x1000.step" },
      {
        name: "Thermal Analysis Report.pdf",
        url: "#/files/thermal_report_x1000.pdf",
      },
    ],
    notes:
      "Ensure proper coolant mixture for optimal performance. Check for leaks after installation.",
  },
  {
    id: "mech-hd-002",
    carId: ["car-001"],
    name: "Cooling Fan Assembly CF-250",
    department: "Mechanical",
    subDepartment: "Heat Dissipation",
    shortDescription: "Efficient 12V electric cooling fan.",
    description:
      "The CF-250 is a 12V electric cooling fan assembly designed for auxiliary cooling. It features a high-efficiency motor and aerodynamically optimized blades for maximum airflow with minimal noise.",
    partNumber: "CF-250-04",
    imageUrl:
      "https://placehold.co/600x400/E2E8F0/4A5568.png?text=Cooling+Fan+CF-250",
    galleryImages: [
      "https://placehold.co/800x600/E2E8F0/4A5568.png?text=Fan+View+1",
      "https://placehold.co/400x300/E2E8F0/4A5568.png?text=Fan+Motor",
    ],
    specifications: {
      Material: "Reinforced Polypropylene (Blades), Steel (Frame)",
      Weight: "2.1 kg",
      Manufacturer: "AeroFlow Dynamics",
      Designer: "Engineering Team B",
      VersionNumber: "2.1",
      Status: "Testing",
      Voltage: "12V DC",
      Airflow: "2500 CFM",
    },
    designFiles: [
      { name: "CF-250_Assembly.dwg", url: "#/files/cf250_assembly.dwg" },
    ],
    notes:
      "Verify wiring polarity before connecting to power. Ensure sufficient clearance for blades.",
  },
  // Mechanical > Chassis
  {
    id: "mech-ch-001",
    carId: ["car-001", "car-002"],
    name: "Monocoque Frame Alpha",
    department: "Mechanical",
    subDepartment: "Chassis",
    shortDescription: "Lightweight carbon fiber monocoque.",
    description:
      "The Monocoque Frame Alpha is a state-of-the-art chassis component made from aerospace-grade carbon fiber, offering exceptional rigidity and low weight.",
    partNumber: "MF-ALPHA-007",
    imageUrl:
      "https://placehold.co/600x400/E2E8F0/4A5568.png?text=Monocoque+Alpha",
    galleryImages: [
      "https://placehold.co/800x600/E2E8F0/4A5568.png?text=Monocoque+Full",
      "https://placehold.co/400x300/E2E8F0/4A5568.png?text=Carbon+Weave",
    ],
    specifications: {
      Material: "Carbon Fiber Composite T800",
      Weight: "55 kg",
      Manufacturer: "StructuraLite Composites",
      Designer: "Prof. Adamantium",
      VersionNumber: "1.0",
      Status: "Designed",
      TorsionalRigidity: "35,000 Nm/degree",
    },
    designFiles: [
      {
        name: "Monocoque_Alpha_Master.catpart",
        url: "#/files/monocoque_alpha.catpart",
      },
      { name: "FEA_Report_Alpha.pdf", url: "#/files/fea_report_alpha.pdf" },
    ],
    notes:
      "Requires specialized bonding procedures for assembly. Handle with care to avoid delamination.",
  },
  {
    id: "mech-ch-002",
    carId: ["car-003"],
    name: "Suspension Arm SA-LR-F (Legacy)",
    department: "Mechanical",
    subDepartment: "Chassis",
    shortDescription: "Front lower right suspension arm for Z2023.",
    description:
      "Forged aluminum front lower right suspension arm, designed for durability and precise handling characteristics. Specific to Z2023 model.",
    partNumber: "SA-LR-F-003B-LEG",
    imageUrl:
      "https://placehold.co/600x400/E2E8F0/4A5568.png?text=Suspension+Arm+Legacy",
    galleryImages: [
      "https://placehold.co/800x600/E2E8F0/4A5568.png?text=Arm+Full",
      "https://placehold.co/400x300/E2E8F0/4A5568.png?text=Bushing+Detail",
    ],
    specifications: {
      Material: "6061-T6 Aluminum (Forged)",
      Weight: "2.0 kg",
      Manufacturer: "Precision Auto Parts",
      Designer: "Chassis Dynamics Group (Legacy Div)",
      VersionNumber: "1.5",
      Status: "Archived Production",
      LoadCapacity: "4.5 kN",
    },
    designFiles: [
      {
        name: "SA-LR-F_Legacy_Machining.step",
        url: "#/files/sa_lr_f_legacy.step",
      },
    ],
    notes:
      "Inspect bushings regularly for wear. Torque bolts to specified values. For Z2023 model only.",
  },
  // Electrical > High Voltage
  {
    id: "elec-hv-001",
    carId: ["car-001", "car-002"],
    name: "Battery Pack HVB-800V",
    department: "Electrical",
    subDepartment: "High Voltage",
    shortDescription: "800V, 75kWh Li-ion battery pack.",
    description:
      "The HVB-800V is a high-voltage lithium-ion battery pack designed for electric vehicle applications, featuring advanced thermal management and safety systems.",
    partNumber: "HVB-800-75-02",
    imageUrl: "https://placehold.co/600x400/D1FAE5/065F46.png?text=HV+Battery",
    galleryImages: [
      "https://placehold.co/800x600/D1FAE5/065F46.png?text=Battery+Pack",
      "https://placehold.co/400x300/D1FAE5/065F46.png?text=Module+View",
    ],
    specifications: {
      Material: "Lithium NMC Cells, Aluminum Casing",
      Weight: "450 kg",
      Manufacturer: "ElectroVolt Solutions",
      Designer: "Power Systems Team",
      VersionNumber: "2.5",
      Status: "In Production",
      NominalVoltage: "800 V",
      Capacity: "75 kWh",
    },
    designFiles: [
      { name: "HVB-800V_Schematic.pdf", url: "#/files/hvb_800v_schematic.pdf" },
      { name: "BMS_Firmware_v2.5.hex", url: "#/files/bms_firmware.hex" },
    ],
    notes:
      "High voltage precautions mandatory. Requires specialized charging equipment.",
  },
  // ... (rest of the partsData, ensure each part has a carId array if applicable)
  // Electrical > Low Voltage
  {
    id: "elec-lv-001",
    carId: ["car-001", "car-002"],
    name: "Body Control Module BCM-G5",
    department: "Electrical",
    subDepartment: "Low Voltage",
    shortDescription: "Central BCM for vehicle functions.",
    description:
      "The BCM-G5 manages various low-voltage vehicle functions including lighting, window control, and central locking. Features multiple CAN bus interfaces.",
    partNumber: "BCM-G5-PREM",
    imageUrl: "https://placehold.co/600x400/DBEAFE/1E40AF.png?text=BCM-G5",
    galleryImages: [
      "https://placehold.co/800x600/DBEAFE/1E40AF.png?text=BCM+Top",
      "https://placehold.co/400x300/DBEAFE/1E40AF.png?text=BCM+Connectors",
    ],
    specifications: {
      Material: "Automotive Grade ABS Housing",
      Weight: "0.8 kg",
      Manufacturer: "LogicAuto Systems",
      Designer: "LV Team",
      VersionNumber: "5.1",
      Status: "In Production",
      OperatingVoltage: "9-16V DC",
      CANChannels: "3",
    },
    designFiles: [
      { name: "BCM-G5_Harness.pdf", url: "#/files/bcm_harness.pdf" },
    ],
    notes:
      "Requires configuration programming specific to vehicle model. Protect from moisture.",
  },
  // Electrical > Communication
  {
    id: "elec-comm-001",
    carId: ["car-001", "car-002"],
    name: "CAN Gateway CGW-X2",
    department: "Electrical",
    subDepartment: "Communication",
    shortDescription: "Multi-channel CAN gateway.",
    description:
      "The CGW-X2 provides routing and filtering between multiple CAN networks within the vehicle, ensuring efficient data exchange between ECUs.",
    partNumber: "CGW-X2-PRO",
    imageUrl: "https://placehold.co/600x400/FEF3C7/92400E.png?text=CAN+Gateway",
    galleryImages: [
      "https://placehold.co/800x600/FEF3C7/92400E.png?text=Gateway+Front",
    ],
    specifications: {
      Material: "Aluminum Enclosure",
      Weight: "0.5 kg",
      Manufacturer: "ConnectX Automotive",
      Designer: "Network Architects",
      VersionNumber: "2.0",
      Status: "In Production",
      CANInterfaces: "4 (2x CAN-FD, 2x Classic CAN)",
      Processor: "ARM Cortex-M4",
    },
    designFiles: [
      {
        name: "CGW-X2_ConfigTool_Manual.pdf",
        url: "#/files/cgw_config_manual.pdf",
      },
    ],
    notes:
      "Configuration via dedicated software tool. Ensure proper termination of CAN buses.",
  },
  // Autonomous
  {
    id: "auto-001",
    carId: ["car-001"],
    name: "LiDAR Sensor Array LS-360",
    department: "Autonomous",
    subDepartment: null,
    shortDescription: "360-degree LiDAR perception unit.",
    description:
      "The LS-360 provides a high-resolution 3D point cloud of the vehicle's surroundings, crucial for autonomous driving functions.",
    partNumber: "LS-360-GEN3",
    imageUrl:
      "https://placehold.co/600x400/F3E8FF/6B21A8.png?text=LiDAR+LS-360",
    galleryImages: [
      "https://placehold.co/800x600/F3E8FF/6B21A8.png?text=LiDAR+Top",
      "https://placehold.co/400x300/F3E8FF/6B21A8.png?text=LiDAR+Sensor+Head",
    ],
    specifications: {
      Material: "Anodized Aluminum, Optical Grade Polycarbonate",
      Weight: "1.2 kg",
      Manufacturer: "PerceptiVision",
      Designer: "ADAS Team",
      VersionNumber: "3.1",
      Status: "In Production",
      Range: "200m",
      PointsPerSecond: "1.2 Million",
    },
    designFiles: [
      { name: "LS-360_DataSheet.pdf", url: "#/files/ls360_datasheet.pdf" },
      {
        name: "LS-360_Integration_Guide.pdf",
        url: "#/files/ls360_integration.pdf",
      },
    ],
    notes:
      "Requires precise calibration after installation. Keep optical surfaces clean.",
  },
  // Managerial
  {
    id: "mgmt-001",
    carId: ["car-001", "car-002", "car-003"], // Managerial docs might apply to all
    name: "Project Phoenix Charter",
    department: "Managerial",
    subDepartment: null,
    shortDescription: "Official project charter document.",
    description:
      "The Project Phoenix Charter outlines the scope, objectives, stakeholders, and high-level timeline for the vehicle development project.",
    partNumber: "PROJ-PHX-CHR-001",
    imageUrl:
      "https://placehold.co/600x400/E0E7FF/3730A3.png?text=Project+Charter",
    galleryImages: [
      "https://placehold.co/800x600/E0E7FF/3730A3.png?text=Charter+Page+1",
    ],
    specifications: {
      DocumentType: "Project Charter",
      VersionNumber: "1.0",
      Status: "Approved",
      Author: "Steering Committee",
      ApprovalDate: "2023-01-15",
    },
    designFiles: [
      {
        name: "Project_Phoenix_Charter_v1.0.pdf",
        url: "#/files/project_phoenix_charter.pdf",
      },
    ],
    notes:
      "Key document for project governance. All team members should be familiar with its contents.",
  },
];

/**
 * Helper function to get all parts.
 * Optionally filter by carId if provided.
 * @param {string} [carId] - Optional car ID to filter parts.
 */
export function getAllParts(carName) {
  if (carName) {
    const carId = carsData.find((car) => car.name === carName)?.id;
    if (carId) {
      return partsData.filter(
        (part) => part.carId && part.carId.includes(carId)
      );
    }
    // If a carName is given but not found, what should happen?
    // Maybe return an empty array is better.
    return [];
  } else {
    const cars = getAllCars();

    // 1. Get all parts, including duplicates
    const allParts = cars.flatMap((car) => getAllParts(car.name));

    // 2. Use a Map to get only unique parts based on their 'id'
    const uniquePartsMap = new Map();
    allParts.forEach((part) => {
      uniquePartsMap.set(part.id, part);
    });

    // 3. Convert the Map values back to an array
    return Array.from(uniquePartsMap.values());
  }
}

/**
 * Helper function to get a part by its ID.
 * @param {string} id - The ID of the part.
 */
export function getPartById(id) {
  return partsData.find((part) => part.id === id);
}

/**
 * Helper function to get parts by department and optionally sub-department.
 * Optionally filter by carId if provided.
 * @param {string} department - The department name.
 * @param {string} [subDepartment] - The optional sub-department name.
 * @param {string} [carId] - Optional car ID to filter parts.
 */
export function getPartsByDepartment(department, subDepartment, carName) {
  let filteredParts = partsData;
  if (carName) {
    const carId = carsData.find((car) => car.name === carName)?.id;
    if (carId) {
      filteredParts = partsData.filter(
        (part) => part.carId && part.carId.includes(carId)
      );
    }
  }
  return filteredParts.filter((part) => {
    const departmentMatch =
      part.department.toLowerCase() === department.toLowerCase();
    if (subDepartment) {
      return (
        departmentMatch &&
        part.subDepartment &&
        part.subDepartment.toLowerCase() === subDepartment.toLowerCase()
      );
    }
    return departmentMatch && !part.subDepartment;
  });
}

/**
 * Helper function to get featured parts (e.g., first 3 parts for homepage).
 * Optionally filter by carId if provided.
 * @param {number} count - Number of featured parts to return.
 * @param {string} [carId] - Optional car ID to filter parts.
 */
export function getFeaturedParts(count = 3, carName) {
  let sourceParts = partsData;
  if (carName) {
    const carId = carsData.find((car) => car.name === carName)?.id;
    if (carId) {
      sourceParts = partsData.filter(
        (part) => part.carId && part.carId.includes(carId)
      );

      const featured = [];
      // Try to get one from each major department if available within the car's parts
      const mechanical = sourceParts
        .filter((p) => p.department === "Mechanical")
        .slice(0, 1);
      const electrical = sourceParts
        .filter((p) => p.department === "Electrical")
        .slice(0, 1);
      const autonomous = sourceParts
        .filter((p) => p.department === "Autonomous")
        .slice(0, 1);

      if (mechanical.length > 0) featured.push(mechanical[0]);
      if (electrical.length > 0 && featured.length < count)
        featured.push(electrical[0]);
      if (autonomous.length > 0 && featured.length < count)
        featured.push(autonomous[0]);

      let i = 0;
      while (featured.length < count && i < sourceParts.length) {
        if (!featured.find((p) => p.id === sourceParts[i].id)) {
          featured.push(sourceParts[i]);
        }
        i++;
      }
      return featured.slice(0, count);
    }
  }
  return false;
}
