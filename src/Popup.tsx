import './Popup';
import { confrimButton } from './types';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import classBoard from './img/classBoard.png'


type Props = {
    context: string,
    buttons: confrimButton[]
}


const Popup:React.FC<Props> = (props) => {

    const img = classBoard;


    return(
        <>
       
        
        <div className='modal-overlay'>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.context}
        </Typography>
         </CardContent>
      <CardActions>
        {props.buttons.map((button, index) => (
            <Button key={index} onClick={button.onClick} size="small">{button.label}</Button>
        ))}
        
        
      </CardActions>
    </Card>
            {/* <div className='modal-content'> {props.context}
            <div>
                {props.buttons.map((button, index) => (
                    <button key={index} onClick={button.onClick}>{button.label}</button>
                ))}
            
            </div>
            </div> */}
            
        </div>
        </>
    )

}

export default Popup;