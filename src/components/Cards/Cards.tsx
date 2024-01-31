import { CardsData } from "../../utils/Constants.js";
import Card from "../Card/Card.js";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="Cards">
      {CardsData.map((card, id) => {
        return (
          <div key={id} className="parentContainer">
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              key={id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;