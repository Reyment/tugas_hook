import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardList = () => {

    const [newsData, setNewsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const apiKey = '1e5350f1eca641e7a5e9e107631fdc33'; 
    const apiUrl = 'https://newsapi.org/v2/top-headlines';
    const country = 'us'; 

    useEffect(() => {
        const fetchData = async () => {
            try {

                const url = searchTerm
                    ? `${apiUrl}?country=${country}&apiKey=${apiKey}&q=${searchTerm}`
                    : `${apiUrl}?country=${country}&apiKey=${apiKey}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setNewsData(data.articles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm]);


    return (
        <Container>
            <h1 className='py-3'>Berita Terkini</h1>
            <div>
                <label htmlFor="search">Search: </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Row className="justify-content-md-center mt-3 gap-4">
                {newsData.map((article, index) => (
                    <Col key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={article.urlToImage} />
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text>
                                    {article.description}
                                </Card.Text>
                                <Button href={article.url} target="_blank" variant="primary">Read More</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
        </Container>
    )
}

export default CardList