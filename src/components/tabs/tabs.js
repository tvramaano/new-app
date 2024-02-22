import { useNavigate } from 'react-router-dom';
import './tabs.css'

function Tabs(props){
const navigate = useNavigate();

  function navigateToPage(toPage) {

    navigate(toPage, {replace: true});
  }
    return (
        <>
            <section 
                className={props.isActive?'tab_active':'tab_inactive'}
                onClick={() => navigateToPage(props.page)}
            >
                {props.tabName}
            </section>
            
        </>
    )
}

export default Tabs;