import React from 'react';
import { GridLoader } from 'react-spinners';

class ReactLoader extends React.Component {

  render() {
    return (
      <div className='ReactLoader-container'>
      <div className='sweet-loading'>
        <GridLoader
          color={'#cd486b'}
          loading={true}
        />
      </div>
    </div>
    )
  }
}
export default ReactLoader;
