// dichvu.js
import React from 'react';
import './dichvu.css';

import tayTrangrang from '../../../assets/images/taytrangrang.jpg';
import nienRang from '../../../assets/images/niengrang.jpg';
import nienRangtrongsuot from '../../../assets/images/nienrangtrongsuot.jpg';
import Dinhky from '../../../assets/images/chamsocrangdinhki.jpg';
import cayImplant from '../../../assets/images/cayImplant.jpg';

export default function DichVu() {
  return (
    <section className="section dich-vu hide-for-small " id="section_299724152">
      <div className="bg section-bg fill bg-fill">
        {/* Nội dung của phần tiêu đề */}
        <div className="section-content relative">
          <div className="row row-small" id="row-643724412">
            <div className="col medium-4 small-12 large-4">
              <div className="col-inner"></div>
            </div>
            <div className="col medium-8 small-12 large-8">
              <div className="col-inner dark">
                <h2 id="dich-vu" style={{ textAlign: 'right' }}>
                  ĐA DẠNG DỊCH VỤ NHA KHOA<br />TỰ TIN CHĂM SÓC NỤ CƯỜI CỦA BẠN
                </h2>
                <p style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '95%' }}>Đội ngũ y bác sỹ và chăm sóc</span>
                  <br />
                  <span style={{ fontSize: '95%' }}>có tay nghề cao của chúng tôi luôn cố gắng</span>
                  <br />
                  <span style={{ fontSize: '95%' }}>cung cấp cho bạn một dịch vụ tuyệt vời</span>
                  <br />
                  <span style={{ fontSize: '95%' }}>để bạn có thể cảm thấy thoải mái trong môi trường ấm áp</span>
                  <br />
                  <span style={{ fontSize: '95%' }}>và thân thiện của chúng tôi.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Nội dung của các hình ảnh dịch vụ */}
          <div className="banner-grid-wrapper">
            <div id="banner-grid-2062583998" className="banner-grid row row-grid row-collapse" data-packery-options="">
              <div className="col grid-col large-4 grid-col-1-3">
                <div className="col-inner">
                  <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_704785085">
                    <a className="" href="#" target="_blank" rel="noopener noreferrer">
                      <div className="img-inner image-zoom image-cover dark" style={{ paddingTop: '56.25%' }}>
                        <img
                          width="258"
                          height="151"
                          src={tayTrangrang}
                          className="attachment-original size-original"
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col grid-col large-4 grid-col-1-3">
                <div className="col-inner">
                  <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_130688349">
                    <a className="" href="#" target="_blank" rel="noopener noreferrer">
                      <div className="img-inner image-zoom dark">
                        <img
                          width="258"
                          height="151"
                          src={nienRang}
                          className="attachment-original size-original"
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col grid-col large-4 grid-col-1-3">
                <div className="col-inner">
                  <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_1246153407">
                    <a className="" href="#" target="_blank" rel="noopener noreferrer">
                      <div className="img-inner image-zoom dark">
                        <img
                          width="258"
                          height="151"
                          src={nienRangtrongsuot}
                          className="attachment-original size-original"
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col grid-col large-8 grid-col-1-3">
                <div className="col-inner">
                  <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_21352450">
                    <a className="" href="#" target="_blank" rel="noopener noreferrer">
                      <div className="img-inner image-zoom dark">
                        <img
                          width="516"
                          height="151"
                          src={Dinhky}
                          className="attachment-original size-original"
                          alt=""
                          srcSet={`${Dinhky} 516w, ${Dinhky} 300x88.jpg 300w`}
                          sizes="(max-width: 516px) 100vw, 516px"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col grid-col large-4 grid-col-1-3">
                <div className="col-inner">
                  <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_1530919891">
                    <a className="" href="#" target="_blank" rel="noopener noreferrer">
                      <div className="img-inner image-zoom dark">
                        <img
                          width="258"
                          height="151"
                          src={cayImplant}
                          className="attachment-original size-original"
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
