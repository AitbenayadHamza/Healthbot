import '../css/index.css';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

function ScrollableComponent({dicution}) { 
    return (
        <div className="custom-scroll">
            <div className='scrollable-content'>
            <Stack spacing={1} style={{display:"flex",justifyContent:"center"}}>
                <div style={{display:"flex",justifyContent:"center",color:"white"}}>
            <h1>HealthBot</h1>
            </div>
            <Divider style={{marginTop:"40px", borderColor:"white", opacity:"0.2"}} />
            <div>
                {dicution}
                </div>
            </Stack>
            </div>
        </div>
    );
}

export default ScrollableComponent;
