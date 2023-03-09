import './index.css';

export default function CardCommon(props){
    return(<div className="card-common">
        <h4 className="card-common__type">{props.cardType || 'Type'}</h4>
        <h5 className="card-common__name">{props.cardName || 'Lendliz'}</h5>
        <img className="card-common__image" src={props.cardImage || '#'} alt="#"></img>
        <h5 className="card-common__price">{props.cardPrice || '1500'}</h5>
        <h5 className="card-common__owner">{props.cardOwner || 'Owner'}</h5>
    </div>
    );
}