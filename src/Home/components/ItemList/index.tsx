import { ItemListType } from "../../../utils/types";

const ItemList = ({ itemList,itemComponent:ItemCard }:ItemListType) => {
    
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-6 ">
      {itemList && itemList.length > 0 ? (
        itemList.map((character: any) => (
          <ItemCard {...character} key={character.id} />
        ))
      ) : (
        <>No Characters</>
      )}
    </div>
  );
};

export default ItemList;
