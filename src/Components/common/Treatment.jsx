import React from "react";
import { FaHeartbeat, FaBone } from "react-icons/fa";
import { GiBrain, GiStethoscope, GiMedicines } from "react-icons/gi";

const Treatments = () => {
  const caseTypes = [
    {
      title: "Cardiology",
      description:
        "Advanced heart care with modern diagnostics, minimally invasive procedures, and tailored recovery programs.",
      icon: <FaHeartbeat className="text-red-600 text-4xl" />,
    },
    {
      title: "Orthopedics",
      description:
        "Specialized treatment for joint pain, fractures, sports injuries, and rehabilitation to restore mobility.",
      icon: <FaBone className="text-blue-600 text-4xl" />,
    },
    {
      title: "Neurology",
      description:
        "Comprehensive care for brain, spinal cord, and nerve disorders with accurate diagnosis and treatment.",
      icon: <GiBrain className="text-purple-600 text-4xl" />,
    },
    {
      title: "General Medicine",
      description:
        "Preventive care, routine check-ups, and treatment for a wide range of common and chronic illnesses.",
      icon: <GiStethoscope className="text-green-600 text-4xl" />,
    },
    {
      title: "Pharmacy",
      description:
        "Well-stocked pharmacy with prescription and over-the-counter medicines for all patient needs.",
      icon: <GiMedicines className="text-amber-600 text-4xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="grid gap-6 max-w-4xl w-full sm:grid-cols-2">
        {caseTypes.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5"
          >
            <div className="flex-shrink-0">{service.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Treatments;
