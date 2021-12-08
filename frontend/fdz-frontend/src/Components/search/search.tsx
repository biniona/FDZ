import { Card, CardModel } from "../../Model";

export const getSearchComponent = () => {
    const searchItems = CardModel.map((c: Card) => getSearchResult(c));
    return (
        <div>
            <h2>Search</h2>
            <ul> {searchItems} </ul>
        </div>
    );
};

const getSearchResult = (card: Card) => {
    if (card === null) {
        return <li>Null Card</li>;
    }

    return (
        <li key={String(card.id)}>
            <a
                onClick={() => displayContent(String(card.id))}
            >{`${card.id} ${card.type}`}</a>
        </li>
    );
};

const displayContent = (message: string) => {
    console.log(message);
};
