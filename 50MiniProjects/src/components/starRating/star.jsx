import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <StarRatingContainer>
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;

        return (
          <Star 
            key={index}
            isActive={index <= (hover || rating)}
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
          />
        );
      })}
    </StarRatingContainer>
  );
};

export default StarRating;

const Star = styled(FaStar)`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "#ffc107" : "#e4e5e9")};  // Active: yellow, Inactive: grey
`;

const StarRatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
