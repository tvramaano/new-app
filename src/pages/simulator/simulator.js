import { useLocation } from 'react-router-dom';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import './simulator.css'
import { useEffect } from 'react';

let sample_values_arr = [];
const MSG_CODES = {
                        empty_text: 0,
                        no_input_povided: 1,
                        not_a_number: 2,
                        number_added: 3,
                        cleared_all: 4,
                        cleared_all_1: 5,
                        sample_mean_generated: 6,
                        unexpected: 7
                    }

let sampleData = "";
let sampleDataArr = [];
let sampleDataLength = 0;

function Message(e,val){
    let msg = "";
    let msg_foreground = "red";
    switch(e){
        case MSG_CODES.empty_text:
            msg = "There is no sample data provided to generate the sample mean"
            msg_foreground = "red";
        break;
        case MSG_CODES.no_input_povided:
            msg = "There is no value provided to add to the sample"
            msg_foreground = "red";
        break;
        case MSG_CODES.not_a_number:
            msg = "The sample data provided:\""+val+"\" is not a valid sample value"
            msg_foreground = "red";
        break;
        case MSG_CODES.cleared_all:
            msg = "All the sample data has been cleared"
            msg_foreground = "red";
        break;
        case MSG_CODES.cleared_all_1:
            msg = "There is no data in the sample to clear"
            msg_foreground = "red";
        break;
        case MSG_CODES.number_added:
            msg = val+" successfully added to sample"
            msg_foreground = "green"
        break;
        case MSG_CODES.sample_mean_generated:
            msg = "The sample mean results for the provided sample has been generated"
            msg_foreground = "green"
        break;
        default:
            msg = "An unexpected error occurered"
            msg_foreground = "red";
        
    }
    return "<section class='error_message "+msg_foreground+"'>"+msg+"</section>";
        
    
}

function isANumber(val){
    return !isNaN(val) && !isNaN(parseFloat(val));
}



function generateSampleMean(){
    let results = document.getElementById('simulator-results_id');
    let n = sample_values_arr.length;
    let sum_values = "";
    let sum = 0;
    document.getElementById('save-message').innerHTML = "";
    if(n === 0){
        results.innerHTML = Message(MSG_CODES.empty_text);
    }
    
    else{
            if(n === 1){
                sum_values = ""+sample_values_arr[0];
                sum = parseFloat(sample_values_arr[0])
            }
            else{
                    for (let i = 0; i < n; i++) {
                        if(i === 0)
                            sum_values += "("+sample_values_arr[i];
                        else{
                            sum_values += " + "+sample_values_arr[i];
                        }
                        sum += parseFloat(sample_values_arr[i]) 
                        
                    }  
                    sum_values += ")"; 

            } 
        

            results.innerHTML = "<h1>Results</h1></br>";

            results.innerHTML += "<table class = 'sample_mean_results'>"+
                                    "<tr>"+
                                        "<td>x&#772;</td>"+
                                        "<td>= <sup>&#931 x<sub>i</sub></sup>&frasl;<sub>n</sub></td>"+
                                    "</tr>"+
                                    "<tr>"+
                                        "<td></td>"+
                                        "<td>= <sup>"+sum_values+"</sup>&frasl;<sub>"+n+"</sub></td>"+
                                    "</tr>"+
                                    "<tr>"+
                                        "<td></td>"+
                                        "<td>= <sup>"+sum+"</sup>&frasl;<sub>"+n+"</sub></td>"+
                                    "</tr>"+
                                "</table>";
           
    }
}

function clearAll(){
    let number_of_samples = document.getElementById('number_of_samples_id');
    let sample_arr = document.getElementById('sample_data_arr_id');
    let results = document.getElementById('simulator-results_id');
    document.getElementById('save-message').innerHTML = "";
    if(sample_values_arr.length === 0){
        results.innerHTML = Message(MSG_CODES.cleared_all_1);
    }
    else{
        results.innerHTML = Message(MSG_CODES.cleared_all);
        sample_values_arr = [];
        number_of_samples.innerHTML = "n = "+ sample_values_arr.length;
        sample_arr.innerHTML = "x = []";
    }    
}

