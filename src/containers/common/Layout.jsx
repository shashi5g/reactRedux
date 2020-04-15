import React from'react';
import CharactersListComp from '../../components/CharactersListComp'
import Filters from '../Filters/Filters'

import SelectedFilter from '../../components/SelectedFilter/SelectedFilter'
// import icons from 'glyphicons'

const Layout =(props) => {
  
    return <div className='plp'>
                <div className="left"><Filters/></div>
                <div className="right">  
                <SelectedFilter filterData= {props.filters ?props.filters.filterList:[]} removeFiterItem={props.removeFiterItem}/>
                <CharactersListComp  {...props}/>
                </div>
            </div>
    
}

export default Layout

 