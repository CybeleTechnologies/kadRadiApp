import React from 'react';
import MostImportantContainer from './ObjectButtonGroupContainer/MostImportantContainer';
import InformationContainer from './ObjectButtonGroupContainer/InformationContainer';
import Gallery from './ObjectButtonGroupContainer/Gallery';


const ObjectContentContainer = ({selectedIndex, ...props}) => {
  if(selectedIndex == 0) {
    return <MostImportantContainer {...props}/>
  } else if(selectedIndex == 1) {
    return <InformationContainer {...props} />
  } else {
    return <Gallery  {...props}/>
  }
}

export default ObjectContentContainer;
