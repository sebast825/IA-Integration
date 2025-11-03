import { Container, Row, Col, Card } from "react-bootstrap";

interface CardsGridProps {
  getSelectedCardFn: (text: string) => void;
}
const CardsGrid = ({ getSelectedCardFn }: CardsGridProps) => {
  const cardsData = [
    {
      title: "Single Prompt",
      text: "Isolated questions without context. Perfect for quick searches and one-time tasks.",
      type: "singlePrompt",
    },
    {
      title: "Chat Session",
      text: "Conversation with context memory. Ideal for complex tasks and step-by-step development.",
      type: "chatWithHistory",
    },
  ];

  return (
    <Container>
      <Row className="flex justify-content-center">
        {cardsData.map((card, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card
              className="h-100"
              style={{ cursor: "pointer" }}
              onClick={() => getSelectedCardFn(card.title)}
            >
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardsGrid;