function addValue(){
    let sampleData = document.getElementById('sample_data_id');
    let results = document.getElementById('simulator-results_id');
    let number_of_samples = document.getElementById('number_of_samples_id');
    let sample_arr = document.getElementById('sample_data_arr_id');
    let strSampleData = ""+sampleData.value;
    document.getElementById('save-message').innerHTML = "";
    if(sampleData.value === ''){
        results.innerHTML = Message(MSG_CODES.no_input_povided,sampleData.value)
    }
    else if(isANumber(strSampleData) === false){
        results.innerHTML = Message(MSG_CODES.not_a_number,sampleData.value)
        sampleData.value = "";
    }
    else{
        sample_values_arr.push(strSampleData);
        results.innerHTML = Message(MSG_CODES.number_added,sampleData.value)
        number_of_samples.innerHTML = "n = "+ sample_values_arr.length;
        sample_arr.innerHTML = "x = [";
        for (let i = 0; i < sample_values_arr.length; i++){
            if(i === 0)
                sample_arr.innerHTML += sample_values_arr[i];
            else
                sample_arr.innerHTML += ", " + sample_values_arr[i];
        }
            
            
        sample_arr.innerHTML += "]";
        sampleData.value = "";
        
    }
}

function Simulator(){
    const convertToFloat = (arr) =>{
        let arrFloat = [];
        for (let i = 0; i < arr.length; i++) {
            let v = arr[i];
            v = parseFloat(v);            
            arrFloat.push(v);
        }

        return arrFloat
    }

    const saveSampleResult = () =>{
        let saved_sample_title = document.getElementById('saved_sample_id');
        let saved_message = document.getElementById('save-message');
        if(saved_sample_title.value === ""){
            saved_message.innerHTML = "Please enter a title for the sample data";
            saved_message.style.color = "red";
        }
        else{
            saved_message.innerHTML = "Sample data titled '"+saved_sample_title.value+"' has been successfully saved.";
            saved_message.style.color = "green";
        }
    }


   const location = useLocation();
    sampleDataLength = 0;
    if(location.state === null){
        sampleData = "[]";
        sampleDataLength = 0;
    }
    else{
        sampleDataArr = location.state.sample_data;
        sample_values_arr = sampleDataArr.split(",");
        sample_values_arr = convertToFloat(sample_values_arr);
        console.log(sample_values_arr)
        sampleData = "[";
        for (let i = 0; i < sample_values_arr.length; i++) {
            sampleDataLength = sampleDataLength + 1;
            if(i < sample_values_arr.length-1)
                sampleData += sample_values_arr[i]+","
            else
                sampleData += sample_values_arr[i]
        }   
        sampleData += "]";
        //sample_values_arr = sampleData;
        console.log("sample_values_arr",sample_values_arr[0])
    }

    useEffect(()=>{
        location.state = null
    })   

    
   
    return(
        <>
            <Header
                isSimulatorActive = {true}
                isSavedSamplesActive = {false}
            />

            <section className='simulator_container'>
                <input type='text' placeholder='Sample heading here' id='saved_sample_id'/>
                <section className='simulator_title'>
                    Add values to the sample one at a time and after completion generate a sample mean
                </section>
                <section className='simulator_input_box_container'>
                    <section className='simulator_input_box'>
                        <textarea
                            id='sample_data_id'
                        />
                    </section>
                    <section className='simulator_input_box_details'>
                        <section 
                                className='simulator_input_box_details_left'
                                id='sample_data_arr_id'
                        >
                            x = {sampleData}
                        </section>
                        <section 
                                className='simulator_input_box_details_right'
                                id='number_of_samples_id'
                        >
                            n = {sampleDataLength}
                        </section>
                    </section>
                </section>

               <section
                    className='simulator-section'
               >
                    <Button
                        buttonName = 'Add Value'
                        handleOnclick = {() => addValue()}
                    />
                    <Button
                        buttonName = 'Clear All'
                        handleOnclick = {() => clearAll()}
                    />
                    <Button
                        buttonName = 'Generate'
                        handleOnclick = {() => generateSampleMean()}
                    />
               </section>

               <section
                    className='simulator-section'
                    id='simulator-results_id'
               >
                  
               </section>

               <section
                    className='simulator-bottom-section'
               >
                    <Button
                        buttonName = 'Save'
                        handleOnclick = {() => saveSampleResult()}
                    />
               </section>
               <section id='save-message'></section>
            </section>

            
        </>
            
    )
}

export default Simulator;