import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../css/ScanReport.css';

const ScanReport = () => {
  // Demo scan report data
  const reportData = {
    imagePlaceholder: '/assets/waste-report.jpg',
    wasteType: 'Hazardous',
    wasteCategory: 'Electronic Waste',
    detectedMaterials: [
      { material: 'Plastic', percentage: 40 },
      { material: 'Metal', percentage: 30 },
      { material: 'Glass', percentage: 20 },
      { material: 'Others', percentage: 10 },
    ],
    disposalInstructions: 'Dispose of this waste at a certified hazardous waste disposal facility.',
    recoveryFacilities: [
      { name: 'Taguig Recycling Facility', address: '123 Bonifacio St, Taguig City' },
      { name: 'Green Recyclers', address: '63 Agusan St, Taguig City' },
    ],
    recyclabilityScore: 85,  // 0 to 100 score
    environmentalImpact: 'Moderate impact on the environment due to plastic and metal content.',
  };

  const scanReportText = `
    Type of Waste: ${reportData.wasteType}
    Category of Waste: ${reportData.wasteCategory}
    Detected Materials:
    ${reportData.detectedMaterials.map(item => `${item.material}: ${item.percentage}%`).join('\n')}
    Disposal Instructions: ${reportData.disposalInstructions}
    Suggested Material Recovery Facilities:
    ${reportData.recoveryFacilities.map(facility => `${facility.name} - ${facility.address}`).join('\n')}
    Recyclability Score: ${reportData.recyclabilityScore}/100
    Environmental Impact: ${reportData.environmentalImpact}
  `;

  return (
    <div className="scan-report">
      <h2>Scan Report Details</h2>

      {/* Image Placeholder */}
      <img src={reportData.imagePlaceholder} alt="Scanned Waste" className="scan-image" />

      {/* Waste Type and Category */}
      <p><strong>Type of Waste:</strong> {reportData.wasteType}</p>
      <p><strong>Category of Waste:</strong> {reportData.wasteCategory}</p>

      {/* Detected Materials */}
      <h3>Detected Materials:</h3>
      <ul>
        {reportData.detectedMaterials.map((item, index) => (
          <li key={index}>{item.material}: {item.percentage}%</li>
        ))}
      </ul>

      {/* Disposal Instructions */}
      <h3>Disposal Instructions:</h3>
      <p>{reportData.disposalInstructions}</p>

      {/* Recovery Facilities */}
      <h3>Suggested Material Recovery Facilities:</h3>
      <ul>
        {reportData.recoveryFacilities.map((facility, index) => (
          <li key={index}>{facility.name} - {facility.address}</li>
        ))}
      </ul>

      {/* Recyclability Score and Environmental Impact */}
      <p><strong>Recyclability Score:</strong> {reportData.recyclabilityScore}/100</p>
      <p><strong>Environmental Impact:</strong> {reportData.environmentalImpact}</p>

      {/* Proceed to Message Report Button */}
      <Link
        to="/message-report"
        className="btn-proceed"
        state={{ scanReportText }} // Pass scan report details as state
      >
        Proceed to Message Report
      </Link>
    </div>
  );
};

export default ScanReport;