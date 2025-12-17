import { Container, Row, Col, Card, Button } from "react-bootstrap";
import type { ChatTypes } from "../types/chatTypes.types";

interface cardsDataProps {
  title: string;
  text: string;
  type: ChatTypes;
}

interface CardsGridProps {
  getSelectedCardFn: (text: ChatTypes) => void;
}
const CardsGrid = ({ getSelectedCardFn }: CardsGridProps) => {
  const cardsData: cardsDataProps[] = [
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
      <Row className="flex justify-content-center ">
        <h1 className="">Choose Wich Kind Of Chat You Want To Use!</h1>

        {cardsData.map((card, index) => (
          <Col key={index} md={4} className=" m-3 mt-md-5 ">
            <Card
              className="h-100 mx-3 shadow-lg choice-card "
              style={{ cursor: "pointer" }}
              onClick={() => getSelectedCardFn(card.type)}
            >
              <Card.Body>
                <Card.Title className="fs-3">{card.title}</Card.Title>
                
                <Card.Text className="fs-5">{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardsGrid;
