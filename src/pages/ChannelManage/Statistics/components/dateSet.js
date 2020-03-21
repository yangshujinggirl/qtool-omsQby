import moment from 'moment';

const disabledDate = current => {
  return current && current > moment().endOf('day').subtract(1,'days');
};

export default disabledDate