import React from 'react';

const BIDemo = () => {
  return (
    <iframe
      style={{
        height: '95%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      title="Report Section"
      src="
https://app.powerbi.com/view?r=eyJrIjoiMTc1ZDAyMGUtOGY0Zi00NzhjLWE5MjgtNmQ0ZWFjYTY1ZTk4IiwidCI6ImU4OGI4ZDIyLTcyY2EtNGFjMS04ODBhLTRiOGNhZDI1OWExYSIsImMiOjF9"
      frameborder="0"
      allowfullscreen="true"
    ></iframe>
  );
};

export default BIDemo;
