import React from 'react'
import { Tabs} from 'antd';
import AdvancedSearchForm from './EMFormFields.js';
const { TabPane } = Tabs;



class EMForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }
  

  render() {
    const { mode } = this.state;
    return (
      <div>  
      <p></p>
      <AdvancedSearchForm/>        
      </div>
    );
  }
}

export default EMForm
