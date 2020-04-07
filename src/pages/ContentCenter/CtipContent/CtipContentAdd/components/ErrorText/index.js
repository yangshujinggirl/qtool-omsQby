import './index.less';

function ErrorText({currentItem}) {
  return <div className="valte-error-text">{currentItem.message}</div>
}

export default ErrorText;
