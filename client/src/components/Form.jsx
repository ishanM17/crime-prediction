import React, { useState } from 'react';
import Map from './Map';
import './Form.css'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const FormComponent = () => {
    const [selectedCrimeType, setSelectedCrimeType] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);

    const cityCodes = {
        'Ahmedabad': '0', 'Bengaluru': '1', 'Chennai': '2', 'Coimbatore': '3', 'Delhi': '4',
        'Ghaziabad': '5', 'Hyderabad': '6', 'Indore': '7', 'Jaipur': '8', 'Kanpur': '9',
        'Kochi': '10', 'Kolkata': '11', 'Kozhikode': '12', 'Lucknow': '13', 'Mumbai': '14',
        'Nagpur': '15', 'Patna': '16', 'Pune': '17', 'Surat': '18'
    };

    const crimeOptions = [
        { text: "Crime Committed by Juveniles", value: "0" },
        { text: "Crime against SC", value: "1" },
        { text: "Crime against ST", value: "2" },
        { text: "Crime against Senior Citizen", value: "3" },
        { text: "Crime against children", value: "4" },
        { text: "Crime against women", value: "5" },
        { text: "Cyber Crimes", value: "6" },
        { text: "Economic Offences", value: "7" },
        { text: "Kidnapping", value: "8" },
        { text: "Murder", value: "9" }
    ];

    const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCity && selectedCrimeType && selectedYear) {
            try {
                const response = await fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        city: cityCodes[selectedCity],
                        crime: selectedCrimeType,
                        year: selectedYear,
                    }),
                });

                const result = await response.json();
                setPredictionResult(result);
                const formPosition = document.getElementById('result').offsetTop;
                window.scrollTo({
                    top: formPosition,
                    behavior: 'smooth',
                });
            } catch (error) {
                console.error('Error fetching prediction:', error);
                alert('Failed to fetch prediction. Please try again.');
            }
        } else {
            alert('Please select a city, crime type, and year.');
        }
    };

    return (
        <Container style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <h2 className="text-center mb-4">Crime Rate Prediction</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="crimeType">
                            <Form.Label>Crime Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCrimeType}
                                onChange={(e) => setSelectedCrimeType(e.target.value)}
                                required
                            >
                                <option value="">Select Crime Type</option>
                                {crimeOptions.map((crime, index) => (
                                    <option key={index} value={crime.value}>{crime.text}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                required
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Map onCitySelect={handleCitySelect} />
                {selectedCity && (
                    <p className="text-center mt-3">
                        Selected City: <strong>{selectedCity}</strong>
                    </p>
                )}
                <div className="text-center mt-3">
                    <Button variant="primary" type="submit">
                        Predict Crime Rate
                    </Button>
                </div>
                {predictionResult && (<div className='prediction-result-container'>
                    <div className="mt-4 prediction-result" id='result'>
                        <p><strong>Prediction:</strong> <span>{predictionResult.crime_status}</span></p>
                        <p><strong>Estimated Crime Rate:</strong> <span>{predictionResult.crime_rate}</span></p>
                        <p><strong>Estimated Number of Cases:</strong> <span>{predictionResult.cases}</span></p>
                        <p><strong>Projected Population (in Lakhs):</strong> <span>{predictionResult.population}</span></p>
                    </div>
                </div>)}
            </Form>
        </Container>
    );
};

export default FormComponent;