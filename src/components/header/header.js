import Tabs from '../tabs/tabs';
import './header.css'

function Header(props){
    return (
        
            <section className='header-wrapper' >
                <section className='header-left'>
                    <img alt='sample mean logo' src='./assets/sample_mean_icon.png'/> <span>Sample Mean</span>
                </section>
                <section className='header-right'>
                     <Tabs
                        tabName = "Saved Samples"
                        page = "/savedSamples"
                        isActive = {props.isSavedSamplesActive}
                    />
                    
                    <Tabs
                        tabName = "Simulator"
                        page = "/"
                        isActive = {props.isSimulatorActive}
                    />

                </section>

               
            </section>
        
    );
}

export default Header;