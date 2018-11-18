import React from 'react';

const FooterButtonHOC = (Component, updateFunc, componentId, name, imageUrl, route="") => {
  return (
    <Component
      updateFunc={updateFunc}
      componentId={componentId}
      name={name}
      imageUrl={imageUrl}
      route={route} />
  )
}
export default FooterButtonHOC;
