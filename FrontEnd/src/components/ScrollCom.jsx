import '../css/index.css';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useEffect, useRef } from 'react';

function ScrollableComponent({ dicution }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [dicution]);

    return (
        <div className="custom-scroll" ref={scrollRef}>
            <div className='scrollable-content'>
                <Stack spacing={1} style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", color: "black" }}>
                        
                    </div>
                    <Divider style={{ marginTop: "40px", borderColor: "black", opacity: "0.2" }} />
                    <div>
                        {dicution}
                    </div>
                </Stack>
            </div>
        </div>
    );
}

export default ScrollableComponent;
