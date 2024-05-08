import './loader.css';

const Loader = ({ color = '#4da6ff', size = '24' }) => {
  const loaderStyle = {
    '--loader-color': color,
  };

  return (
    <div className='loader'>
      <div className='loadingSpinner' style={{ width: size + 'px' }}>
        <svg className='loadingSpinnerCircleSvg' viewBox='25 25 50 50'>
          <circle
            className='loadingSpinnerCircleStroke'
            cx='50'
            cy='50'
            r='20'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeMiterlimit='10'
            style={loaderStyle}
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
