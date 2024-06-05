import Loading from "../../../components/Loading";
import { ItemListType } from "../../../utils/types";

const ItemList = ({ itemList, itemComponent: ItemCard }: ItemListType) => {
  return (
    <div className="w-full flex justify-center ">
      {itemList && itemList.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-6 ">
          {itemList.map((character: any) => (
            <ItemCard {...character} key={character.id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ItemList;
