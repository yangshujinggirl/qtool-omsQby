import React ,{ Component } from 'react';
import { Pagination } from 'antd';
import './index.less';

class Qpagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOptions:this.props.sizeOptions||'1',
    }
  }
  onShowSizeChange(currentPage,everyPage) {
    this.props.onShowSizeChange && this.props.onShowSizeChange(currentPage,everyPage)
  }
  initPageSize() {
    const { sizeOptions } = this.state;
    if(sizeOptions == '1') {
      return ['15','30','50','100','200','500']
    } else {
      return ['16','50','100','200']
    };
  }

  render() {
    let { totalCount, everyPage, currentPage } = this.props.data;
    return(
      <div className="common-pagination-components">
        <Pagination
          showTotal={totalCount => `共${totalCount}条`}
          total={totalCount}
          pageSize={everyPage}
          current={currentPage}
          pageSizeOptions={this.initPageSize()}
          onChange={this.props.onChange}
          onShowSizeChange={this.onShowSizeChange.bind(this)}/>
      </div>
    )
  }
}

export default Qpagination;
