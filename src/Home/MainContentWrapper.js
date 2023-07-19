import React from 'react';
import './MainContentWrapper.css';

const MainContentWrapper = () => {
  return (
    <div className="mcw">
      <div className="cv">
        <div>
          <div className="inbox">
            <div className="inbox-sb"></div>
            <div className="inbox-bx container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <ul>
                    <li><a href="#">Inbox</a></li>
                    <li><a href="#">Sent</a></li>
                    <li><a href="#">Trash</a></li>
                  </ul>
                </div>
                <div className="col-md-10">
                  <table className="table table-stripped">
                    <tbody>
                      <tr>
                        <td><input type="checkbox" /></td>
                        <td><i className="fa fa-star"></i></td>
                        <td><b>Mozilla</b></td>
                        <td><b>In celebration of women and girls everywhere</b></td>
                        <td></td>
                        <td>Mar 10</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentWrapper;
