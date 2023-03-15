import './index.css';
import CardCommon from '../playSteps/_cardCommon/CardCommon'


export default function PlayFieldCentralArea(){
    return(
        <div className='inner-area'>
            <CardCommon visibility={true}/>
            <CardCommon visibility={true}/>
        </div>
    );
}