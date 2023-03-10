import './index.css';

export default function CardCommon(props){
    return(<div className="card-common" style={props.styles}>
        <h4 className="card-common__type">{props.cardType}</h4>
        <h5 className="card-common__name">{props.cardName}</h5>
        <img className="card-common__image" src={props.cardImage || '#'} alt="#" width='90%'></img>
        <h5 className="card-common__price">{props.cardPrice}</h5>
        <h5 className="card-common__owner">{props.cardOwner}</h5>
    </div>
    );
}