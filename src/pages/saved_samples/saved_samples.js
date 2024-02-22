import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import './saved_samples.css'
import { useEffect, useState } from 'react';

function SavedSamples(){
    const [savedSamples,setSavedSamples] = useState("");
    const navigate = useNavigate();
    
    let openData = (i) =>{
        let obj = savedSamples[i]
        navigate("/",{state:obj})
   }

   useEffect(()=>{
        fetch("http://localhost:8000/savedSamples")
        .then((res) => res.json())
        .then((data) => setSavedSamples(data))
        .catch((error) => console.log(error));
   },[]);

    return(
        
        <>
            
            <Header
                isSimulatorActive = {false}
                isSavedSamplesActive = {true}
            />
          
            <section className='saved_samples_wrapper'>
                {
                   savedSamples && savedSamples.map((saved_sample_item,index) => (
                        <section key={index} className='saved_samples_container'>
                                <section className='saved_samples_left'>
                                    <section className='saved_samples_left_inner_1'>
                                        {saved_sample_item.sample_title}
                                    </section>
                                    <section className='saved_samples_left_inner_2'>
                                        {saved_sample_item.sample_date}
                                    </section>
                                </section>
                                <section className='saved_samples_right'>
                                        <Button
                                                buttonName = 'Open'
                                                handleOnclick = {() =>  {openData(index)}}
                                        />
                                        <Button
                                                buttonName = 'Remove'
                                                handleOnclick = {null}
                                        />
                                </section>
                        </section>
                    ))
                }
            </section>
             
            
        </>
    )
}

export default SavedSamples;