import axios from "axios";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export const AddedItem = ({ item, updateWishlist }) => {
  const handleDeleteItem = async (id) => {
    // console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/delete_wishlist_item/${id}`
      );
      if (response) {
        updateWishlist();
        alert("Item deleted!");
      }
    } catch (error) {
      alert(`${error.response.data.id}`);
    }
  };
  return (
    <CardDiv>
      <button
        onClick={() => handleDeleteItem(item._id)}
        className="z-10 text-gray-600 hover:text-gray-800"
      >
        <IoClose className="h-6 w-6" />
      </button>
      <WishlistImage src={item.image} />
      <DesctiptionWrap>
        <div className="font-extrabold text-xl">${item.price}</div>
        <div>
          {item.name.length > 40 ? `${item.name.slice(0, 34)}...` : item.name}
        </div>
      </DesctiptionWrap>
    </CardDiv>
  );
};

const DesctiptionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardDiv = styled.div`
  width: calc((80vw - 140px) / 3);
  height: calc((100vh - 100px) / 2);
  min-width: 240px;
  min-height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid #ececec;
  border-radius: 16px;
`;

const WishlistImage = styled.img`
  max-width: 100%;
  max-height: 70%;
  margin: auto;
  object-fit: contain;
  border-radius: 10px;
`;
