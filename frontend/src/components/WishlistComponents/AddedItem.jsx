import axios from "axios";
import styled from "styled-components";
import Toastify from "toastify-js"
import { IoClose } from "react-icons/io5";
import formatCurrency from "../../utils/formatCurrency";

export const AddedItem = ({ item, updateWishlist }) => {
  console.log(item.status);
  const handleDeleteItem = async (id) => {
    // console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/delete_wishlist_item/${id}`
      );
      if (response) {
        updateWishlist();
        Toastify({
          text: "Item removed!",
          duration: 2000,
          gravity: "top",
          position: "center",
          offset: {
            y: 10 
          },
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#4bb543",
            color: "#fff",
            boxShadow: "0px 0px 4px #888888",
            width: "fit-content",
            height: "48px",
            position: "absolute",
            left: "calc(50vw - 50px)",
            borderRadius: "6px",
            padding: "10px 15px",
            textAlign: "center"
          }
        }).showToast();
      }
    } catch (error) {
      alert(`${error.response.data.id}`);
    }
  };
  return (
    <CardDiv isCompleted={item.status === 'Completed'}>
    
    {item.status === 'Completed' && <CompletedOverlay>Completed</CompletedOverlay>}
    {item.status !== 'Completed' && (
      <button
        onClick={() => handleDeleteItem(item._id)}
        className="z-10 text-gray-600 hover:text-gray-800"
      >
        <IoClose className="h-6 w-6" />
      </button>
    )}
    <WishlistImage src={item.image} />
    <DescriptionWrap>
      <div className="font-extrabold text-xl">{formatCurrency(item.price)}</div>
      <div>
        {item.name.length > 40 ? `${item.name.slice(0, 34)}...` : item.name}
      </div>
    </DescriptionWrap>
  </CardDiv>
  );
};

const DescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const CardDiv = styled.div`
  width: calc((80vw - 140px) / 3);
  height: calc((100vh) / 2);
  min-width: 240px;
  min-height: 240px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid #ececec;
  border-radius: 16px;
  opacity: ${props => props.isCompleted ? 0.5 : 1};
  position: relative;
`;

const CompletedOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
`;

const WishlistImage = styled.img`
  max-width: 100%;
  max-height: 70%;
  margin: auto;
  object-fit: contain;
  border-radius: 10px;
`;
