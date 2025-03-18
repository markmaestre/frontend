// src/Components/user/ScanDetail.jsx
import "../css/ScanDetail.css";

const ScanDetail = () => {
  return (
    <div className="scan-detail-container">
      <h2 className="scan-detail-title">Scan Report Details</h2>
      <div className="scan-detail-content">
        <h3>Scanned Waste</h3>
        <p>
          <strong>Type of Waste:</strong> Hazardous. This waste is classified as hazardous due to its potential risks to human health and the environment. Proper handling and disposal procedures must be followed to ensure that no toxic substances leak into the surroundings, contaminating water sources or causing harm to wildlife. Hazardous waste often includes materials that can corrode, ignite, react, or release toxic fumes when improperly handled.
        </p>
        <p>
          <strong>Category of Waste:</strong> Electronic Waste. Electronic waste, or e-waste, is comprised of discarded electronic devices such as computers, smartphones, televisions, and batteries. These items often contain valuable metals and rare earth elements, but they also pose significant environmental threats due to the presence of hazardous substances like lead, mercury, and cadmium. Proper disposal and recycling can help recover useful materials while minimizing pollution.
        </p>

        <h3>Detected Materials:</h3>
        <p>
          The scanned waste contains a variety of materials that can be identified and potentially recovered. Plastic makes up the largest portion at 40%, which may include casing, covers, and other synthetic components. Metal is present at 30%, likely coming from circuit boards, wiring, and structural supports. Glass accounts for 20%, often found in screens and protective covers, while the remaining 10% consists of miscellaneous materials such as rubber, adhesives, and ceramic elements.
        </p>

        <h3>Disposal Instructions:</h3>
        <p>
          Proper disposal of electronic waste is crucial to preventing environmental contamination. It is highly recommended to take this waste to a certified hazardous waste disposal facility where professionals can safely extract valuable materials and dispose of harmful substances. Attempting to dispose of such waste in general landfill sites can lead to the leaching of toxic chemicals into the soil and water, posing long-term risks to ecosystems and human health.
        </p>

        <h3>Suggested Material Recovery Facilities:</h3>
        <p>
          The following certified facilities are available for proper waste management and material recovery:
        </p>
        <ul>
          <li>
            <strong>Taguig Recycling Facility</strong> - Located at 123 Bonifacio St, Taguig City, this facility specializes in the processing and recycling of electronic waste. They have state-of-the-art machinery to safely extract reusable metals, process plastics, and properly dispose of hazardous components.
          </li>
          <li>
            <strong>Green Recyclers</strong> - Found at 63 Agusan St, Taguig City, Green Recyclers focuses on sustainability and eco-friendly waste management. They work closely with local government agencies and environmental organizations to ensure proper handling and processing of electronic waste materials.
          </li>
        </ul>

        <h3>Recyclability Score:</h3>
        <p>
          The recyclability score of this waste is rated at 85/100, indicating a high potential for material recovery. With proper sorting and processing, most of the materials in this waste stream can be repurposed for future use, reducing the need for raw material extraction and lowering overall environmental impact.
        </p>

        <h3>Environmental Impact:</h3>
        <p>
          This waste has a moderate environmental impact due to its combination of plastic, metal, and hazardous components. While metals can be recovered and reused, the presence of plastics and toxic chemicals presents a challenge. If not properly managed, these substances can contribute to pollution, greenhouse gas emissions, and health risks for workers handling e-waste. By ensuring proper recycling and responsible disposal, these risks can be minimized significantly.
        </p>
      </div>
    </div>
  );
};

export default ScanDetail;
