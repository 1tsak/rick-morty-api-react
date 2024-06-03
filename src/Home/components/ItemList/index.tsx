import { ItemListType } from "../../../utils/types";

const ItemList = ({ itemList,itemComponent:ItemCard }:ItemListType) => {
    
  return (
    <div className="min-h-[300px]">
      {itemList && itemList.length > 0 ? (
        <div className=" grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 min-w-[1225px]  gap-6 ">
        {itemList.map((character: any) => (
          <ItemCard {...character} key={character.id} />
        ))}
        </div>
      ) : (
        <div className="text-center text-white">No Items</div>
      )}
      </div>
  );
};

export default ItemList;
